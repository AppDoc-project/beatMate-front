import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

MyPostListItem.propTypes = {
  myPosting: PropTypes.object.isRequired,
};

function MyPostListItem({ myPosting }) {
  const navigation = useNavigation();

  //게시글 상세 페이지로 이동해야함.
  const onPressPostingItem = () => {
    navigation.navigate('');
  };

  return (
    <Mypost onPress={onPressPostingItem}>
      <Category>{myPosting.communityName}</Category>
      <Title>{myPosting.title}</Title>
      <Content>{myPosting.text}</Content>
      <Postinfo>
        <Date>{myPosting.createdAt}</Date>
        <Commentbox>
          <Commenticon name={'comment'} size={RFValue(10)} color={'lightgray'} />
          {myPosting.threadCount}
        </Commentbox>
        <Bookmarkbox>
          <Bookmarkicon name={'heart'} size={RFValue(11)} color={'lightgray'} />
          {myPosting.bookmarkCount}
        </Bookmarkbox>
      </Postinfo>
    </Mypost>
  );
}

const Mypost = styled.TouchableOpacity`
  height: 125px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
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

const Bookmarkbox = styled.Text`
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

const Bookmarkicon = styled(MaterialCommunityIcons)`
  position: absolute;
  left: 180px;
  top: 120px;
`;

export default MyPostListItem;
