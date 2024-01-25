import { WriteBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { getOnePost } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function CommunityOnePostScreen({ route }) {
  const { postId, communityName } = route.params;

  const navigation = useNavigation();

  // 단일 게시물 불러오기 api
  const [PostInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOnePost(postId)
      .then((res) => {
        console.log('단일 게시물 불러오기', format(res.data));
        setPostInfo(res.data);
        setIsLoading(false);
        console.log(format(PostInfo));
      })
      .catch((err) => {
        console.log('단일 게시물 불러오기', err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

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

  CommunityOnePostScreen.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        postId: PropTypes.number.isRequired,
        communityName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  return (
    <Container>
      <Top>
        <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => navigation.goBack()} />
        <MainTxt>{communityName}</MainTxt>
      </Top>
      <Btn onPress={() => navigation.navigate('writeNewPostScreen')}>
        <WriteBtn />
      </Btn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  align-items: center;
`;

const Top = styled.View`
  top: ${hp(5)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  flex: 1;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default CommunityOnePostScreen;
