import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

CommunityPostingItem.propTypes = {
  post: PropTypes.shape({
    bookmarkCount: PropTypes.number, //북마크
    communityId: PropTypes.string,
    communityName: PropTypes.string,
    createdAt: PropTypes.string, //작성일
    id: PropTypes.string, //게시글 아이디
    isTutor: PropTypes.bool,
    likeCount: PropTypes.number, //좋아요 수
    mediaCount: PropTypes.number, //사진 수
    nickName: PropTypes.string, //닉네임
    profile: PropTypes.string, //프로필 (null일때는 기본 이미지)
    text: PropTypes.string, //내용
    threadCount: PropTypes.number, //댓글 수
    title: PropTypes.string, //제목
    userId: PropTypes.string, //작성자 아이디
    view: PropTypes.number,
  }).isRequired,
};

function CommunityPostingItem({ post }) {
  return (
    <Container>
      <SubContainer>
        <Info>
          <Profile source={post.profile ? { uri: post.profile } : require('@assets/chat/nullProfile.jpg')} />
          <Wrapper>
            <Name numberOfLines={1}>{post.nickName}</Name>
          </Wrapper>
          <SubWrapper>
            <Date>{post.createdAt}</Date>
          </SubWrapper>
        </Info>
        <Content>{post.text}</Content>
      </SubContainer>
    </Container>
  );
}

const SubContainer = styled.View``;

const Container = styled.View`
  padding-left: ${wp(6)}px;
  padding-right: ${wp(6)}px;
  padding-top: ${hp(2)}px;
  border-bottom-color: ${COLORS.gray01};
  border-bottom-width: 1px;
`;

const Info = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const Profile = styled.Image`
  height: 55px;
  width: 55px;
`;

const Wrapper = styled.View`
  margin-left: ${wp(1)}px;
  width: ${wp(50)}px;
  height: 100%;
`;

const SubWrapper = styled.View`
  height: 100%;
  width: ${wp(20)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
  width: ${wp(20)}px;
  margin-bottom: ${hp(0.5)}px;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  text-align: right;
`;

const Content = styled.Text`
  font-size: ${RFValue(13)}px;
  padding: 13px 0px;
  line-height: 25px;
`;

export default CommunityPostingItem;
