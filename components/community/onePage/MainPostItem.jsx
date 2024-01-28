import { pressLike, pressBookmark } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, Alert } from 'react-native';
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
        console.log('좋아요 실패', format(error));
        Alert.alert('알림', '좋아요를 이미 눌렀습니다.');
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
        console.log('북마크 실패', format(error));
      });
  };

  return (
    <Container>
      {postInfo && (
        <Info>
          <FirstRow>
            <PostText>
              <FirstWrapper>
                <Title numberOfLines={1}>{postInfo.title}</Title>
                <SecondWrapper>
                  <Date>
                    {formattedDate} | 조회수 {postInfo.view}
                  </Date>
                  <MaterialCommunityIcons name={'dots-vertical'} color={COLORS.lightgray01} size={RFValue(17)} />
                </SecondWrapper>
              </FirstWrapper>
              <Content numberOfLines={1}>{postInfo.text}</Content>
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

export default MainPostitem;
