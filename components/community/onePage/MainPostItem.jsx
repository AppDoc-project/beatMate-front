import { useNavigation } from '@react-navigation/native';
import { pressLike, pressBookmark, deletePost } from 'api/commity';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Image, Alert, TouchableOpacity, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

MainPostitem.propTypes = {
  postInfo: PropTypes.shape({
    id: PropTypes.number, // 게시글 아이디
    userId: PropTypes.number, // 유저 아이디
    title: PropTypes.string, // 제목
    nickName: PropTypes.string, // 작성자 닉네임
    profile: PropTypes.string, // 작성자 프로필 경로
    bookmarkCount: PropTypes.number, // 북마크 수
    likeCount: PropTypes.number, // 좋아요 수
    threadCount: PropTypes.number, // 댓글 수
    mediaCount: PropTypes.number, // 사진 수
    createdAt: PropTypes.string, // 작성일
    isTutor: PropTypes.bool, // 튜터 여부 (true/false)
    bookmarkYN: PropTypes.bool, // 내가 북마크 눌렀는 지 여부 (true/false)
    text: PropTypes.string, // 게시글 내용
    pictures: PropTypes.array, // 사진 주소 배열
    view: PropTypes.number, //조회수
    likeYN: PropTypes.bool, //좋아요 선택 여부
  }).isRequired,
};

function MainPostitem({ postInfo }) {
  const formattedDate = postInfo && postInfo.createdAt.substring(0, 10).replace(/:/g, '.');
  const navigation = useNavigation();

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const userId = loginUser.id;

  // 좋아요 기능
  const addLike = () => {
    const data = {
      postId: postInfo.id,
    };

    pressLike(data)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        Alert.alert('알림', '요청을 성공하였습니다.');
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 410) {
          Alert.alert('알림', '좋아요를 이미 눌렀습니다.');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('좋아요 실패', format(error));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  // 북마크 기능
  const addBookmark = () => {
    const data = {
      postId: postInfo.id,
    };

    pressBookmark(data)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        Alert.alert('알림', '요청을 성공하였습니다.');
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('북마크 실패', format(error));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  // 게시글 수정/삭제 팝업창 띄우기
  const [banModal, setBanModal] = useState(false);

  // 게시물 삭제 기능
  const reportPost = () => {
    deletePost(postInfo.id)
      .then((res) => {
        console.log('삭제 성공');
        setBanModal(false);
        navigation.goBack();
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('삭제 실패', error.response.data);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  return (
    <Container>
      {postInfo && (
        <Info>
          <FirstRow>
            <PostText>
              <FirstWrapper>
                <Title>{postInfo.title}</Title>
                <SecondWrapper>
                  <Date>
                    {formattedDate} | 조회수 {postInfo.view}
                  </Date>
                  {userId === postInfo.userId && (
                    <TouchableOpacity onPress={() => setBanModal(true)}>
                      <MaterialCommunityIcons name={'dots-vertical'} color={COLORS.lightgray01} size={RFValue(17)} />
                    </TouchableOpacity>
                  )}

                  <Modal animationType="none" transparent={true} visible={banModal}>
                    <BanModal>
                      <Box1 onPress={() => reportPost()}>
                        <BoxLabel color={COLORS.black}>게시물 삭제하기</BoxLabel>
                      </Box1>
                      <Box2
                        onPress={() => {
                          setBanModal(false);
                          navigation.navigate('writeNewPostScreen', { postInfo });
                        }}
                      >
                        <BoxLabel color={COLORS.red}>게시글 수정하기</BoxLabel>
                      </Box2>
                      <Box3 onPress={() => setBanModal(false)}>
                        <BoxLabel color={COLORS.black}>취소</BoxLabel>
                      </Box3>
                    </BanModal>
                  </Modal>
                </SecondWrapper>
              </FirstWrapper>
              <Content>{postInfo.text}</Content>
            </PostText>
          </FirstRow>

          {postInfo && postInfo.pictures && postInfo.pictures.length > 0 && (
            <PicturesWrapper>
              {postInfo.pictures.slice(0, 3).map((picture, index) => (
                <Picture key={index} source={{ uri: picture }} />
              ))}
              {postInfo.pictures.length > 3 && postInfo.pictures.length <= 5 && (
                <PicturesWrapper>
                  {postInfo.pictures.slice(3, 6).map((picture, index) => (
                    <Picture key={index} source={{ uri: picture }} />
                  ))}
                </PicturesWrapper>
              )}
            </PicturesWrapper>
          )}

          <Wrapper>
            <UserInfoWrapper>
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
              <Name numberOfLines={1}>{postInfo.nickName}</Name>
            </UserInfoWrapper>
            <IconWrapper>
              <SingleIconWrapper>
                <MaterialCommunityIcons name={'comment'} color={COLORS.lightgray01} size={RFValue(17)} />
                <IconText>{postInfo.threadCount}</IconText>
              </SingleIconWrapper>
              <SingleIconWrapper>
                {postInfo.likeYN ? (
                  <MaterialCommunityIcons name={'cards-heart'} color={COLORS.main} size={RFValue(17)} />
                ) : (
                  <MaterialCommunityIcons name={'cards-heart'} color={COLORS.lightgray01} size={RFValue(17)} />
                )}
                <IconText>{postInfo.likeCount}</IconText>
              </SingleIconWrapper>
              <SingleIconWrapper>
                {postInfo.bookmarkYN ? (
                  <MaterialCommunityIcons name={'bookmark'} color={COLORS.main} size={RFValue(17)} />
                ) : (
                  <MaterialCommunityIcons name={'bookmark'} color={COLORS.lightgray01} size={RFValue(17)} />
                )}
                <IconText>{postInfo.bookmarkCount}</IconText>
              </SingleIconWrapper>
            </IconWrapper>
          </Wrapper>
          <SetBtnsWrapper>
            <LikeBtn onPress={() => addLike()}>
              <BtnTxt>좋아요 누르기</BtnTxt>
            </LikeBtn>
            <BookmarkBtn onPress={() => addBookmark()}>
              <BtnTxt>북마크 등록하기</BtnTxt>
            </BookmarkBtn>
          </SetBtnsWrapper>
        </Info>
      )}
    </Container>
  );
}

const Container = styled.View`
  background-color: ${COLORS.white};
  padding: ${RFValue(8)}px;
  justify-content: space-between;
  flex-direction: column;
`;

const Info = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`;

const ProfileImg = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: ${RFValue(5)}px;
`;

const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${RFValue(30)}px;
`;

const FirstWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SecondWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${wp(8)}px;
`;

const PostText = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  flex-shrink: 1;
`;

const Wrapper = styled.View`
  width: ${wp(100)}px;
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(15)}px;
  justify-content: space-between;
  margin-right: ${wp(8)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 500;
  width: ${wp(20)}px;
  color: ${COLORS.gray};
  flex-shrink: 1;
`;

const UserInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${RFValue(30)}px;
  margin-bottom: ${hp(1)}px;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp(1)}px;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.lightgray};
`;

const Content = styled.Text`
  font-size: ${RFValue(12)}px;
  padding: 13px 0px;
  line-height: 25px;
  flex-shrink: 1;
  margin-right: ${wp(8)}px;
`;

const SingleIconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${RFValue(5)}px;
`;

const IconText = styled.Text`
  margin-left: ${RFValue(2)}px;
  color: ${COLORS.gray};
  font-size: ${RFValue(10)}px;
`;

const PicturesWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${RFValue(10)}px;
  justify-content: center;
`;

const Picture = styled.Image`
  width: ${wp(28)}px;
  height: ${wp(28)}px;
  margin-right: ${RFValue(5)}px;
  margin-bottom: ${RFValue(5)}px;
  border-radius: ${RFValue(8)}px;
`;

const SetBtnsWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: ${wp(100)}px;
  border-color: ${COLORS.white};
  border-bottom-color: ${COLORS.lightgray01};
  border-width: 1px;
  padding-bottom: ${hp(2)}px;
`;

const BtnTxt = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(10)}px;
  font-weight: bold;
`;

const LikeBtn = styled.TouchableOpacity`
  background-color: ${COLORS.subMiddleblue};
  width: auto;
  padding: ${RFValue(6)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.subLightblue};
  border-width: 2px;
`;

const BookmarkBtn = styled.TouchableOpacity`
  background-color: ${COLORS.subLightblue};
  width: auto;
  padding: ${RFValue(6)}px;
  border-radius: ${RFValue(10)}px;
  margin-left: ${wp(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.subMiddleblue};
  border-width: 2px;
`;

const BanModal = styled.View`
  margin-left: ${wp(5)}px;
  margin-right: ${wp(5)}px;
  height: 180px;
  margin-top: ${hp(75)}px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
`;

const Box1 = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  align-items: center;
  height: ${hp(6)}px;
  justify-content: center;
  margin-bottom: 1px;
`;

const Box2 = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  align-items: center;
  height: ${hp(6)}px;
  justify-content: center;
  margin-bottom: 2px;
`;

const Box3 = styled.TouchableOpacity`
  background-color: ${COLORS.subBrown};
  border-radius: 10px;
  align-items: center;
  height: ${hp(7)}px;
  justify-content: center;
`;

const BoxLabel = styled.Text`
  font-size: ${RFValue(18)}px;
`;

export default MainPostitem;
