import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { COLORS } from 'colors';
import React, { useCallback, useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

const ReviewModal = (props) => {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['50%'], []);

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
            <Button>
              <Text>수정</Text>
            </Button>
            <Button>
              <Text>삭제</Text>
            </Button>
            <Button>
              <Text>신고</Text>
            </Button>
          </CategoryItem>
        </BottomSheet>
      </Container>
    </GestureHandlerRootView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${RFValue(171.5)}px;
  background-color: ${COLORS.lightgray};
`;

const CategoryItem = styled.View`
  flex: 1;
  padding: ${hp(3)}px ${wp(10)}px ${hp(1)}px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
`;

const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: ${hp(0.5)}px 0;
`;

export default ReviewModal;
