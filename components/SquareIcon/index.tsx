import React, {ReactElement} from "react";
import styled from "styled-components";

import theme from "../../styles/theme";

const Icon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;

  ${(props) =>
          props.theme === "dark" && `color: ${theme.colors.darkBlue};border: 1px solid ${theme.colors.darkBlue};`}
  i {
    font-size: calc(${theme.fontSize} - 1px);
  }
`;

type SquareIconProps = {
  text: ReactElement | string;
  type?: string;
  href?: string;
  theme: string;
}

const SquareIconComponent:React.FC<SquareIconProps> = ({text = (<i></i>), type = "div", href = '', theme = 'default'}) => {
  return (
    <>
      {type === "link" ? (
        <Icon as={'a'} href={href} theme={theme} target={'_blank'}>{text}</Icon>
      ) : (
        <Icon as={"div"} theme={theme}>{text}</Icon>
      )}
    </>
  );
}

export default SquareIconComponent;
