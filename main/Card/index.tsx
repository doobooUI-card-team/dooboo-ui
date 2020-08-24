import React, { FC, ReactNode, ReactNodeArray } from 'react';
import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

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

const LoadingContainer = styled(Container)`
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.View<TitleContainerProps>`
  justify-content: ${(props) =>
    props.titleTextVertical ? 'flex-start' : 'center'};
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: transparent;
`;

const TitleText = styled.Text`
  font-size: 13px;
  background-color: transparent;
  color: #000000;
`;

const SubTitleText = styled.Text`
  font-size: 10px;
  background-color: transparent;
  color: #e4e4e4;
  height: 20px;
`;

const Divider = styled.View`
  margin: 5px 0px;
  width: 100%;
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
  loading?: boolean;
  titleContainerStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  divider?: boolean;
  dividerStyle?: ViewStyle;
}

interface TitleContainerProps extends ViewProps {
  titleTextVertical?: boolean;
}

const Card: FC<Props> = (props) => {
  const {
    containerStyle,
    children,
    image,
    imageStyle,
    contentsStyle,
    loading,
    titleContainerStyle,
    title,
    titleStyle,
    subTitle,
    subTitleStyle,
    divider = true,
    dividerStyle,
  } = props;

  const titleVertical = subTitle !== undefined && subTitle.length > 0;
  const renderTitle = title || subTitle;

  if (loading) {
    return (
      <LoadingContainer style={[containerStyle]}>
        <ActivityIndicator />
      </LoadingContainer>
    );
  }

  return (
    <Container style={[containerStyle]}>
      {image && <StlyedImage source={image} style={[imageStyle]} />}

      {renderTitle && (
        <TitleContainer
          style={[titleContainerStyle]}
          titleTextVertical={titleVertical}>
          <TitleText style={[titleStyle]}> {title} </TitleText>
          {subTitle && subTitle.length > 0 ? (
            <SubTitleText style={[subTitleStyle]}> {subTitle} </SubTitleText>
          ) : null}
        </TitleContainer>
      )}

      {children && (
        <ContentsContainer style={[contentsStyle]}>
          {renderTitle && divider && <Divider style={[dividerStyle]} />}
          {children}
        </ContentsContainer>
      )}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
