import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components';

OthersMessage.propTypes = {
  item: PropTypes.shape({
    userId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  isLast: PropTypes.bool,
};

function OthersMessage({ item, isLast }) {
  const { content } = item;

  return (
    <Container>
      <Profile source={require('@assets/profile.png')} />
      <ContentContainer>
        <TextContainer>
          <Content>{content}</Content>
        </TextContainer>
        {isLast && <Time>{item.createdAt}</Time>}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;

  margin-bottom: ${hp(2)}px;
  padding-horizontal: ${RFValue(12)}px;
`;

const Profile = styled.Image`
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  margin-right: ${RFValue(8)}px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  max-width: ${wp(65)}px;
  min-width: ${hp(2)}px;
  justify-content: center;

  background-color: ${COLORS.lightgray01};

  border-radius: ${RFValue(8)}px;
  padding-vertical: ${RFValue(4)}px;
  padding-horizontal: ${RFValue(12)}px;
`;

const Content = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(12)}px;
  color: ${COLORS.black};
`;

const Time = styled.Text`
  align-self: flex-end;
  color: ${COLORS.gray};
  font-weight: 600;
  margin-left: ${RFValue(4)}px;
`;

export default OthersMessage;
