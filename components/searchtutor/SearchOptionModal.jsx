import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { COLORS } from 'colors';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
function SearchOptionModal({ onSelectSearchOption, onClose }) {
  const [, setSelectedOptionIndex] = useState(null);
  const getOptionByIndex = (index) => {
    switch (index) {
      case 0:
        return '찜 많은 순';
      case 1:
        return '레슨 횟수 많은 순';
      case 2:
        return '평점 높은 순';
      default:
        return null;
    }
  };
  const handleOptionSelection = (index) => {
    setSelectedOptionIndex(index);
    const selectedOption = getOptionByIndex(index);
    onSelectSearchOption(selectedOption);
    onClose();
  };

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['35%'], []);

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
            <Btn onPress={() => handleOptionSelection(0)}>
              <Txt>찜 많은 순</Txt>
            </Btn>
            <Btn onPress={() => handleOptionSelection(1)}>
              <Txt>레슨 횟수 많은 순</Txt>
            </Btn>
            <Btn onPress={() => handleOptionSelection(2)}>
              <Txt>평점 높은 순</Txt>
            </Btn>
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
  align-items: center;
`;

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: ${hp(0.5)}px 0;
`;

export default SearchOptionModal;
