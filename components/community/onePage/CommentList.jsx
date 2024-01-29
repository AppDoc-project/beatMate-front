import { useFocusEffect } from '@react-navigation/native';
import { getAllComments } from 'api/commity';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
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

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getAllComments(postId)
        .then((res) => {
          console.log('모든 댓글들', format(res.data));
          setCommentData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
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
