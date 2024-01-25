import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
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
  }).isRequired,
};

function MainPostitem({ postInfo }) {
  const formattedDate = postInfo && postInfo.createdAt.substring(0, 10).replace(/:/g, '.');

  return (
    <Container>
      {postInfo && (
        <Info>
          <FirstRow>
            <PostText>
              <FirstWrapper>
                <Title numberOfLines={1}>{postInfo.title}</Title>
                <Date>{formattedDate}</Date>
              </FirstWrapper>
              <Content numberOfLines={1}>{postInfo.text}</Content>
            </PostText>
          </FirstRow>
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
                  <FontAwesome name={'user-circle'} size={RFValue(90)} color={'lightgray'} />
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
                <MaterialCommunityIcons name={'cards-heart'} color={COLORS.lightgray01} size={RFValue(17)} />
                <IconText>{postInfo.likeCount}</IconText>
              </SingleIconWrapper>
              <SingleIconWrapper>
                <MaterialCommunityIcons name={'bookmark'} color={COLORS.lightgray01} size={RFValue(17)} />
                <IconText>{postInfo.bookmarkCount}</IconText>
              </SingleIconWrapper>
            </IconWrapper>
          </Wrapper>
        </Info>
      )}
    </Container>
  );
}

const Container = styled.View`
  background-color: ${COLORS.white};
  padding: ${RFValue(8)}px;
  height: ${hp(50)}px;
  justify-content: space-between;
  flex-direction: column;
`;

const Info = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-left: ${RFValue(30)}px;
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
`;

const FirstWrapper = styled.View`
  flex-direction: row;
  align-items: center;
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
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.gray};
  margin-left: ${RFValue(5)}px;
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

export default MainPostitem;
