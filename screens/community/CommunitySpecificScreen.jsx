import { WriteBtn } from '@assets/Icons/Buttons';
import CommunityPostingItem from '@components/community/mainPage/CommunityPostingItem';
import SelectCategory from '@components/community/mainPage/SelectCategory';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getFirstPost, getNextPost, getFirstSearchPost, getNextSearchPost } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function CommunitySpecificScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { communityId, name } = route.params;

  const [newCommunityId, setCommunityId] = useState(communityId);
  const [communityName, setCommunityName] = useState(name);
  const [searchType, setSearchType] = useState('');

  const [typeModal, setTypeModal] = useState(false); // 검색 조건 모달 띄우기

  const [searchKeyword, setSearchKeyword] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);

  const onPressPreviousBtn = () => {
    setCommunityId('');
    setCommunityName('');
    setSearchType('');
    navigation.goBack();
  };

  const onPressSearchBtn = () => {
    setPage(0);
    fetchData(false, 0);
    console.log(searchType);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(false, 0);
      return () => {};
    }, [newCommunityId]),
  );

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
        response = searchKeyword
          ? await getNextSearchPost(newCommunityId, 10, searchKeyword, searchType, posts[posts.length - 1]?.id)
          : await getNextPost(posts[posts.length - 1]?.id, newCommunityId, 10);
        console.log('첫번째요소', format(response.data));
      } else {
        response = searchKeyword
          ? await getFirstSearchPost(newCommunityId, 10, searchKeyword, searchType)
          : await getFirstPost(10, newCommunityId);

        console.log('두번째요소', format(response.data));
      }

      const newPosts = response.data.data;

      if (scroll) {
        setPosts((prevPosts) => (newPosts.length > 0 ? [...prevPosts, ...newPosts] : prevPosts));
        setPage(pageNumber + 1);
      } else {
        setPosts(newPosts);
        setPage(1);
      }

      setHasMoreData(newPosts.length > 0);
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
        <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => onPressPreviousBtn()} />
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
        <TouchableOpacity onPress={onPressSearchBtn}>
          <SearchIcon name="search1" size={30} color={COLORS.lightgray} />
        </TouchableOpacity>
      </SearchBox>

      <TypeChooseWrapper onPress={() => setTypeModal(true)}>
        <TypeWrapper>
          <TypeTxt>
            {searchType === 'CONTENT' ? '내용' : searchType === 'TITLE' ? '제목' : '검색 조건 설정하기'}
          </TypeTxt>
          <AntDesign name={'caretdown'} size={RFValue(12)} color={COLORS.black} />
        </TypeWrapper>
      </TypeChooseWrapper>

      <Modal animationType="none" transparent={true} visible={typeModal}>
        <BanModal>
          <Box1
            onPress={() => {
              setSearchType('TITLE');
              setTypeModal(false);
            }}
          >
            <BoxLabel color={COLORS.black}>제목</BoxLabel>
          </Box1>
          <Box2
            onPress={() => {
              setSearchType('CONTENT');
              setTypeModal(false);
            }}
          >
            <BoxLabel color={COLORS.black}>내용</BoxLabel>
          </Box2>
          <Box3
            onPress={() => {
              setSearchType('');
              setTypeModal(false);
            }}
          >
            <BoxLabel color={COLORS.black}>취소</BoxLabel>
          </Box3>
        </BanModal>
      </Modal>

      <PostWrapper>
        <FlatList
          data={posts}
          renderItem={({ item }) => <CommunityPostingItem post={item} />}
          onEndReached={onEndReached}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.1}
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
  width: ${wp(90)}px;
`;

const Input = styled.TextInput`
  background-color: transparent;
  flex: 1;
  height: ${hp(5)}px;
  border-radius: 10px;
  border-color: ${COLORS.lightgray01};
  border-width: 1px;
  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const SearchIcon = styled(AntDesign)`
  position: absolute;
  right: ${wp(4)}px;
  bottom: ${hp(-1.5)}px;
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

const TypeChooseWrapper = styled.TouchableOpacity`
  width: ${wp(100)}px;
  align-items: center;
  top: ${hp(12)}px;
`;

const TypeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-color: ${COLORS.black};
  border-width: 1px;
  padding: ${RFValue(5)}px;
  position: absolute;
  right: 0;
  margin-right: ${wp(5)}px;
`;

const TypeTxt = styled.Text`
  margin-right: ${wp(2)}px;
  font-size: ${RFValue(11)}px;
  font-weight: bold;
`;

const BanModal = styled.View`
  margin-left: ${wp(5)}px;
  margin-right: ${wp(5)}px;
  height: 180px;
  margin-top: ${hp(75)}px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
`;

const Box1 = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  align-items: center;
  height: ${hp(6)}px;
  justify-content: center;
  margin-bottom: 1px;
`;

const Box2 = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  align-items: center;
  height: ${hp(6)}px;
  justify-content: center;
  margin-bottom: 2px;
`;

const Box3 = styled.TouchableOpacity`
  background-color: ${COLORS.subBrown};
  border-radius: 10px;
  align-items: center;
  height: ${hp(7)}px;
  justify-content: center;
`;

const BoxLabel = styled.Text`
  font-size: ${RFValue(18)}px;
`;

export default CommunitySpecificScreen;
