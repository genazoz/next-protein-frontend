import React, {useState} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import styled from "styled-components";

import theme from "../../../styles/theme";
import {TextField} from "../../index";
import {LoginFormSchema} from "../../../utils/validations";
import {LoginDto} from "../../../utils/api/types";
import {Api} from "../../../utils/api";
import {setCookie} from "nookies";
import {setUserData} from "../../../features/user/userSlice";
import {setShowAuthModal} from "../../../features/settings/settingsSlice";
import {useAppDispatch} from "../../../app/hooks";
import {formEnum} from "../index";
import WarnIco from '../../../public/svg/warn.svg'

const Title = styled.p`
  margin: 0 0 12px 0;

  font-family: ${theme.fonts.dinCondM};
  font-size: 32px;
  color: #FFFFFF;
  text-align: center;
`
const Subtitle = styled.p`
  margin: 0 0 40px 0;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: rgba(255, 255, 255, .3);
  text-align: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 40px 0;
`
const ForgetPassword = styled.a`
  font-family: ${theme.fonts.dinCondM};
  font-size: 12px;

  cursor: pointer;
`
const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;

  font-family: ${theme.fonts.dinCondM};
  font-size: 12px;
  color: rgba(255, 255, 255, .3);

  cursor: pointer;
  
  label {
    cursor: pointer;
  }

  &:hover {
    input:not(:checked) {
      border-color: var(--active-border);
    }
  }
`
const Checkbox = styled.input`
  --active-background: rgba(27, 188, 155, .3);
  --active-border: #1bbc9b;
  --border: rgb(34, 34, 62);
  --border-hover: #FFFFFF;
  --background: transparent;
  --disabled: red;
  --disabled-inner: transparent;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin: 0 4px 0 0;
  padding: 1px;

  cursor: pointer;
  outline: none;
  box-shadow: none;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--background);
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: none;
  pointer-events: none;

  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 14 11" fill="none"><path d="M4.74534 7.95712L2.41111 5.62989C2.0597 5.27953 1.49106 5.27953 1.13965 5.62989V5.62989C0.786741 5.98174 0.786741 6.55332 1.13965 6.90517L4.74534 10.5001L12.8605 2.40917C13.2134 2.05732 13.2134 1.48574 12.8605 1.13389V1.13389C12.5091 0.783528 11.9405 0.783528 11.5891 1.13389L4.74534 7.95712Z" fill="white"/></svg>');

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: -2px;

    opacity: 0;
  }

  &:hover {
    border: 1px solid var(--border-hover);
  }

  &:checked {
    background: var(--active-background);
    border-color: var(--active-border);

    &:after {
      transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background: var(--disabled);

    &:checked {
      background: var(--active-background);
      border-color: var(--active-border);

      &:after {
        transition: opacity 0.1s ease, transform 0.6s cubic-bezier(0.175, 0.88, 0.32, 1.2);
      }
    }
  }

  &:not(.switch) {
    &:after {
      opacity: 0;
    }

    &:checked:after {
      opacity: 1;
    }
  }
`
const Button = styled.button<{ isDisabled: any }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  margin: 0 0 20px 0;
  padding: 0px 50px 1px 50px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: #000000;

  background: #FFFFFF;
  cursor: pointer;
  border-radius: 5px;

  transition: .2s all;

  @media (max-width: ${theme.media.tab}) {
    padding: 2px 50px 0 50px;
  }

  ${props => props.isDisabled && `
    opacity: .3;
    pointer-events: none;
  `}
`
const DontHaveAccount = styled.span`
  display: flex;
  align-items: center;
  margin: 50px auto 0;
  gap: 7px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: rgba(255, 255, 255, .3);
  text-align: center;

  a {
    font-family: ${theme.fonts.dinCondM};
    font-size: ${theme.fontSizes.s};
  }
`
const Alert = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  margin: 0 0 20px 0;
  padding: 0px 50px 1px 50px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: rgba(255, 0, 0, .5);

  background: rgba(255, 0, 0, .2);
  border-radius: 5px;
  pointer-events: none;

  transition: .2s all;
`
const WarnIcon = styled.svg`
  width: 17px;
  height: 17px;

  fill: rgba(255, 0, 0, .5);
`

export const Login: React.FC<{ onChangeFormType: (type: formEnum) => void }> = ({onChangeFormType}) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useAppDispatch();

  const onClickRememberMe = () => {
    setRememberMe(!rememberMe);
  }

  const onSubmit = async (dto: LoginDto) => {
    try {
    const data = await Api().user.login(dto);
    setCookie(null, 'proteinUserToken', data.data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
    setErrorMessage("");
    dispatch(setUserData(data.data));
    dispatch(setShowAuthModal(false));
  } catch (err) {
    console.warn("Register error", err);
    // @ts-ignore
    setErrorMessage(err.response.data.message);
  }
  };

  const onClickRegistration = (e: any) => {
    e.preventDefault();

    onChangeFormType(formEnum.REGISTER);
  }

  return (
    <>
      <Title>Авторизация</Title>
      <Subtitle>Есть два варианта авторизации. Через логин и пароль, либо с помощью аккаунта Google.</Subtitle>
      <FormProvider {...form}>
        <Form onSubmit={
          // @ts-ignore
          form.handleSubmit(onSubmit)
        }>
          <TextField
            name={'email'}
            required={true}
            type="text"
            placeholder="E-mail"
            icon="far fa-at"></TextField>
          <TextField
            name={'password'}
            required={true}
            type="password"
            placeholder="Пароль"
            icon="far fa-lock-alt"></TextField>
          <Footer>
            <RememberMe onClick={onClickRememberMe}>
              <Checkbox type="checkbox" id={'checkbox1'} />
              <label htmlFor={'checkbox1'}>Запомнить меня</label>
            </RememberMe>
            <ForgetPassword>
              Восстановить пароль
            </ForgetPassword>
          </Footer>
          <Button type='submit' isDisabled={!form.formState.isValid || form.formState.isSubmitting}>
            Войти
          </Button>
          {errorMessage && <Alert>
            <WarnIcon as={WarnIco}/>
            {errorMessage}
          </Alert>}
        </Form>
      </FormProvider>
      <DontHaveAccount>
        У вас ещё нет аккаунта? <a href={''} onClick={(e) => onClickRegistration(e)}>Регистрация</a>
      </DontHaveAccount>
    </>
  )
}
