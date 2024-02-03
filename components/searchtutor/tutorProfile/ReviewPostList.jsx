import ReviewPostItem from '@components/searchtutor/tutorProfile/ReviewPostItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatailTutorInfo, postPickTutor } from 'api/tutorpage';
import { COLORS } from 'colors';
import { TutorFindCategory } from 'context/TutorFindCategoryContext';
import format from 'pretty-format';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, Text, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { getFirstTutorReview, getNextTutorReview } from 'api/tutorpage';

ReviewPostList.propTypes = {
  tutorId: PropTypes.number.isRequired,
};

function ReviewPostList({ tutorId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);

  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = async (scroll, pageNumber) => {
    try {
      if (isFetchingMore) {
        return;
      }

      setIsFetchingMore(true);
      setIsLoading(true);

      let response;

      if (scroll) {
        response = await getNextTutorReview(tutorId, 10, reviews[reviews.length - 1]?.reviewId);
        console.log('다음번째요소', format(response.data));
      } else {
        response = await getFirstTutorReview(tutorId, 10);

        console.log('첫번째요소', format(response.data));
      }

      const newReviews = response.data.data;

      if (scroll) {
        setReviews((prevPosts) => (newReviews.length > 0 ? [...prevPosts, ...newReviews] : prevPosts));
        setPage(pageNumber + 1);
      } else {
        setReviews(newReviews);
        setPage(1);
      }

      setHasMoreData(newReviews.length > 0);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
      setIsError(true);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const onEndReached = () => {
    if (!isLoading && hasMoreData && !isFetchingMore) {
      fetchData(true, page);
    }
  };

  useEffect(() => {
    fetchData(false, 0);
  }, [tutorId]);

  if (isLoading && !reviews.length) {
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
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewPostItem post={item} />}
        onEndReached={onEndReached}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
      />
    </Container>
  );
}

const Container = styled.View``;

export default ReviewPostList;
