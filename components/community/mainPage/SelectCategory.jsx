import { getCommunitySection } from 'api/commity';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Modal, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

SelectCategory.propTypes = {
  setCommunityId: PropTypes.func.isRequired,
  communityName: PropTypes.string.isRequired,
};

function SelectCategory({ setCommunityId, communityName }) {
  const [isToggled, setToggle] = useState(false);
  const [SectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommunitySection()
      .then((res) => {
        setSectionData(res.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleToggle = () => {
    setToggle(!isToggled);
  };

  const handleOptionClick = (option) => {
    setSelectedObject(option);
    setToggle(false);
    setCommunityId(option.id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOptionClick(item)}>
      <ListItem>
        <ListItemText>{item.name}</ListItemText>
      </ListItem>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingText>로딩중...</LoadingText>
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <ErrorContainer>
        <ErrorText>에러 발생</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Section>
      <Button onPress={handleToggle}>
        <SelectText>{selectedObject ? `${selectedObject.name}` : communityName}</SelectText>
        <AntDesign name={'caretdown'} size={RFValue(15)} color={COLORS.black} />
      </Button>

      <StyledModal transparent={true} visible={isToggled} onRequestClose={() => setToggle(false)}>
        <ModalContent>
          {SectionData && SectionData.data && (
            <FlatList data={SectionData.data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
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
  height: ${hp(45)}px;
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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  font-size: 18px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-size: 18px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const CloseButtonText = styled.Text`
  font-size: 16px;
  color: #007bff;
`;

export default SelectCategory;
