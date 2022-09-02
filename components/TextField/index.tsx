import React, {useState} from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import clx from "classnames";
import {useFormContext} from "react-hook-form";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px 0 0 0;

  &:nth-child(1) {
    margin: 0;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 0px 10px 0 10px;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: #FFFFFF;

  background: rgba(255, 255, 255, .04);
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 5px;

  transition: .15s background-color, .15s border-color;


  &:hover, &:focus {
    border: 1px solid rgba(255, 255, 255, .4);
  }

  .is-error &,
  .is-error &:hover,
  .is-error &:focus {
    background: rgba(255, 0, 0, .05);
    border-color: red;
  }

  .is-success &:hover,
  .is-success &:focus {
    background: rgba(27, 188, 155, .1);
    border-color: #1bbc9b;
  }
`;
const Placeholder = styled.div`
  position: absolute;
  top: 0;
  bottom: 1px;
  left: 0;

  display: flex;
  height: max-content;
  margin: auto 12px;
  padding: 0;

  font-family: ${theme.fonts.dinCondM};
  font-size: ${theme.fontSizes.s};
  color: #2c2b42;

  background: transparent;
  pointer-events: none;

  transition: .15s color, .1s top;

  input:not(:placeholder-shown) ~ & {
    top: -38px;
    z-index: 2;

    margin: auto 10px;
    padding: 0;

    background: transparent;

    font-size: 11px;

    &::before {
      content: '';

      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;

      width: 100%;
      height: 3px;
      margin: auto;

      background-color: rgba(22, 22, 46, 1);
    }
  }
  
  input:hover ~ &,
  input:focus ~ & {
    color: rgba(255, 255, 255, .4);
  }
  
  .is-error &,
  .is-error input:hover ~ &,
  .is-error input:focus ~ & {
    color: red;
  }

  .is-success input:hover ~ &,
  .is-success input:focus ~ & {
    color: #1bbc9b;
  }
`;
const Icon = styled.i`
  position: absolute;
  right: 15px;

  font-size: 14.5px;
  pointer-events: none;

  color: rgba(255, 255, 255, .1);

  transition: .15s color;

  input:hover ~ &,
  input:focus ~ & {
    color: rgba(255, 255, 255, .4);
  }

  .is-error &,
  .is-error input:hover ~ &,
  .is-error input:focus ~ & {
    color: red
  }

  .is-success input:hover ~ &,
  .is-success input:focus ~ & {
    color: #1bbc9b;
  }
`;

interface TextFieldProps {
  name: string,
  required: boolean,
  type: string,
  placeholder: string,
  icon: string
}

export const TextField: React.FC<TextFieldProps> = ({ name, required = false, type, placeholder, icon }) => {
  const [value, setLocalValue] = useState('');
  const { register, formState: {errors}, setValue } = useFormContext();
  const errorMessage: string | false = errors[name]?.message as string || false;

  return (
    <Wrapper className={clx([(!!errorMessage && value) && 'is-error', (!errorMessage && value) && 'is-success'])}>
      <Input {...register(name, {required: required})}
          value={value}
          type={type}
          placeholder=" "
          onChange={(e) => {
            const value = e.target.value;
            setLocalValue(value);
            setValue(name, value, {shouldValidate: true})
          }} />
      <Placeholder>{(!!errorMessage && value) && errorMessage || placeholder}</Placeholder>
      <Icon className={icon}></Icon>
    </Wrapper>
  );
}
