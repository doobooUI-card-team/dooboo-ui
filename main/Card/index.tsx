import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { ViewStyle, ImageSourcePropType, ImageStyle } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ContentsContainer = styled.View`
  padding: 16px 24px;
`;

const StlyedImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const Divider = styled.View`
  margin: 5px 0px;
  height: 0.7px;
  background-color: lightgray;
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  contentsStyle?: ViewStyle;
  divider?: boolean;
  dividerStyle?: ViewStyle;
}

const Card: FC<Props> = (props) => {
  const {
    containerStyle,
    children,
    image,
    imageStyle,
    contentsStyle,
    divider,
    dividerStyle,
  } = props;
  return (
    <Container style={[containerStyle]}>
      {image && <StlyedImage source={image} style={[imageStyle]} />}
      {children && (
        <ContentsContainer style={[contentsStyle]}>
          {divider && <Divider style={[dividerStyle]} />}
          {children}
        </ContentsContainer>
      )}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
