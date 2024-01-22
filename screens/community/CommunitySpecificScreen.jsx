import { WriteBtn } from '@assets/Icons/Buttons';
import CommunityPostingItem from '@components/community/mainPage/CommunityPostingItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirstPost, getNextPost } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import SelectCategory from '@components/community/mainPage/SelectCategory';

function CommunitySpecificScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { communityId, name } = route.params;

  const [newCommunityId, setCommunityId] = useState(communityId);
  const [communityName, setCommunityName] = useState(name);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(false, 1);
    return () => {};
  }, [newCommunityId]);

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
        response = await getNextPost(posts[posts.length - 1]?.id, newCommunityId, 10);
        console.log('첫번째요소', format(response.data));
      } else {
        response = await getFirstPost(10, newCommunityId);
        console.log('두번째요소', format(response.data));
      }

      const newPosts = response.data.data;

      if (newPosts.length === 0) {
        setHasMoreData(false);
      } else {
        setPosts((prevPosts) => (scroll ? [...prevPosts, ...newPosts] : newPosts));
        setPage(pageNumber + 1);
      }

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
    if (!isLoading && hasMoreData) {
      fetchData(true, page);
    }
  };

  if (isLoading && !posts.length) {
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
      <Top>
        <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => navigation.goBack()} />
        <MainTxt>커뮤니티</MainTxt>
      </Top>
      <SecondRow>
        <SelectCategory setCommunityId={setCommunityId} communityName={communityName} />
      </SecondRow>
      <SearchBox>
        <Input
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          placeholder="검색어를 입력해주세요"
          placeholderTextColor="lightgray"
        />
        <SearchIcon name="search1" size={30} color={COLORS.lightgray} />
      </SearchBox>

      <PostWrapper>
        <FlatList
          data={posts}
          renderItem={({ item }) => <CommunityPostingItem post={item} />}
          onEndReached={onEndReached}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
        />
      </PostWrapper>

      <Btn onPress={() => navigation.navigate('writeNewPostScreen')}>
        <WriteBtn />
      </Btn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  align-items: center;
`;

const Top = styled.View`
  top: ${hp(5)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  flex: 1;
`;

const SecondRow = styled.View`
  width: ${wp(100)}px;
  align-items: center;
  justify-content: center;
  padding: ${hp(1)}px;
  top: ${hp(5)}px;
`;

const SearchBox = styled.View`
  top: ${hp(10)}px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const Input = styled.TextInput`
  background-color: transparent;
  width: ${wp(90)}px;
  height: ${hp(5)}px;
  border-radius: 10px;
  border-color: lightgray;
  border-width: 1px;
  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const SearchIcon = styled(AntDesign)`
  position: absolute;
  right: 20px;
`;

const PostWrapper = styled.View`
  height: ${hp(62)}px;
  top: ${hp(18)}px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default CommunitySpecificScreen;
