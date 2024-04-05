import { COLORS } from 'colors';
import { Auth } from 'context/AuthContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

function SelectBtn(props) {
  const {
    tutor: [tutorSignUpRequest, setTutorSignUpRequest],
  } = useContext(Auth);

  const { specialities } = tutorSignUpRequest;

  const onPressMedicalSpeciality = () => {
    const { english } = props;
    const updatedSpecialities = specialities || [];

    // 빈 값인지 확인하고 빈 값이 아니면서 포함되지 않은 경우에만 추가
    if (english && !updatedSpecialities.includes(english)) {
      const newSpecialities = [...updatedSpecialities, english];
      setTutorSignUpRequest((prev) => ({ ...prev, specialities: newSpecialities }));
      console.log('Added:', english, 'Specialities:', newSpecialities);
    } else if (updatedSpecialities.includes(english)) {
      // 포함된 경우, 해당 값을 삭제하도록 수정
      const filteredSpecialities = updatedSpecialities.filter((item) => item !== english);
      setTutorSignUpRequest((prev) => ({ ...prev, specialities: filteredSpecialities }));
      console.log('Removed:', english, 'Specialities:', filteredSpecialities);
    }
  };

  const isButtonSelected = specialities && specialities.includes(props.english);

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

function SelectSpecialityTab(props) {
  const datas = [
    { speciality: '피아노', english: 'PIANO' },
    { speciality: '기타', english: 'GUITAR' },
    { speciality: '보컬', english: 'VOCAL' },
    { speciality: '드럼', english: 'DRUM' },
    { speciality: '베이스', english: 'BASS' },
    { speciality: '음악이론', english: 'MUSIC_THEORY' },
    { speciality: '작곡', english: 'COMPOSITION' },
    { speciality: '관악기', english: 'WIND_INSTRUMENT' },
    { speciality: '현악기', english: 'STRING_INSTRUMENT' },
    { speciality: '건반악기', english: 'KEYBOARD_INSTRUMENT' },
  ];

  // 데이터를 3개씩 그룹화
  const chunkSize = 5;
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
          음악 분야를 선택해주세요.{'\n'}
          <Text style={{ color: COLORS.lightgray, fontSize: RFValue(12), fontWeight: 'normal' }}>
            (택1 필수. 다중 선택 가능)
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
  font-size: ${RFValue(14)}px;
`;

const Component = styled.View`
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
  width: ${wp(17)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${(props) => (props.selected ? 'navy' : 'lightgray')};
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

export default SelectSpecialityTab;
