import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

function MyTutorScreen(props) {

  return (
    <Myteacher>
      <Teacherimage></Teacherimage>
      <Teachcate>현악기 바이올린</Teachcate>
      <Teacherbox>
        <Teachername>김철수</Teachername>
        <Teacher>강사</Teacher>
      </Teacherbox>
      <Teacherbookmarkicon name={'heart'} size={RFValue(40)} color={'#BB271A'} />
    </Myteacher>
  );
}

const Myteacher = styled.View`
  height: 125px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
`;

const Teacherimage = styled.View``;

const Teachcate = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.subMiddleblue};
  margin: 35px 0px 10px 130px;
`;

const Teacherbox = styled.TouchableOpacity`
  flex-direction: row;
`;

const Teachername = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 900;
  color: ${COLORS.black};
  margin: 0px 0px 5px 130px;
`;

const Teacher = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: 0px 0px 5px 5px;
`;

const Teacherbookmarkicon = styled(MaterialCommunityIcons)`
  position: absolute;
  right: 30px;
  top: 30px;
`;

export default MyTutorScreen;
