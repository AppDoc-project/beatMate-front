import { getCommunitySection } from 'api/commity';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function SelectCategory(setCommunityId) {
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
    setCommunityId(selectedObject.id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOptionClick(item)}>
      <ListItem>
        <Text>{item.name}</Text>
      </ListItem>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <Section>
      <Button onPress={handleToggle}>
        <SelectText>{selectedObject ? `${selectedObject.name}` : '카테고리 설정하기'}</SelectText>
      </Button>

      <Modal transparent={true} visible={isToggled} onRequestClose={() => setToggle(false)}>
        <ModalContent>
          {SectionData && SectionData.data && (
            <FlatList data={SectionData.data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
          )}
        </ModalContent>
      </Modal>
    </Section>
  );
}

const Section = styled.View`
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity``;

const SelectText = styled.Text`
  font-size: 15px;
`;

const ModalContent = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  width: ${wp(90)}px;
  align-items: center;
`;

const ListItem = styled.Text`
  margin-top: 10px;
  font-size: 15px;
`;

export default SelectCategory;
