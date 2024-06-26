import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

MyBookmarkListItem.propTypes = {
  myBookmark: PropTypes.shape({
    communityName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    threadCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

function MyBookmarkListItem({ myBookmark }) {
  const navigation = useNavigation();

  //게시글 상세 페이지로 이동해야함.
  const postId = myBookmark.id;
  const communityName = myBookmark.communityName;

  //게시글 상세 페이지로 이동해야함.
  const onPressPostingItem = () => {
    navigation.navigate('community', {
      screen: 'communityOnePostScreen',
      params: { postId, communityName },
    });
  };

  const formattedDate = myBookmark && myBookmark.createdAt.substring(0, 10).replace(/:/g, '.');

  return (
    <Mybookmark onPress={onPressPostingItem}>
      <Category>{myBookmark.communityName}</Category>
      <Title>{myBookmark.title}</Title>
      <Content>{myBookmark.text}</Content>
      <Postinfo>
        <Date>{formattedDate}</Date>
        <Commentbox>
          <Commenticon name={'comment'} size={RFValue(10)} color={'lightgray'} />
          {myBookmark.threadCount}
        </Commentbox>
        <Likebox>
          <Likeicon name={'heart'} size={RFValue(11)} color={'lightgray'} />
          {myBookmark.likeCount}
        </Likebox>
      </Postinfo>
    </Mybookmark>
  );
}

const Mybookmark = styled.TouchableOpacity`
  height: auto;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
  padding: ${RFValue(8)}px;
`;

const Category = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.main};
  margin: 15px 0px 8px 15px;
`;

const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  color: ${COLORS.black};
  margin: 3px 0px 5px 15px;
`;

const Content = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.black};
  margin: 1px 0px 5px 15px;
`;

const Postinfo = styled.View`
  flex-direction: row;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.gray};
  margin: 0px 10px 5px 15px;
`;

const Commentbox = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.lightgray};
  margin: 0px 3px 5px 15px;
`;

const Likebox = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.lightgray};
  margin: 0px 0px 5px 5px;
`;

const Commenticon = styled(MaterialCommunityIcons)`
  position: absolute;
  left: 130px;
  top: 120px;
`;

const Likeicon = styled(MaterialCommunityIcons)`
  position: absolute;
  left: 180px;
  top: 120px;
`;

export default MyBookmarkListItem;
