import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";

const InfoCard = styled.div`
  background: ${theme.colors.darkBlue};
  height: max-content;
  margin: 30px 0 0;
  padding: 25px 25px 30px;
  border-radius: 15px;
  opacity: 0;

  transition: .5s margin, .5s opacity;

  &:nth-child(1) {
    transition-delay: .05s;
  }
  &:nth-child(2) {
    transition-delay: .1s;
  }
  &:nth-child(3) {
    transition-delay: .15s;
  }
  &:nth-child(4) {
    transition-delay: .2s;
  }

  .page-entering &{
    margin: 30px 0 0;
    opacity: 0;
  }
  .page-entered &{
    margin: 0 0 0;
    opacity: 1;
  }

`
const Icon = styled.div<{iconColor: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 0 0 50px 0;
  
  color: ${theme.colors.darkBlue};

  border-radius: 7px;
  
  ${props => props.iconColor && `
    background: ${props.iconColor};
  `}
`
const Title = styled.h3`
  margin: 0 0 5px 0;
  
  font-family: ${theme.fonts.dinCondM};
  text-transform: uppercase;
  font-size: 13px;
  color: #AAAAAA;
`
const Text = styled.span`
  font-family: ${theme.fonts.dinCondM};
  font-size: 40px;
  color: #FFFFFF;
`

type LogoProps = {
  text: string;
  title: string;
  icon: string;
  iconColor?: string;
}

const ProfileInfoCard: React.FC<LogoProps> = ({text, title, icon, iconColor = '#ccc'}) => {
  return (
    <InfoCard>
      <Icon iconColor={iconColor}>
        <i className={icon}></i>
      </Icon>
      <Title>
        {title}
      </Title>
      <Text>
        {text}
      </Text>
    </InfoCard>
  );
}

export default ProfileInfoCard;
