
import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, { FC, ReactNode, ReactNodeArray } from 'react';

import styled from 'styled-components/native';

import { styles } from './styles';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
`;

const ContentsContainer = styled.View`
  padding: 16px 24px;
  width: 100%;
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
  justify-content: ${(props) => { return props.titleTextVertical ? 'flex-start' : 'center'; }};
  padding: 3px 10px;
  height: 46px;
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
  font-weight: bold;
  background-color: transparent;
  color: #000000;
`;

const SubTitleText = styled.Text`
  font-size: 10px;
  font-weight: 400;
  background-color: transparent;
  color: #e4e4e4;
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
  hasDivider?: boolean;
  dividerStyle?: ViewStyle;
  outlined?: boolean;
  raised?:boolean;
  titleNumberOfLine?: number;
  subTitleNumberOfLine?: number;
}

interface TitleContainerProps extends ViewProps {
  hasSubTitle?: boolean;
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
    hasDivider = true,
    dividerStyle,
    outlined,
    raised,
    titleNumberOfLine = 1,
    subTitleNumberOfLine = 1,
  } = props;

  const renderTitle = title || subTitle;

  if (loading) {
    return (
      <LoadingContainer style={[containerStyle]}>
        <ActivityIndicator />
      </LoadingContainer>
    );
  }

  const shadowStyle = raised ? styles.raisedShadow : styles.shadow;

  return (
    <Container style={[outlined ? styles.border : shadowStyle, containerStyle]}>
      {image && <StlyedImage source={image} style={[imageStyle]} />}

      {children && (
        <ContentsContainer style={[contentsStyle]}>
          {renderTitle && <TitleContainer style={[titleContainerStyle]} titleTextVertical={titleVertical} hasSubTitle={!!subTitle} >
            <TitleText numberOfLines={titleNumberOfLine} ellipsizeMode="tail" style={[titleStyle]}> {title} </TitleText>
            {subTitle && subTitle.length > 0 ? (
              <SubTitleText numberOfLines={subTitleNumberOfLine} ellipsizeMode="tail" style={[subTitleStyle]}> {subTitle} </SubTitleText>
            ) : null}
          </TitleContainer>
          }
          {renderTitle && hasDivider && <Divider style={[dividerStyle]} />}
          {children}
        </ContentsContainer>
      )}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
