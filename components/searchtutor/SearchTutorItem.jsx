import { COLORS } from 'colors';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

function SearchTutorItem(props) {
  const [isLikeList, setLikeList] = useState(false);

  const toggleLikeList = () => {
    setLikeList(!isLikeList);
    if (isLikeList) {
      console.log('Remove Tutor');
    } else {
      console.log('Added Tutor');
    }
  };
  return (
    <Container>
      <TutorProfileBox>
        <ImageBox>
          <ProfileImage />
        </ImageBox>
        <Item>
          <TutorItem>
            <Name>김철수</Name>
            <FieldBox>
              <Field>보컬</Field>
            </FieldBox>
          </TutorItem>
          <LessonName>보컬 취미</LessonName>
          <LessonInfo>
            <Ionicons name="star" size={RFValue(12)} color={COLORS.main} marginRight={RFValue(3)} />
            <InfoTxt>4.38 | 총 139회 레슨</InfoTxt>
          </LessonInfo>
        </Item>
        <Bookmark onPress={toggleLikeList}>
          <AntDesign
            name={isLikeList ? 'heart' : 'hearto'}
            size={RFValue(20)}
            color={isLikeList ? COLORS.main : COLORS.lightgray}
          />
        </Bookmark>
      </TutorProfileBox>
    </Container>
  );
}
const Container = styled.View``;

const TutorProfileBox = styled.View`
  flex-direction: row;

  height: ${hp(18)}px;
  padding: ${hp(2)}px ${wp(5)}px;

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${COLORS.lightgray};
`;

const ImageBox = styled.View`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  border-radius: ${RFValue(50)}px;
  overflow: hidden;
`;

const ProfileImage = styled(Image)`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  object-fit: cover;
`;

const Item = styled.View`
  flex-direction: column;
  justify-content: center;
  margin: ${hp(4)}px ${wp(10)}px;
`;

const TutorItem = styled.View`
  flex-direction: row;
`;

const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
`;

const FieldBox = styled.View`
  width: ${wp(10)}px;
  height: ${hp(2.5)}px;

  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.main};

  justify-content: center;
  align-items: center;

  margin: ${hp(0)}px ${wp(2)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  color: ${COLORS.main};
`;

const LessonName = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;

  margin: ${hp(1)}px ${wp(0)}px;
`;

const LessonInfo = styled.View`
  flex-direction: row;
`;

const InfoTxt = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
`;

const Bookmark = styled.TouchableOpacity`
  justify-content: center;
`;

export default SearchTutorItem;
