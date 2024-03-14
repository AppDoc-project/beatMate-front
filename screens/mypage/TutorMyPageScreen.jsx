import MyBookmarkList from '@components/mypage/mypagetabscreens/List/MyBookmarkList';
import MyCommentList from '@components/mypage/mypagetabscreens/List/MyCommentList';
import MyPostList from '@components/mypage/mypagetabscreens/List/MyPostList';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getMyPageSection } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

function TutorMyPageScreen(props) {
  const navigation = useNavigation();

  const TutorMyPageSet = () => {
    navigation.navigate('MyPageSetScreen');
  };

  const [isMyPost, selectMyPost] = useState(true);
  const [isMyComment, selectMyComment] = useState(false);
  const [isMyBookmark, selectMyBookmark] = useState(false);

  const onPressMyPostBtn = () => {
    selectMyPost(true);
    selectMyComment(false);
    selectMyBookmark(false);
  };

  const onPressMyCommentBtn = () => {
    selectMyPost(false);
    selectMyComment(true);
    selectMyBookmark(false);
  };

  const onPressMyBookmarkBtn = () => {
    selectMyPost(false);
    selectMyComment(false);
    selectMyBookmark(true);
  };
  const [UserInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getMyPageSection()
        .then((res) => {
          console.log(format(res.data));
          setUserInfo(res.data.object);
          setIsLoading(false);
        })

        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log(format(error));
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
            setIsError(true);
          }
          setIsLoading(false);
        });
    }, []),
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
    <Container>
      <Infosection>
        <Settingbtn onPress={TutorMyPageSet}>
          <SettingIcon name={'settings-outline'} size={RFValue(25)} color={'white'} />
        </Settingbtn>
        <ProfileImg>
          {UserInfo && UserInfo.profile && (
            <Image
              source={{
                uri: UserInfo.profile,
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          {UserInfo && !UserInfo.profile && <FontAwesome name={'user-circle'} size={RFValue(80)} color={'lightgray'} />}
        </ProfileImg>
        <Userbox>
          <Usertypebox>
            <Usertype>강사</Usertype>
          </Usertypebox>
          <Username>{UserInfo && UserInfo.name}</Username>
          <Userinfocount>
            게시글 {UserInfo && UserInfo.postCount} | 댓글 {UserInfo && UserInfo.threadCount} | 북마크{' '}
            {UserInfo && UserInfo.bookmarkCount}
          </Userinfocount>
        </Userbox>
      </Infosection>

      <SelectMenu>
        <MyPostButton isMyPost={isMyPost} onPress={onPressMyPostBtn}>
          <MyPostText isMyPost={isMyPost}>나의 게시물</MyPostText>
        </MyPostButton>

        <MyCommentButton isMyComment={isMyComment} onPress={onPressMyCommentBtn}>
          <MyCommentText isMyComment={isMyComment}>나의 댓글</MyCommentText>
        </MyCommentButton>

        <MyBookmarkButton isMyBookmark={isMyBookmark} onPress={onPressMyBookmarkBtn}>
          <MyBookmarkText isMyBookmark={isMyBookmark}>나의 북마크</MyBookmarkText>
        </MyBookmarkButton>
      </SelectMenu>

      <ShowMainInfo>
        {isMyPost && <MyPostList />}
        {isMyComment && <MyCommentList />}
        {isMyBookmark && <MyBookmarkList />}
      </ShowMainInfo>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Infosection = styled.View`
  background-color: ${COLORS.main};
  display: flex;
  height: ${hp(30)}px;
  width: 100%;
  align-items: center;
  position: relative;
`;

const Settingbtn = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
`;

const SettingIcon = styled(Ionicons)`
  position: absolute;
  top: 0;
  right: 0;
`;

const ProfileImg = styled.View`
  position: absolute;
  top: 125px;
  left: 35px;
`;

const Userbox = styled.View`
  position: absolute;
  top: 120px;
  right: 100px;
`;

const Usertypebox = styled.View`
  width: 60px;
  height: 25px;
  border-radius: 15px;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
`;

const Usertype = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

const Username = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  margin: 5px 0px;
`;

const Userinfocount = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(10.5)}px;
  margin: 5px 0px;
`;

const SelectMenu = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${hp(5)}px;
  justify-content: center;
  align-items: center;
`;

const MyPostButton = styled.TouchableOpacity`
  width: 33.3%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ isMyPost }) => (isMyPost ? 'black' : COLORS.lightgray)};
`;

const MyPostText = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({ isMyPost }) =>
    isMyPost
      ? `
      font-weight: bold;
      color: ${COLORS.black};
      `
      : `
      font-weight: normal;
      color: ${COLORS.lightgray};
      `}
`;

const MyCommentButton = styled.TouchableOpacity`
  width: 33.3%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ isMyComment }) => (isMyComment ? 'black' : COLORS.lightgray)};
`;

const MyCommentText = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({ isMyComment }) =>
    isMyComment
      ? `
      font-weight: bold;
      color: ${COLORS.black};
      `
      : `
      font-weight: normal;
      color: ${COLORS.lightgray};
      `}
`;

const MyBookmarkButton = styled.TouchableOpacity`
  width: 33.3%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${({ isMyBookmark }) => (isMyBookmark ? 'black' : COLORS.lightgray)};
`;

const MyBookmarkText = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({ isMyBookmark }) =>
    isMyBookmark
      ? `
      font-weight: bold;
      color: ${COLORS.black};
      `
      : `
      font-weight: normal;
      color: ${COLORS.lightgray};
      `}
`;

const ShowMainInfo = styled.View``;

export default TutorMyPageScreen;
