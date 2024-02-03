import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { mapEnglishToKorean } from 'hook/TutorSpecialityKo';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

SearchTutorItem.propTypes = {
  searchedTutor: PropTypes.shape({
    id: PropTypes.number.isRequired, // 해당 강사 id
    lessonCount: PropTypes.number.isRequired, // 레슨 진행 횟수
    name: PropTypes.string.isRequired, // 해당 강사 이름
    pickYn: PropTypes.bool.isRequired, // 내가 찜 했는 지 여부
    profile: PropTypes.string, // 해당 강사 프로필 주소
    reviewCount: PropTypes.number.isRequired, // 리뷰 수
    score: PropTypes.number.isRequired, // 해당 강사 평점
    specialities: PropTypes.array.isRequired, // 해당 강사 분야
  }).isRequired,
};

function SearchTutorItem({ searchedTutor }) {
  const navigation = useNavigation();

  const onPressNavigate = () => {
    navigation.navigate('tutorProfileScreen', { tutorId: searchedTutor.id });
  };

  return (
    <Container>
      <TutorProfileBox onPress={onPressNavigate}>
        <ProfileImg>
          {searchedTutor.profile && (
            <Image
              source={{
                uri: searchedTutor.profile,
              }}
              style={{ width: wp(20), height: wp(20), borderRadius: 50 }}
            />
          )}
          {!searchedTutor.profile && <FontAwesome name={'user-circle'} size={RFValue(50)} color={'lightgray'} />}
        </ProfileImg>
        <Item>
          <TutorItem>
            <Name>{searchedTutor.name}</Name>
            <FieldBox>
              {searchedTutor.specialities &&
                searchedTutor.specialities.map((speciality, index) => (
                  <Field key={index}>
                    {mapEnglishToKorean(speciality)}
                    {index < searchedTutor.specialities.length - 1 && <Gap />}
                  </Field>
                ))}
            </FieldBox>
          </TutorItem>
          <LessonInfo>
            <Ionicons name="star" size={RFValue(12)} color={COLORS.main} marginRight={RFValue(3)} />
            <InfoTxt>
              {searchedTutor.score} | 총 {searchedTutor.lessonCount} 레슨
            </InfoTxt>
          </LessonInfo>
        </Item>
      </TutorProfileBox>
    </Container>
  );
}
const Container = styled.View``;

const TutorProfileBox = styled.TouchableOpacity`
  flex-direction: row;
  width: ${wp(100)}px;
  height: ${hp(15)}px;
  padding: ${wp(1)}px;

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${COLORS.lightgray};
  align-items: center;
`;

const ProfileImg = styled.View`
  border-radius: 50%;
  margin-right: ${wp(2)}px;
`;

const Item = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const TutorItem = styled.View`
  flex-direction: row;
  margin-bottom: ${hp(1)};
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  margin-bottom: ${wp(1)}px;
`;

const FieldBox = styled.View`
  width: auto;
  height: auto;

  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.main};

  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${wp(2)}px;
  padding: ${wp(1)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.main};
`;

const LessonInfo = styled.View`
  flex-direction: row;
`;

const InfoTxt = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
`;

const Gap = styled.View`
  width: ${wp(1)}px;
`;

export default SearchTutorItem;
