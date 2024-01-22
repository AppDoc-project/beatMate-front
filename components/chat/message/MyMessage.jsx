import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

MyMessage.propTypes = {
  item: PropTypes.shape({
    userId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }),
  isLast: PropTypes.bool,
};

function MyMessage({ item, isLast }) {
  const { content } = item;
  console.log('item입니다', item);
  return (
    <Container>
      <ContentContainer>
        {isLast && <Time>{item.createdAt}</Time>}
        <TextContainer>
          <Content>{content}</Content>
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
`;

const Time = styled.Text`
  margin-right: ${RFValue(4)}px;
  align-self: flex-end;
  color: ${COLORS.gray};
  font-weight: 600;
`;

export default MyMessage;
