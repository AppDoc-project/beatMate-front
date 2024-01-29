import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function CurrentOnlineLesson(props) {
  const navigation = useNavigation();
  const videoNavi = () => {
    navigation.navigate('videoScreen');
  };
  return (
    <Container>
      <Box>
        <Txt>레슨 확인</Txt>
        <VideoBtn onPress={videoNavi}>
          <Txt>방 입장하기</Txt>
        </VideoBtn>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};
`;

const Box = styled.View`
  width: ${wp(80)}px;
  border-width: ${RFValue(2)}px;
  border-color: ${COLORS.main};
`;

const VideoBtn = styled.TouchableOpacity``;

const Txt = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.black};
`;

export default CurrentOnlineLesson;
