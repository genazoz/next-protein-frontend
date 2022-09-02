import React from "react";

import styled from "styled-components";
import theme from "../../styles/theme";
import SquareIcon from "../SquareIcon";
import Button from "../Button";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/hooks";
import {settingsSelector, setPreviewSubmitHovered} from "../../features/settings/settingsSlice";

const Section = styled.section`
  position: relative;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 calc((100% - 1240px) / 2);
  height: 100%;
  margin: auto;
`;
const Wrapper = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  transform: scale(1.07);

  @media (max-width: ${theme.media.desktopSm}) {
    transform: scale(1);
  }
  @media (max-width: ${theme.media.tab}) {
    transform: scale(.9);
  }
  @media (max-width: ${theme.media.tabLg}) {
    flex-direction: column;
    justify-content: space-between;
    transform: unset;
    width: 100%;
    padding: 64px;
  }
  @media (max-width: ${theme.media.mob}) {
    padding: 24px 34px 34px 34px;
  }
`;
const Title = styled.h1`
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin-top: 0%;
  padding-top: 40px;

  font-size: 130px;
  line-height: 90px;
  color: #e4e4e4;

  @media (max-width: ${theme.media.tabLg}) {
     font-size: 100px;
     margin-top: -70px;
   }

  @media (max-width: ${theme.media.tabSm}) {
    position: absolute;
    top: 0;
    bottom: 210px;

    flex-grow: unset;
    margin: auto 0;
    padding-top: 0px;
    height: auto;
    
    font-size: 60px;
    line-height: 30px;
  }

  @media (max-width: 400px) {
    font-size: 46px;
    line-height: 10px;
    padding-top: 0px;
    height: auto;
    flex-grow: unset;
  }
  @media (max-width: ${theme.media.mobSm}) {
    bottom: 170px;
    
    font-size: 40px;
    line-height: 10px;
  }
`;
const TitleLine = styled.span`
  display: block;
  overflow: hidden;
  max-width: 100%;
  margin: 10px auto 0 0;
  padding: 28px 40px 16px 40px;

  color: white;

  transform: skew(-10deg) rotate(-10deg);
  background: ${theme.colors.darkBlue};

  @media (max-width: ${theme.media.tabLg}) {
     padding: 13px 25px;
     margin: 8px auto 0 0;
   }

  @media (max-width: ${theme.media.tabSm}) {
    padding: 25px 17px 15px 17px;
    margin: 5px auto 0 0;
  }

  @media (max-width: ${theme.media.mobSm}) {
    padding: 22px 10px 15px 10px;
  }
`;
const ImageWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: -15px;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 550px;
  height: 550px;
  margin: auto;

  pointer-events: none;

  img,
  span {
    position: absolute;
  }

  @media (max-width: ${theme.media.tabLg}) {
    width: 500px;
    height: 500px;
  }

  @media (max-width: ${theme.media.tabSm}) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: ${theme.media.mobSm}) {
    width: 190px;
    height: 190px;
  }
`;
const ImageProteinWrapper = styled(ImageWrapper)<{isHidden: number}>`
  transition: 0.8s transform;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  ${(props) =>
    props.isHidden
      ? `transform: translateY(-120vh)`
      : `transform: translateY(0vh)`}
`;
const ImageProtein = styled.img`
  width: 230%;
  z-index: 1;
  margin-top: -26px;
  margin-left: -2px;

  @media (max-width: ${theme.media.tab}) {
    margin-top: -35px;
    margin-left: -7px;
  }
  @media (max-width: ${theme.media.tabSm}) {
    margin-top: -16px;
    margin-left: -4px;
  }
  @media (max-width: ${theme.media.mob}) {
    margin-top: -74px;
    margin-left: -7px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    margin-top: -63px;
    margin-left: -6px;
  }
`;
const CircleWrapper = styled(ImageWrapper)<{isHidden: number; isFullscreen: boolean}>`
  z-index: 0;
  top: 0;

  transition: 0.8s transform;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  @media (max-width: ${theme.media.mob}) {
    top: -59px;
    left: -3px;
  }

  ${(props) => {
    if (props.isHidden) return `transform: translateY(-220vh)`;
    if (props.isFullscreen) return `transform: scale(4.5);`;
  }}
`;
const Circle = styled.span`
  z-index: 0;

  display: flex;
  width: 100%;
  height: 100%;

  border-radius: 50%;
  background: white;
  box-shadow: 0 0 90px rgba(255, 255, 255, 0.3);
`;
const Contacts = styled.div`
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 280px;

  text-align: left;
  
  p {
    font-size: 15px;
  }

  @media (max-width: ${theme.media.tabLg}) {
    display: flex;
    flex-direction: row;
    grid-gap: 25px;
    width: 100%;
    margin-bottom: 0px;
  }

  @media (max-width: ${theme.media.tabSm}) {
    position: absolute;
    top: 520px;
    bottom: 0;

    margin: auto;
    height: max-content;
  }

  @media (max-width: 400px) {
    top: 470px;
  }

  @media (max-width: ${theme.media.mob}) {
    width: calc(100vw - 34px * 2);
  }
  @media (max-width: ${theme.media.mobSm}) {
    top: 320px;
    transform: scale(.95);

    grid-gap: 0;
  }
  @media (max-width: 300px)  {
    justify-content: flex-start;
  }
`;
const SocialLinks = styled.div`
  @media (max-width: ${theme.media.tabLg}) {
    order: 2;
    width: 100%;
  }
  @media (max-width: 300px)  {
    display: none;
  }

  h2,
  p {
    color: ${theme.colors.darkBlue};
  }
`;
const SubscribeWrapper = styled.div`
  color: ${theme.colors.darkBlue};
  margin-top: 35px;

  h2 {
    color: ${theme.colors.darkBlue};
  }
  
  p {
    font-size: 15px;
  }

  @media (max-width: ${theme.media.tabLg}) {
    margin: 0 10px 0 0;
  }

  @media (max-width: 400px) {
    p {
      display: none;
    }
  }
`;
const Subscribe = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0px 0px 0px;
`;
const Input = styled.input`
  height: 35px;
  margin-left: 10px;
  padding: 1px 10px 0 10px;

  font-size: ${theme.fontSizes.s};
  color: ${theme.colors.darkBlue};

  border: 1px solid ${theme.colors.darkBlue};
  border-radius: 0;
  background: transparent;

  &::placeholder {
    color: ${theme.colors.darkBlue};
  }

  @media (max-width: ${theme.media.tab}) {
    width: 120px;
  }
`;
const SquareIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0px 0px 0px;

  a {
    margin: 0 10px 0 0;
  }
`;
const ButtonWrapper = styled.div`
  margin: 10px 0 0 0;
`;
const ProteinBarWrapper = styled.div<{speed: number; isHidden: number}>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;

  pointer-events: none;

  transition: ${(props) => `${props.speed}s transform`};
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  ${(props) =>
    props.isHidden
      ? `transform: translateY(-220vh)`
      : `transform: translateY(0vh)`}
`;
const ProteinBarImg = styled.img`
  position: absolute;
  z-index: 12;
  top: -80px;
  left: 230px;

  width: 550px;
  height: auto;

  filter: blur(6px);

  transform: rotate(30deg);

  @media (max-width: 1700px) {
    display: none;
  }
`;
const ProteinBarImg2 = styled(ProteinBarImg)`
  z-index: 0;
  left: unset;
  top: 75px;
  right: 230px;

  width: 370px;

  filter: blur(1px);

  transform: rotate(30deg);
`;
const ProteinBarImg3 = styled(ProteinBarImg)`
  z-index: 1;
  top: unset;
  bottom: -150px;
  right: -160px;
  left: unset;

  width: 850px;

  transform: rotate(30deg);

  filter: blur(10px);
`;

export const Preview: React.FC<{destinationIndex: number}> = ({ destinationIndex }) => {
  const { previewSubmitHovered } = useSelector(settingsSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    document.addEventListener("mousemove", function (e) {
      parallax(e);
    });
  });

  const parallax = (e: any) => {
    const $image = document.querySelector(".js-protein-image");

    if (!$image) return;
    const $circle = document.querySelector(".js-circle");
    const $img1 = document.querySelector(".js-img-parallax1");
    const $img2 = document.querySelector(".js-img-parallax2");
    const $img3 = document.querySelector(".js-img-parallax3");
    let clientWidth = document.body.clientWidth;
    let clientHeight = document.body.clientHeight;
    let ax = -(clientWidth / 2 - e.pageX) / 80;
    let ay = -(clientHeight / 2 - e.pageY) / 80;
    let ax1 = -(clientWidth / 2 - e.pageX) / 40;
    let ay1 = -(clientHeight / 2 - e.pageY) / 40;

    if (window.innerWidth < 1100) {
      $image.setAttribute("style", '');
      $circle?.setAttribute("style", '');
      return;
    }

    $image.setAttribute(
      "style",
      `transform: translateY(${ay}px) translateX(${ax}px);`
    );
    $circle?.setAttribute(
      "style",
      `transform: translateY(${ay1}px) translateX(${ax1}px);`
    );
    $img1?.setAttribute(
      "style",
      `transform: rotate(30deg) translateY(${ay * 2}px) translateX(${
        ax * 2
      }px);`
    );
    $img2?.setAttribute(
      "style",
      `transform: rotate(30deg) translateY(${ay1 / 4}px) translateX(${
        ax1 / 7
      }px);`
    );
    $img3?.setAttribute(
      "style",
      `transform: rotate(30deg) translateY(${ay * 2}px) translateX(${
        ax * 2.5
      }px);`
    );
  };
  const onSubmitEnter = () => {
    dispatch(setPreviewSubmitHovered(true));
  };
  const onSubmitBlur = () => {
    dispatch(setPreviewSubmitHovered(false));
  };

  return (
    <Section>
      <ProteinBarWrapper speed={0.92} isHidden={destinationIndex}>
        <ProteinBarImg className={"js-img-parallax1"} src={"img/Bar.png"} />
      </ProteinBarWrapper>
      <ProteinBarWrapper speed={0.88} isHidden={destinationIndex}>
        <ProteinBarImg2 className={"js-img-parallax2"} src={"img/Bar2.png"} />
      </ProteinBarWrapper>
      <ProteinBarWrapper speed={0.9} isHidden={destinationIndex}>
        <ProteinBarImg3 className={"js-img-parallax3"} src={"img/Bar3.png"} />
      </ProteinBarWrapper>
      <Wrapper>
        <Title>
          {["Protein", "Store", "Spb"].map((text, index) => (
            <TitleLine key={index}>{text}</TitleLine>
          ))}
        </Title>
        <CircleWrapper
          isHidden={destinationIndex}
          isFullscreen={previewSubmitHovered ? true : false}
          className={`js-preview-image-wrapper`}
        >
          <Circle className={"js-circle"} />
        </CircleWrapper>
        <ImageProteinWrapper
          isHidden={destinationIndex || previewSubmitHovered ? 1 : 0}
          className={`js-preview-image-wrapper`}
        >
          <ImageProtein
            className={"js-protein-image"}
            src="img/Protein1.png"
            alt="protein"
          />
        </ImageProteinWrapper>
        <Contacts>
          <SocialLinks>
            <h2>Cоц. сети</h2>
            <p>Cледите за нами в соц. сетях</p>
            <SquareIcons>
              <SquareIcon
                theme={"dark"}
                text={<i className="fab fa-instagram"></i>}
                type={"link"}
                href="https://www.instagram.com"
              />
              <SquareIcon
                theme={"dark"}
                text={<i className="fab fa-vk"></i>}
                type={"link"}
                href="https://vk.com/genazozulya"
              />
            </SquareIcons>
          </SocialLinks>
          <SubscribeWrapper>
            <h2>Присоединяйтесь!</h2>
            <p>Введите ваш e-mail ниже, чтобы быть в курсе всех новостей</p>
            <Subscribe>
              <SquareIcon theme={"dark"} text={<i className="far fa-at"></i>} />
              <Input type="text" placeholder="Введите email..." />
            </Subscribe>
            <ButtonWrapper
              onMouseLeave={() => onSubmitBlur()}
              onMouseEnter={() => onSubmitEnter()}>
              <Button
                text={"Отправить"}
                border={false}
              />
            </ButtonWrapper>
          </SubscribeWrapper>
        </Contacts>
      </Wrapper>
    </Section>
  );
}
