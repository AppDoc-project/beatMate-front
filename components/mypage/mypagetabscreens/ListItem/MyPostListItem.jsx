import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

MyPostListItem.propTypes = {
  myPostData: PropTypes.shape({
    communityName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    threadCount: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

function MyPostListItem({ myPostData }) {
  const navigation = useNavigation();

  console.log(format(myPostData));

  const postId = myPostData.id;
  const communityName = myPostData.communityName;

  //게시글 상세 페이지로 이동해야함.
  const onPressPostingItem = () => {
    navigation.navigate('communityOnePostScreen', { postId, communityName });
  };

  const formattedDate = myPostData && myPostData.createdAt.substring(0, 10).replace(/:/g, '.');

  return (
    <Mypost onPress={onPressPostingItem}>
      <Category>{myPostData.communityName}</Category>
      <Title>{myPostData.title}</Title>
      <Content>{myPostData.text}</Content>
      <Postinfo>
        <Date>{formattedDate}</Date>
        <Commentbox>
          <Commenticon name={'comment'} size={RFValue(10)} color={'lightgray'} />
          {myPostData.threadCount}
        </Commentbox>
        <Likebox>
          <Likeicon name={'heart'} size={RFValue(11)} color={'lightgray'} />
          {myPostData.likeCount}
        </Likebox>
      </Postinfo>
    </Mypost>
  );
}

const Mypost = styled.TouchableOpacity`
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

export default MyPostListItem;
