import React, {FC} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import ShapeOverlays from "../../libs/shapeOverlays";
import {useAppDispatch} from "../../app/hooks";
import {Overlay} from "./overlay";
import {ClientOnlyPortal} from "../ClientOnlyPortal";
import {setShowPreloader} from "../../features/settings/settingsSlice";

const Loading = styled.div`
  position: fixed;
  z-index: 103;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  transition: 0.25s opacity;
`;
const Counter = styled.h1`
  color: #eee;
  font-size: 500px;

  pointer-events: none;
  opacity: 0;

  transition: 0.4s opacity;

  @media (max-width: ${theme.media.tab}) {
    font-size: 280px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    font-size: 200px;
  }
`;
const textObject = {
  overlayClass: "js-preloader-overlay",
  preloaderClass: "js-preloader",
  preloaderTitleClass: "js-preloader-title",
};

interface PreloaderProps {
  selector: string
}

const Preloader: FC<PreloaderProps> = ({selector}) => {
  const dispatch = useAppDispatch();

  const loadPreloader = () => {
    const $overlay = document.querySelector(`.${textObject.overlayClass}`) as HTMLElement;
    const $preloader = document.querySelector(`.${textObject.preloaderClass}`) as HTMLElement;
    const $title = document.querySelector(`.${textObject.preloaderTitleClass}`) as HTMLElement;

    if (!$overlay) return;
    const overlay = new ShapeOverlays($overlay);
    let counter = 0;

    if (!$title)
      return;

    $title.style.opacity = "1";
    let interval = setInterval(() => {
      $title.innerHTML = `${counter}`;
      counter++;

      if (counter === 85) {
        $preloader.style.opacity = "0";
        $preloader.style.pointerEvents = "none";
      }
      if (counter === 95) {
        clearInterval(interval);
        overlay.toggle();
        $overlay.style.background = "transparent";

        setTimeout(function () {
          dispatch(setShowPreloader(false));
        }, 1500);
      }
    }, 10);
  };

  React.useEffect(() => {
    setTimeout(() => loadPreloader())
  }, []);

  return (
    <ClientOnlyPortal selector={selector}>
      <>
        <Loading className={`${textObject.preloaderClass}`}>
          <Counter className={`${textObject.preloaderTitleClass}`}>0</Counter>
        </Loading>
        <Overlay/>
      </>
    </ClientOnlyPortal>
  );
}

export default Preloader;