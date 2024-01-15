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
  }),
  isLast: PropTypes.bool,
};

function MyMessage({ item, isLast }) {
  const { content } = item;
  return (
    <Container>
      <ContentContainer>
        {isLast && <Time>오후 3:24</Time>}
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
  background-color: ${COLORS.gray02};
`;

const Content = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(12)}px;
  color: ${COLORS.black};
`;

const Time = styled.Text`
  margin-right: ${RFValue(4)}px;
  align-self: flex-end;
  color: ${COLORS.darkgray};
  font-weight: 600;
`;

export default MyMessage;
