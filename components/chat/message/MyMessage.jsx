import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

MyMessage.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    sender: PropTypes.shape({
      name: PropTypes.string,
      profile: PropTypes.any,
      userId: PropTypes.number,
    }),
  }),
};

function MyMessage({ item }) {
  const hour = parseInt(item.createdAt.substring(11, 13), 10);
  const minute = item.createdAt.substring(14, 16);
  const period = hour < 12 ? '오전' : '오후';

  const formattedHour = hour % 12 || 12;
  const hourMinute = `${period} ${formattedHour}:${minute}`;

  return (
    <Container>
      <ContentContainer>
        <Time>{hourMinute}</Time>
        <TextContainer>
          <Content>{item.content}</Content>
        </TextContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${hp(2)}px;
  padding-horizontal: ${RFValue(12)}px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  max-width: ${wp(65)}px;
  min-width: ${hp(2)}px;
  justify-content: center;
  border-radius: ${RFValue(8)}px;
  padding-vertical: ${RFValue(4)}px;
  padding-horizontal: ${RFValue(12)}px;
  background-color: ${COLORS.main};
`;

const Content = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(12)}px;
  color: ${COLORS.white};
  flex-grow: 1;
`;

const Time = styled.Text`
  margin-right: ${RFValue(4)}px;
  align-self: flex-end;
  color: ${COLORS.gray};
  font-weight: 600;
`;

export default MyMessage;
