import React, { useCallback, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import styled from 'styled-components';
import { COLORS } from 'colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function CommunityCategory() {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['48%', '80%'], []); //ok

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        <BottomSheet
          ref={bottomSheetRef}
          index={0} // snapPoints의 배열 0번째 인덱스
          snapPoints={snapPoints} //ok
          onChange={handleSheetChanges}
          handleComponent={null}
          enablePanDownToClose={true}
        >
          <CategoryItem>
            <Text>자유게시판</Text>
            <Text>피아노</Text>
            <Text>기타</Text>
            <Text>보컬</Text>
            <Text>드럼</Text>
            <Text>드럼</Text>
            <Text>베이스</Text>
            <Text>음악이론</Text>
            <Text>작곡</Text>
            <Text>관악기</Text>
            <Text>건반악기</Text>
          </CategoryItem>
        </BottomSheet>
      </Container>
    </GestureHandlerRootView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: ${RFValue(171.5)}px;
  background-color: ${COLORS.main};
`;

const CategoryItem = styled.TouchableOpacity`
  flex: 1;
  padding: ${hp(3)}px ${wp(10)}px ${hp(1)}px;
`;

const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: ${hp(0.8)}px ${wp(1)}px;
`;

export default CommunityCategory;
