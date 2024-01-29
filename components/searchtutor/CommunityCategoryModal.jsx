import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { COLORS } from 'colors';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

const SELECTED_ICON_COLOR = COLORS.main;
const UNSELECTED_ICON_COLOR = COLORS.lightgray;

const categories = ['자유게시판', '피아노', '기타', '보컬', '드럼', '베이스', '음악이론', '작곡', '관악기', '건반악기'];

// eslint-disable-next-line react/prop-types
function CommunityCategoryModal({ onClose, onSelectCategory, selectedCategory }) {
  const [selectedCommunityIndex, setSelectedCommunityIndex] = useState(null);

  const getCategoryByIndex = (index) => {
    return categories[index] || null;
  };

  const handleCommunitySelection = (index) => {
    setSelectedCommunityIndex(index);
    const selectedCategory = getCategoryByIndex(index);
    onSelectCategory(selectedCategory);
    onClose();
  };

  useEffect(() => {
    if (selectedCommunityIndex === null) {
      setSelectedCommunityIndex(0);
    }
  }, [selectedCommunityIndex]);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['75%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <BottomSheet
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={null}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
        >
          <CategoryItem>
            {categories.map((category, index) => (
              <Btn key={index} onPress={() => handleCommunitySelection(index)}>
                <FontAwesome
                  name="dot-circle-o"
                  size={RFValue(20)}
                  color={selectedCategory === getCategoryByIndex(index) ? SELECTED_ICON_COLOR : UNSELECTED_ICON_COLOR}
                />
                <Text>{category}</Text>
              </Btn>
            ))}
          </CategoryItem>
        </BottomSheet>
      </Container>
    </GestureHandlerRootView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: ${RFValue(171.5)}px;
  background-color: ${COLORS.lightgray};
`;

const CategoryItem = styled.View`
  flex: 1;
  padding: ${hp(3)}px 0 ${hp(1)}px ${wp(5)}px;
`;

const Btn = styled.TouchableOpacity`
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: ${hp(0.5)}px ${wp(2)}px;
`;

export default CommunityCategoryModal;
