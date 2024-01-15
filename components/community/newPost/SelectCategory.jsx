import { getCommunitySection } from 'api/commity';
import { COLORS } from 'colors';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function SelectCategory() {
  // 게시판 리스트 조회 API
  const [SectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getCommunitySection()
      .then((res) => {
        setSectionData(res.data);
        console.log(format(res.data));
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

  const toggleItem = (itemId) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(itemId)) {
        // Item is already selected, remove it
        return prevItems.filter((id) => id !== itemId);
      } else {
        // Item is not selected, add it
        return [...prevItems, itemId];
      }
    });
  };

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
    <>
      {SectionData && SectionData.data && (
        <>
          {SectionData.data.map((item) => (
            <Item key={item.id} onPress={() => toggleItem(item.id)} selected={selectedItems.includes(item.id)}>
              <ItemName>{item.name}</ItemName>
            </Item>
          ))}
        </>
      )}
    </>
  );
}

const Item = styled.TouchableOpacity`
  width: ${wp(25)}px;
  height: ${wp(25)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${hp(2)}px;
  background-color: ${({ selected }) => (selected ? COLORS.main : COLORS.white)};
  border-color: ${COLORS.main};
  border-radius: 10px;
  border-width: 3px;
`;

const ItemName = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.black)};
`;

export default SelectCategory;
