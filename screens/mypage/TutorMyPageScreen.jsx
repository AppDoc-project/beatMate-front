import { COLORS } from 'colors';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyBookmarkScreen from './mypagetabscreens/MyBookmarkScreen';
import MyCommentScreen from './mypagetabscreens/MyCommentScreen';
import MyPostScreen from './mypagetabscreens/MyPostScreen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function TutorMyPageScreen(props) {
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

  return (
    <Container>
      <Infosection>
        <SettingIcon name={'settings-outline'} size={RFValue(25)} color={'white'} />
        <Profileimage name={'user-circle'} size={RFValue(90)} color={'lightgray'} />
        <Userbox>
          <Usertypebox>
            <Usertype>강사</Usertype>
          </Usertypebox>
          <Username>김철수</Username>
          <Userintro>안녕하세요.</Userintro>
          <Userinfocount>게시글 2 | 댓글 16 | 북마크 1</Userinfocount>
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
        {isMyPost && <MyPostScreen />}
        {isMyComment && <MyCommentScreen />}
        {isMyBookmark && <MyBookmarkScreen />}
      </ShowMainInfo>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Infosection = styled.View`
  flex: 0.5;
  background-color: ${COLORS.main};
`;

const SettingIcon = styled(Ionicons)`
  position: absolute;
  top: 50px;
  right: 20px;
`;

const Profileimage = styled(FontAwesome)`
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

const Userintro = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(14)}px;
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
