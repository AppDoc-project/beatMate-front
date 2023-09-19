import { Auth } from 'context/AuthContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

function SelectBtn(props) {
  const {
    doctor: [doctorSignUpRequest, setDoctorSignUpRequest],
  } = useContext(Auth);

  const { medicalSpeciality } = doctorSignUpRequest;

  // 해당 버튼을 눌렀을 때, medicalSpeciality 값을 변경
  const onPressMedicalSpeciality = () => {
    const { english } = props;
    setDoctorSignUpRequest((prev) => ({ ...prev, medicalSpeciality: english }));
  };

  const isButtonSelected = medicalSpeciality === props.english; // 선택 여부 확인

  return (
    <Btn onPress={onPressMedicalSpeciality} selected={isButtonSelected}>
      <TypeText selected={isButtonSelected}>{props.speciality}</TypeText>
    </Btn>
  );
}

SelectBtn.propTypes = {
  english: PropTypes.string.isRequired,
  speciality: PropTypes.string.isRequired,
};

function SelectMedicalSpecialityTab(props) {
  const datas = [
    { speciality: '내과', english: 'INTERNAL_MEDICINE' },
    { speciality: '외과', english: 'SURGERY' },
    { speciality: '정형외과', english: 'ORTHOPEDICS' },
    { speciality: '안과', english: 'OPHTHALMOLOGY' },
    { speciality: '이비인후과', english: 'OTORHINOLARYNGOLOGY' },
    { speciality: '피부과', english: 'DERMATOLOGY' },
    { speciality: '치과', english: 'DENTISTRY' },
    { speciality: '비뇨기과', english: 'UROLOGY' },
    { speciality: '성형외과', english: 'PLASTICSURGERY' },
  ];

  // 데이터를 3개씩 그룹화
  const chunkSize = 3;
  const specialityGroups = Array.from({ length: Math.ceil(datas.length / chunkSize) }, (_, i) =>
    datas.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  // 각 그룹을 가로 행으로 표시
  const rows = specialityGroups.map((group, rowIndex) => (
    <Row key={rowIndex}>
      {group.map((speciality) => (
        <SelectBtn speciality={speciality.speciality} english={speciality.english} key={speciality.english} />
      ))}
    </Row>
  ));

  return (
    <Container>
      <Component>
        <Txt>
          의료분야를 선택해주세요.{' '}
          <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}>
            {' '}
            (택1 필수. 중복 불가)
          </Text>
        </Txt>
        {rows}
      </Component>
    </Container>
  );
}

const Container = styled.View``;

const TypeText = styled.Text`
  color: ${(props) => (props.selected ? 'navy' : 'lightgray')};
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${hp(1)}px;
`;

const Btn = styled.TouchableOpacity`
  top: ${hp(1.5)}px;
  width: ${wp(25)}px;
  height: ${hp(5.5)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${(props) => (props.selected ? 'navy' : 'lightgray')};
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

export default SelectMedicalSpecialityTab;
