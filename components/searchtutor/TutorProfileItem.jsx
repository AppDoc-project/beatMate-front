import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import vocal from '@assets/vocal.jpg';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'colors';
import { RFValue } from 'react-native-responsive-fontsize';

function TutorProfileItem(props) {

  return (
    <Container>
      <TutorProfileBox>
        <ImageBox>
          <ProfileImage source={vocal} />
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
          <Bookmark></Bookmark>
        </Item>
      </TutorProfileBox>
    </Container>
  );
}
const Container = styled.View`
  height: ${hp(18)}px;
  padding: ${hp(2)}px ${wp(4)}px;

  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
`;

const TutorProfileBox = styled.View`
  flex-direction: row;
`;

const ImageBox = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 70%;
  overflow: hidden;
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Name = styled.Text``;

const FieldBox = styled.View``;

const Field = styled.Text``;

const TutorItem = styled.View`
  flex-direction: row;
`;

const LessonName = styled.Text``;

const LessonInfo = styled.View`
  flex-direction: row;
`;

const InfoTxt = styled.Text``;

const Bookmark = styled.View``;

const Item = styled.View`
  flex-direction: column;
  margin: ${hp(4)}px ${wp(10)}px;
`;

export default TutorProfileItem;
