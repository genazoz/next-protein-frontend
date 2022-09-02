import React, {ReactElement} from "react";
import styled from "styled-components";
import Link from "next/link";

import theme from "../../styles/theme";

const Button = styled.button<{theme: string, fullwidth: boolean, icon: string, disabled: boolean, border: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: max-content;
  height: 35px;
  padding: 1px 48px 0 48px;

  font-family: ${theme.fonts.bebasB};
  font-size: 13px;

  cursor: pointer;
  border: 0px;
  border-radius: 5px;
  
  i {
    margin: -2px 0 0 12px;
  
    font-size: 16px;
  }

  ${(props) =>
          props.theme === "dark" &&
          `background: ${theme.colors.darkBlue}; color: #ffffff;`}
  ${(props) =>
          props.icon && `padding: 2px 28px 0 32px;`}
  ${(props) =>
          !props.border &&
          `border-radius: 0;`}
  ${(props) =>
    props.theme === "green" &&
    `color: ${theme.colors.darkBlue}; background: ${theme.colors.green};`}
  ${(props) =>
          props.theme === "green-border" &&
          `color: ${theme.colors.green}; 
      border: 1px solid ${theme.colors.green};  
      background: transparent;
      
      &:hover {
        color: ${theme.colors.darkBlue}; 
      
        background: ${theme.colors.green}; 
      }`}
  ${(props) =>
          props.theme === "green-icon-border" &&
          `color: ${theme.colors.green}; 
      border: 1px solid ${theme.colors.green};  
      background: transparent;
      
      svg {
        margin: 0 8px 0 0;
          
        stroke: ${theme.colors.green};
      }
      
      &:hover {
        color: ${theme.colors.darkBlue}; 
      
        background: ${theme.colors.green}; 
      
        svg {
          stroke: ${theme.colors.darkBlue};
        }
      }`}
  ${(props) => props.fullwidth && `width: 100%;`}
  ${(props) => props.disabled && `pointer-events: none !important; opacity: .5;`}
`;

type ButtonProps = {
  text: string | ReactElement;
  type?: string;
  href?: string;
  theme?: string;
  fullwidth?: boolean;
  disabled?: boolean;
  icon?: string;
  border?: boolean;
  onClick?: () => void;
}

const ButtonComponent:React.FC<ButtonProps> = ({
  text,
  type = "div",
  href = '',
  theme = "dark",
  fullwidth = false,
  disabled = false,
  icon = '',
  border = true,
  onClick
}) => {
  const onClickButton = () => {
    if(onClick) {
      onClick();
    }
  }

  return (
    <>
      {type === "link" && !disabled ? (
        <Link href={href} >
          <Button theme={theme} fullwidth={fullwidth} border={border} icon={icon} disabled={disabled}>
            {text}
            {icon && <i className={icon}></i>}
          </Button>
        </Link>
      ) : (
        <Button theme={theme} fullwidth={fullwidth} border={border} icon={icon} disabled={disabled} onClick={onClickButton}>
          {text}
          {icon && <i className={icon}></i>}
        </Button>
      )}
    </>
  );
}

export default ButtonComponent;
