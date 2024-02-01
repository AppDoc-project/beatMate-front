import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

MyTutorListItem.propTypes = {
  myTutorData: PropTypes.shape({
    name: PropTypes.string.isRequired, // 해당 강사 이름
    id: PropTypes.number.isRequired, // 해당 강사 id
    profile: PropTypes.string.isRequired, // 해당 강사 프로필 주소
    specialities: PropTypes.array.isRequired, // 해당 강사 분야
    reviewCount: PropTypes.number.isRequired, // 리뷰 수
    score: PropTypes.number.isRequired, // 해당 강사 평점
    lessonCount: PropTypes.number.isRequired, // 레슨 진행 횟수
    pickYn: PropTypes.bool.isRequired, // 내가 찜 했는지 여부
  }).isRequired,
};

function MyTutorListItem({ myTutorData }) {
  const navigation = useNavigation();

  //해당 강사 프로필로 이동해야함.
  const onPressTutorProfile = () => {
    // navigation.navigate('communityOnePostScreen', { postId, communityName });
  };

  return (
    <Container>
      <Myteacher onPress={onPressTutorProfile}>
        <LayoutWrapper>
          <ProfileImg>
            {myTutorData.profile && (
              <Image
                source={{
                  uri: myTutorData.profile,
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            )}
            {!myTutorData.profile && <FontAwesome name={'user-circle'} size={RFValue(40)} color={'lightgray'} />}
          </ProfileImg>
          <TutorInfo>
            <Wrapper>
              {myTutorData.specialities &&
                myTutorData.specialities.map((speciality, index) => (
                  <Teachcate key={index}>
                    {speciality}
                    {index < myTutorData.specialities.length - 1 && <Gap />}
                  </Teachcate>
                ))}
            </Wrapper>

            <Teacherbox>
              <Teachername>{myTutorData.name}</Teachername>
              <Teacher>강사</Teacher>
            </Teacherbox>
          </TutorInfo>
          <MaterialCommunityIcons name={'heart'} size={RFValue(30)} color={COLORS.subLightblue} />
        </LayoutWrapper>
      </Myteacher>
    </Container>
  );
}

const Container = styled.View`
  height: auto;
  width: ${wp(100)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
  padding: ${RFValue(10)}px;
`;

const Myteacher = styled.TouchableOpacity``;

const LayoutWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.View`
  border-radius: 50%;
`;

const Wrapper = styled.View`
  flex-direction: row;
  margin-bottom: ${hp(1)}px;
`;

const Teachcate = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.subMiddleblue};
`;

const Gap = styled.View`
  width: ${wp(1)}px;
`;

const Teacherbox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Teachername = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 900;
  color: ${COLORS.black};
`;

const Teacher = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.black};
`;

const TutorInfo = styled.View``;

export default MyTutorListItem;
