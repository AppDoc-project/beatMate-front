import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

ReviewItem.propTypes = {
  lessonCount: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

function ReviewItem({ lessonCount, reviewCount, score }) {
  return (
    <Container>
      <ReviewBox>
        <Ionicons name="star" size={RFValue(15)} color={COLORS.main} marginRight={RFValue(3)} />
        <ReviewTxt>
          {score} ({reviewCount})
        </ReviewTxt>
      </ReviewBox>
      <LessonCountBox>
        <LessonCount>총 레슨 횟수 ({lessonCount})</LessonCount>
      </LessonCountBox>
    </Container>
  );
}
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0 ${wp(1)}px;
  height: ${hp(5)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
`;
const ReviewBox = styled.View`
  flex-direction: row;
`;

const ReviewTxt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
`;

const LessonCountBox = styled.View``;

const LessonCount = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${COLORS.lightgray};
`;

export default ReviewItem;
