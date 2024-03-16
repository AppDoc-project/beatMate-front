import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllComments } from 'api/commity';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { styled } from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import CommentListItem from './CommentListItem';
import { RFValue } from 'react-native-responsive-fontsize';

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
};

function CommentList({ postId }) {
  //특정 게시물 댓글 API
  const [CommentData, setCommentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getAllComments(postId)
        .then((res) => {
          console.log('모든 댓글들', format(res.data));
          setCommentData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('모든 댓글들 가져오기 실패', error);
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
      <Comment>댓글</Comment>
      <MyPostingListScrollView>
        {CommentData &&
          CommentData.data.map((comment) => (
            <CommentListItem
              key={comment.id}
              comment={comment}
              CommentData={CommentData}
              setCommentData={setCommentData}
            />
          ))}
      </MyPostingListScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Comment = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  text-align: left;
  margin-left: ${wp(5)}px;
  margin-bottom: ${hp(2)}px;
  margin-top: ${hp(2)}px;
`;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default CommentList;
