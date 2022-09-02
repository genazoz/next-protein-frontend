import React, {useRef} from "react";
import styled from "styled-components";
import debounce from 'lodash.debounce'
import {setSearchQuery} from "../../features/filter/filterSlice";

import {useAppDispatch} from "../../app/hooks";
import theme from "../../styles/theme";

const SearchWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  margin: 0 0 35px 0;

  cursor: pointer;
`;
const Search = styled.input`
  position: relative;
  
  width: 100%;
  padding: 13px 0px;

  font-size: 25px;
  font-family: ${theme.fonts.bebasB};
  color: #ffffff;

  background: transparent;
  border: unset;

  &::placeholder {
    color: transparent;

    transition: 1s color;

    .page-entering &{
      color: transparent;
    }
    .page-entered &{
      color: #1e1d3a;
    }
  }
`;
const LineFocused = styled.span`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  width: 0;
  height: 1px;

  background: #ffffff;

  transition: 1s width cubic-bezier(0.85, 0.01, 0.2, 0.99);

  input:focus ~ &,
  input:not(:placeholder-shown) ~ & {
    width: 100%;
  }
`;
const Line = styled.span`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  width: 0;
  height: 1px;

  background: #1e1d3a;

  transition: 1s width cubic-bezier(0.85, 0.01, 0.2, 0.99);

  .page-entering &{
    width: 0%;
  }
  .page-entered &{
    width: 100%;
  }
`;
const CloseButton = styled.i`
  position: absolute;
  right: 0;

  padding: 10px;
`

export const SearchLine: React.FC = () => {
  const [value, setValue] = React.useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const changeSearch = React.useCallback(debounce((e: any) => {
    dispatch(setSearchQuery(e.target.value));
  }, 300), [])

  const onChangeSearchQuery = (e: any) => {
    setValue(e.target.value);
    changeSearch(e);
  }

  const resetSearchQuery = () => {
    setValue('');
    dispatch(setSearchQuery(''));
    searchRef.current?.focus();
  }

  return (
    <SearchWrapper>
      <Search ref={searchRef} value={value} type={"text"} placeholder={"Поиск товара..."}
              onChange={(e) => onChangeSearchQuery(e)}/>
      <Line/>
      <LineFocused/>
      {value && (<CloseButton className="fal fa-times" onClick={resetSearchQuery}></CloseButton>)}
    </SearchWrapper>);
}
