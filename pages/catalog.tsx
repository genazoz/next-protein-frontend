import React, {useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {filterSelector} from "../features/filter/filterSlice";
import {settingsSelector} from "../features/settings/settingsSlice";

import {Categories, Footer, GoodsList, Pagination, SearchLine} from "../components";
import theme from "../styles/theme";
import debounce from "lodash.debounce";
import {Api} from "../utils/api";
import {GetServerSideProps, NextPage} from "next";
import {ResponseMeta, ResponseProduct} from "../utils/api/types";
import {useRouter} from "next/router";
import Logo from "../components/Logo";

const CatalogEl = styled.div`
  padding-top: 130px;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Wrapper = styled.div`
  height: max-content;
  min-height: calc(100vh - 130px);
  flex: 1;
  margin: 0 0 100px 0;
  padding: 0 var(--unit);
`;
const ErrorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  margin: auto;
  padding: 60px 0 120px 0;

  @media (max-width: ${theme.media.tabMd}) {
    position: relative;

    order: 0;
    margin: 20px auto;
  }

  span {
    display: block;
    width: auto;
    padding: 0 70px;

    font-family: ${theme.fonts.bebasB};
    font-size: 80px;
    color: white;

    background: ${theme.colors.darkBlue};
    border: 10px solid ${theme.colors.green};
    box-shadow: 0 0 0 10px white;
    transform: skew(-10deg) rotate(-10deg);

    @media (max-width: ${theme.media.mob}) {
      padding: 8px 8px 2px 8px;

      font-size: 40px;
    }
  }
`;

interface CatalogProps {
  goods: ResponseProduct[];
  meta: ResponseMeta,
  categories: string
}

const Catalog: NextPage<CatalogProps> = ({goods, meta, categories}) => {
  const router = useRouter()
  const {goodsPerPage} = useSelector(settingsSelector);
  const {searchQuery} = useSelector(filterSelector);
  const [products, setProducts] = useState(goods);
  const [metaState, setMeta] = useState(meta);
  const [activeCategoriesIds, setCategories] = useState(categories ? [...categories.split(',').map((item) => parseInt(item))] : []);
  const [currentPage, setCurrentPage] = useState(metaState.currentPage);

  const onClickCategory = (idx: number) => changeCategory(idx);
  const changeCurrentPage = (numOfPage: number) => setCurrentPage(numOfPage);
  const changeCategory = React.useCallback(debounce((id: number) => {
    const isClickedCategory = activeCategoriesIds.find((category: number) => category === id);

    if (id === 0) {
      setCategories([]);
    } else if (isClickedCategory === undefined) {
      setCategories([...activeCategoriesIds, id]);
    } else {
      const filteredArray = activeCategoriesIds.filter((category: number) => category !== id);
      setCategories(filteredArray);
    }
  }, 200), [activeCategoriesIds])

  React.useEffect(() => {
    const queryCategories = activeCategoriesIds.length > 0 ? activeCategoriesIds.toString() : "";
    const querySearch = searchQuery ? searchQuery : "";

    const fetchGoods = async () => {
      const {items, meta} = await Api().product.getPaginate(goodsPerPage, currentPage, querySearch, queryCategories);
      setProducts(items)
      setMeta(meta);

      if (meta.totalPages < meta.currentPage) {
        setCurrentPage(1);
      }
    }
    fetchGoods();
  }, [activeCategoriesIds, searchQuery, currentPage]);
  React.useEffect(() => {
    type urlType = {
      query: {
        categories?: string;
        page?: string;
      }
    };

    const urlObj: urlType = {
      query: {},
    };

    if (activeCategoriesIds.length > 0) {
      urlObj.query.categories = `${activeCategoriesIds}`;
    }
    if (currentPage !== 1) {
      urlObj.query.page = `${currentPage}`;
    }

    router.push(urlObj)
  }, [currentPage, activeCategoriesIds]);

  return (<CatalogEl>
    <Wrapper>
      <SearchLine/>
      <Categories
        activeCategories={activeCategoriesIds}
        onClickCategory={onClickCategory}
      />
      {
        !metaState.itemCount
          ? <ErrorInfo>
            <Logo text={'Не найдено'}></Logo>
          </ErrorInfo>
          : <>
              <GoodsList items={products}/>
              <Pagination currentPage={currentPage}
                          goodsPerPage={metaState.itemsPerPage}
                          countOfPages={metaState.totalPages}
                          onPageChange={(num) => changeCurrentPage(num)}/>
            </>
      }
    </Wrapper>
    <Footer/>
  </CatalogEl>);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const currentPage: number = ctx.query?.page ? parseInt(ctx.query?.page as string) : 1;
    const categories: string = ctx.query?.categories ? ctx.query?.categories as string : '';
    const {items, meta} = await Api().product.getPaginate(24, currentPage, '', categories);

    return {
      props: {
        goods: items,
        meta,
        categories
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      goods: null,
      meta: null,
      categories: null
    },
  };
};

export default Catalog;
