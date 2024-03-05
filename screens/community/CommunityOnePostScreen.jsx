import { WriteBtn } from '@assets/Icons/Buttons';
import EnterIcon from '@assets/chat/EnterIcon';
import CommentList from '@components/community/onePage/CommentList';
import MainPostitem from '@components/community/onePage/MainPostItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getOnePost, writeComment } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

function CommunityOnePostScreen({ route }) {
  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    setComment('');
    navigation.goBack();
  };

  const { postId, communityName } = route.params;
  const [comment, setComment] = useState('');
  const onChangeComment = (text) => setComment(text);

  // 댓글 작성 api
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressSendBtn = () => {
    const data = {
      postId: postId,
      text: comment,
    };

    setIsLoading(true);
    writeComment(data)
      .then((res) => {
        setIsLoading(false);
        setComment('');
        console.log('댓글 작성', format(res.data));
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('댓글 작성 실패', error);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
          setIsError(true);
        }
        setIsLoading(false);
      });
  };

  // 단일 게시물 불러오기 api
  const [postInfo, setPostInfo] = useState(null);
  const [isPostLoading, setPostIsLoading] = useState(false);
  const [isPostError, setPostIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setPostIsLoading(true);
      getOnePost(postId)
        .then((res) => {
          console.log('단일 게시물 불러오기', format(res.data.object));
          setPostInfo(res.data.object);
          setPostIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 405) {
            Alert.alert('알림', '삭제된 게시글입니다.');
          } else if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('단일 게시물 불러오기', format(error.response));
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
            setPostIsError(true);
          }
          setPostIsLoading(false);
        });
    }, []),
  );

  if (isLoading || isPostLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError || isPostError) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <WholeWrapper>
          <Top>
            <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => onPressPreviousBtn()} />
            <MainTxt>{communityName}</MainTxt>
          </Top>
          <MainWrapper>{postInfo && <MainPostitem postInfo={postInfo} />}</MainWrapper>
        </WholeWrapper>
        <CommentWrapper>{postInfo && <CommentList postId={postInfo.id} />}</CommentWrapper>
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
            {postInfo && !postInfo.profile && (
              <FontAwesome name={'user-circle'} size={RFValue(30)} color={'lightgray'} />
            )}
          </ProfileImg>
          <Form>
            <CommentInput value={comment} onChangeText={onChangeComment} placeholder={'댓글을 입력해주세요'} />
            <EnterWrapper onPress={onPressSendBtn}>
              <EnterIcon fillColor={comment ? COLORS.main : COLORS.lightgray01} />
            </EnterWrapper>
          </Form>
        </WriteWrapper>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${COLORS.white};
`;

const WholeWrapper = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  flex: 1;
`;

const Top = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled.View`
  margin-top: ${hp(3)}px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: ${hp(10)}px;
`;

const WriteWrapper = styled.View`
  width: ${wp(100)}px;
  padding: ${RFValue(10)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-items: center;
`;

const CommentWrapper = styled.View``;

const ProfileImg = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Form = styled.View`
  min-height: 10%;
  padding: ${wp(4)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: ${wp(-3)}px;
`;

const CommentInput = styled.TextInput`
  width: ${wp(75)}px;

  padding: ${RFValue(12)}px;
  background-color: transparent;

  border-color: ${COLORS.lightgray01};
  border-width: 1px;

  border-radius: ${RFValue(18)}px;
  margin-right: ${wp(1)}px;
`;

const EnterWrapper = styled.TouchableOpacity``;

export default CommunityOnePostScreen;
