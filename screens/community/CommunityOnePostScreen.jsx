import { WriteBtn } from '@assets/Icons/Buttons';
import MainPostitem from '@components/community/onePage/MainPostItem';
import { useNavigation } from '@react-navigation/native';
import { getOnePost } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

function CommunityOnePostScreen({ route }) {
  const navigation = useNavigation();

  const { postId, communityName } = route.params;
  const [comment, setComment] = useState('');
  const onChangeTitle = (text) => setComment(text);

  // 단일 게시물 불러오기 api
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOnePost(postId)
      .then((res) => {
        console.log('단일 게시물 불러오기', format(res.data.object));
        setPostInfo(res.data.object);
        setIsLoading(false);
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
      <MainWrapper>{postInfo && <MainPostitem postInfo={postInfo} />}</MainWrapper>
      <Btn onPress={() => navigation.navigate('writeNewPostScreen')}>
        <WriteBtn />
      </Btn>
      <WriteWrapper>
        <ProfileImg>
          {postInfo && postInfo.profile && (
            <Image
              source={{
                uri: postInfo.profile,
              }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
          )}
          {postInfo && !postInfo.profile && <FontAwesome name={'user-circle'} size={RFValue(90)} color={'lightgray'} />}
        </ProfileImg>
        <CommentInput
          value={comment}
          onChangeText={onChangeTitle}
          placeholder="댓글을 입력해주세요"
          placeholderTextColor={COLORS.lightgray01}
        />
      </WriteWrapper>
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

const MainWrapper = styled.View`
  flex: 1;
  margin-top: ${hp(10)}px;
  
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: ${hp(10)}px;
`;

const WriteWrapper = styled.View`
  position: absolute;
  bottom: 5px;
  width: ${wp(100)}px;
  padding: ${RFValue(10)}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
`;

const ProfileImg = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: ${RFValue(5)}px;
`;

const CommentInput = styled.TextInput`
  background-color: transparent;
  position: relative;

  width: ${wp(80)}px;

  border-color: ${COLORS.lightgray01};
  border-width: 1px;
  border-radius: ${RFValue(15)}px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default CommunityOnePostScreen;
