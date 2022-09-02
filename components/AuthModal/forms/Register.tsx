import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import styled from "styled-components";

import theme from "../../../styles/theme";
import {TextField} from "../../index";
import {RegisterFormSchema} from "../../../utils/validations";
import {Api} from "../../../utils/api";
import {CreateUserDto} from "../../../utils/api/types";
import {setCookie} from "nookies";
import {useAppDispatch} from "../../../app/hooks";
import {setUserData} from "../../../features/user/userSlice";
import {setShowAuthModal} from "../../../features/settings/settingsSlice";
import {formEnum} from "../index";
import WarnIco from "../../../public/svg/warn.svg";

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
const Button = styled.button<{ isDisabled: any }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  margin: 40px 0 20px 0;
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

  width: 100%;
  height: 40px;
  margin: 0 0 20px 0;
  padding: 0px 50px 1px 50px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};

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


export const Register: React.FC<{ onChangeFormType: (type: formEnum) => void }> = ({onChangeFormType}) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await Api().user.register(dto);
      setCookie(null, 'proteinUserToken', data.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      })
      setErrorMessage("");
      dispatch(setUserData(data.data));
      dispatch(setShowAuthModal(false));
      setTimeout(() => onChangeFormType(formEnum.LOGIN), 500)
    } catch (err) {
      console.warn("Register error", err);
      // @ts-ignore
      setErrorMessage(err.response.data.message);
    }
  };

  const onClickAuthorization = (e: any) => {
    e.preventDefault();

    onChangeFormType(formEnum.LOGIN);
  }

  return (
    <>
      <Title>Регистрация</Title>
      <Subtitle>Для успешной регистрации введите ваше имя, действительный e-mail и пароль</Subtitle>
      <FormProvider {...form}>
        <Form onSubmit={
          // @ts-ignore
          form.handleSubmit(onSubmit)
        }>
          <TextField
            type="text"
            placeholder="Имя Фамилия"
            name={'fullName'}
            icon="fal fa-user"
            required={true}></TextField>
          <TextField
            type="text"
            placeholder="E-mail"
            name={'email'}
            icon="far fa-at"
            required={true}></TextField>
          <TextField
            type="password"
            placeholder="Пароль"
            name={'password'}
            icon="far fa-lock-alt"
            required={true}></TextField>
          <Button type='submit' isDisabled={!form.formState.isValid || form.formState.isSubmitting}>
            Зарегистрироваться
          </Button>
          {errorMessage && <Alert>
            <WarnIcon as={WarnIco}/>
            {errorMessage}
          </Alert>}
        </Form>
      </FormProvider>
      <DontHaveAccount>
        У вас уже есть аккаунт? <a href={''} onClick={(e) => onClickAuthorization(e)}>Авторизация</a>
      </DontHaveAccount>
    </>
  )
}
