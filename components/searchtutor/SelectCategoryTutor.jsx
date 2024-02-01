import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

SelectCategoryTutor.propTypes = {
  setnewEnSpeciality: PropTypes.func.isRequired,
  setnewKoSpeciality: PropTypes.func.isRequired,
  newKoSpeciality: PropTypes.string.isRequired,
};

function SelectCategoryTutor({ setnewEnSpeciality, setnewKoSpeciality, newKoSpeciality }) {
  const [isToggled, setToggle] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const SectionData = [
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

  const handleToggle = () => {
    setToggle(!isToggled);
  };

  const handleOptionClick = (option) => {
    setSelectedObject(option);
    setnewEnSpeciality(option.english);
    setnewKoSpeciality(option.speciality);
    setToggle(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOptionClick(item)}>
      <ListItem>
        <ListItemText>{item.speciality}</ListItemText>
      </ListItem>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (selectedObject) {
      console.log('newKoSpeciality:', newKoSpeciality);
    }
  }, [selectedObject, newKoSpeciality]);

  return (
    <Section>
      <Button onPress={handleToggle}>
        <SelectText>{selectedObject ? `${selectedObject.speciality}` : newKoSpeciality}</SelectText>
        <AntDesign name={'caretdown'} size={RFValue(15)} color={COLORS.black} />
      </Button>

      <StyledModal transparent={true} visible={isToggled} onRequestClose={() => setToggle(false)}>
        <ModalContent>
          {SectionData && (
            <FlatList data={SectionData} renderItem={renderItem} keyExtractor={(item) => item.speciality} />
          )}
          <CloseButton onPress={handleToggle}>
            <CloseButtonText>닫기</CloseButtonText>
          </CloseButton>
        </ModalContent>
      </StyledModal>
    </Section>
  );
}

const Section = styled.View`
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
`;

const StyledModal = styled(Modal)`
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.View`
  background-color: ${COLORS.white};
  padding: 20px;
  width: ${wp(100)}px;
  height: ${hp(38)}px;
  align-items: center;
  border-radius: 10px;
  border-color: ${COLORS.main};
  justify-content: center;
  align-items: center;
  margin-top: ${hp(17)}px;
  border-width: 2px;
`;

const SelectText = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-bottom: -10px;
  font-weight: bold;
`;

const ListItem = styled.View`
  margin-top: 10px;
`;

const ListItemText = styled.Text`
  font-size: 15px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const CloseButtonText = styled.Text`
  font-size: 16px;
  color: #007bff;
`;

export default SelectCategoryTutor;
