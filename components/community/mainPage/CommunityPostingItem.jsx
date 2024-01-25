import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  }).isRequired,
};

function CommunityPostingItem({ post }) {
  const navigation = useNavigation();

  const onPressOnePostScreen = () => {
    navigation.navigate('communityOnePostScreen', { postId: post.id, communityName: post.communityName });
  };

  const formattedDate = post.createdAt.substring(0, 10).replace(/:/g, '.');

  return (
    <Container>
      <SubContainer onPress={onPressOnePostScreen}>
        <Info>
          <FirstRow>
            <PostText>
              <Title numberOfLines={1}>{post.title}</Title>
              <Content numberOfLines={1}>{post.text}</Content>
            </PostText>
            <DateWrapper>
              <Date>{formattedDate}</Date>
            </DateWrapper>
          </FirstRow>
          <Wrapper>
            <UserInfoWrapper>
              <Profile source={post.profile ? { uri: post.profile } : require('@assets/chat/nullProfile.jpg')} />
              <Name numberOfLines={1}>{post.nickName}</Name>
            </UserInfoWrapper>
            <IconWrapper>
              <SingleIconWrapper>
                <MaterialCommunityIcons name={'comment'} color={COLORS.lightgray01} size={RFValue(17)} />
                <IconText>{post.threadCount}</IconText>
              </SingleIconWrapper>
              <SingleIconWrapper>
                <MaterialCommunityIcons name={'cards-heart'} color={COLORS.lightgray01} size={RFValue(17)} />
                <IconText>{post.likeCount}</IconText>
              </SingleIconWrapper>
              <SingleIconWrapper>
                <MaterialCommunityIcons name={'bookmark'} color={COLORS.lightgray01} size={RFValue(17)} />
                <IconText>{post.bookmarkCount}</IconText>
              </SingleIconWrapper>
            </IconWrapper>
          </Wrapper>
        </Info>
      </SubContainer>
    </Container>
  );
}

const Container = styled.View`
  padding-left: ${wp(6)}px;
  padding-right: ${wp(6)}px;
  padding-top: ${hp(2)}px;
  padding-bottom: ${hp(2)}px;
  border-bottom-color: ${COLORS.gray01};
  border-bottom-width: 1px;
  width: 100%;
`;

const SubContainer = styled.TouchableOpacity``;

const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const PostText = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
`;

const Info = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`;

const Profile = styled.Image`
  height: ${RFValue(23)}px;
  width: ${RFValue(23)}px;
  border-radius: 50%;
  margin-right: ${RFValue(5)}px;
`;

const Wrapper = styled.View`
  width: ${wp(100)}px;
  flex-direction: row;
  align-items: center;
`;

const DateWrapper = styled.View``;

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
  margin-left: ${RFValue(115)}px;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  text-align: right;
  color: ${COLORS.gray};
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

export default CommunityPostingItem;
