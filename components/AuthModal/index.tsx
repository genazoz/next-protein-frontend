import React, {useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";

import {setShowAuthModal, settingsSelector} from "../../features/settings/settingsSlice";
import {useAppDispatch} from "../../app/hooks";
import theme from "../../styles/theme";
import {ClientOnlyPortal} from "../index";
import {Login} from "./forms/Login";
import {Register} from "./forms/Register";
import { CSSTransition } from 'react-transition-group';

const Wrapper = styled.div`
  position: fixed;
  z-index: 110;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  
  &.auth-modal-enter {
    opacity: 0;
  }
  &.auth-modal-enter-active {
    opacity: 1;
    
    transition: opacity .2s;
  }
  &.auth-modal-exit {
    opacity: 1;
  }
  &.auth-modal-exit-active {
    opacity: 0;
    transition: opacity .2s;
  }
`;
const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 360px;
  max-width: calc(100% - 24px * 2);
  height: max-content;
  max-height: calc(100% - 80px);
  margin: auto;
  padding: 40px 45px;

  background: ${theme.colors.darkBlue};
  border-radius: 15px;
  box-shadow: 0 0 50px rgba(0, 0, 0, .1), 0 0 50px rgba(0, 0, 0, .05);
  transform: translateY(-20%);

  color: black;

  transition: .4s transform;
  
  .auth-modal-enter & {
  }
  .auth-modal-enter-active & {
    transform: translateY(0%);
  }
  .auth-modal-enter-done & {
    transform: translateY(0%);
  }
  .auth-modal-exit & {
    transform: translateY(20%);
  }
  .auth-modal-exit-active & {
    transform: translateY(20%);
  }

  @media (max-width: ${theme.media.mob}) {
    max-height: calc(100% - 30px);
    padding: 40px 35px;
  }
  @media (max-width: ${theme.media.mobSm}) {
    padding: 25px 20px;
  }
`;
const Overflow = styled.div`
  width: 100%;
  height: 100%;

  cursor: pointer;

  transition: 0.7s background-color;
  transition-timing-function: cubic-bezier(0.85, 0.01, 0.2, 0.99);

  background: rgba(0, 0, 0, 0.9);
`;

interface AuthModalProps {
  selector: string
}

export enum formEnum {
  LOGIN = 'login',
  REGISTER = 'register'
}

const AuthModal: React.FC<AuthModalProps> = ({selector}) => {
  const {showAuthModal} = useSelector(settingsSelector);
  const dispatch = useAppDispatch();

  const [formType, setFormType] = useState<formEnum>(formEnum.LOGIN)

  const onClickShowAuthButton = () => {
    dispatch(setShowAuthModal(!showAuthModal));
  };
  const changeFormType = (type: formEnum) => {
    setFormType(type);
  }

  return (
    <ClientOnlyPortal selector={selector}>
      <CSSTransition in={showAuthModal} classNames={'auth-modal'} timeout={200} unmountOnExit>
        <Wrapper className={"js-auth-wrapper"}>
          <Overflow onClick={onClickShowAuthButton}/>
          <Container>
            {formType === 'login'
              ? <Login onChangeFormType={(type) => changeFormType(type)} />
              : <Register onChangeFormType={(type) => changeFormType(type)} />
            }
          </Container>
        </Wrapper>
      </CSSTransition>
    </ClientOnlyPortal>
  )
}

export default AuthModal;