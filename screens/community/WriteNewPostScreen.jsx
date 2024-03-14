import { ChangeBtn, RegisterBtn } from '@assets/Icons/Buttons';
import SelectCategory from '@components/community/newPost/SelectCategory';
import UploadImages from '@components/community/newPost/UploadImages';
import { useNavigation } from '@react-navigation/native';
import { modifyPost, postNewPost } from 'api/commity';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

WriteNewPostScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      postInfo: PropTypes.object,
    }),
  }).isRequired,
};

function WriteNewPostScreen({ route }) {
  const { postInfo } = route.params || {};

  const navigation = useNavigation();

  console.log(postInfo);

  const [title, setTitle] = useState(postInfo ? postInfo.title : ''); //제목
  const [content, setContent] = useState(postInfo ? postInfo.text : ''); //본문
  const [communityId, setCommunityId] = useState(0); //communityId
  const [addresses, setAddresses] = useState(postInfo ? postInfo.pictures : []); //사진들

  const onChangeTitle = (text) => setTitle(text);
  const onChangeContent = (text) => setContent(text);
  const [isPhotoValid, setPhotoValid] = useState(false);

  const onPressAlertBtn = () => {
    if (!title) {
      Alert.alert('알림', '제목을 작성해주세요.');
    } else if (!content) {
      Alert.alert('알림', '내용을 입력해주세요.');
    } else if (!communityId) {
      Alert.alert('알림', '카테고리를 설정해주세요.');
    } else if (!isPhotoValid) {
      Alert.alert('알림', '사진 업로드 하기를 눌러주세요.');
    }
  };

  const onPressRegisterBtn = () => {
    console.log(title);

    const data = {
      title: title,
      text: content,
      communityId: communityId,
      addresses: addresses,
    };

    console.log(data);

    postNewPost(data)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        navigation.goBack();
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('새글쓰기 실패', error);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  // 게시글 수정하기
  const onPressModifyBtn = () => {
    console.log(title);

    const data = {
      title: title,
      text: content,
      postId: postInfo.id,
      addresses: addresses,
    };

    console.log(data);

    modifyPost(data)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        navigation.goBack();
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('글수정하기 실패', error);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  const onPressPreviousBtn = () => {
    setTitle('');
    setContent('');
    setCommunityId('');
    setAddresses([]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
        <Header>
          <MainTxt>게시글 작성하기</MainTxt>
        </Header>
        <CategoryComponent>
          <SelectCategory setCommunityId={setCommunityId} />
        </CategoryComponent>
        <Component>
          <TitleInput
            value={title}
            onChangeText={onChangeTitle}
            placeholder="제목 (최대 20자까지 가능합니다)"
            placeholderTextColor="lightgray"
          />
        </Component>
        <Component>
          <ContentInput
            value={content}
            onChangeText={onChangeContent}
            placeholder="내용을 입력하세요 (최대 3000자까지 가능합니다)"
            placeholderTextColor="lightgray"
          />
        </Component>
        <PictureMainTxt>사진 (선택)</PictureMainTxt>
        <PictureContent>최소 1장 이상, 최대 5장까지 첨부가 가능합니다.</PictureContent>
        <StyledUploadImages
          isPhotoValid={isPhotoValid}
          setPhotoValid={setPhotoValid}
          addresses={addresses}
          setAddresses={setAddresses}
        />
        {postInfo ? (
          <ChangeBtn
            fontColor={title && content && communityId && isPhotoValid ? 'white' : 'navy'}
            backColor={title && content && communityId && isPhotoValid ? 'navy' : 'white'}
            width={wp(100)}
            justifyContent="center"
            onPress={() => {
              onPressAlertBtn();
              if (isPhotoValid && title && content && communityId) {
                onPressModifyBtn();
              }
            }}
          />
        ) : (
          <RegisterBtn
            fontColor={title && content && communityId && isPhotoValid ? 'white' : 'navy'}
            backColor={title && content && communityId && isPhotoValid ? 'navy' : 'white'}
            width={wp(100)}
            justifyContent="center"
            onPress={() => {
              onPressAlertBtn();
              if (isPhotoValid && title && content && communityId && isPhotoValid) {
                onPressRegisterBtn();
              }
            }}
          />
        )}
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const CategoryComponent = styled.View`
  width: ${wp(100)}px;
  align-items: center;
  justify-content: center;
  padding: ${hp(1)}px;
`;

const Component = styled.View`
  width: ${wp(100)}px;
  align-items: center;
  justify-content: center;
`;

const PictureMainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  color: lightgray;
  margin-left: ${wp(3)}px;
  margin-bottom: ${hp(1)}px;
`;

const PictureContent = styled.Text`
  font-size: ${RFValue(12)}px;
  color: lightgray;
  margin-left: ${wp(3)}px;
  margin-bottom: ${hp(1)}px;
`;

const Header = styled.View`
  justify-content: center;
  align-items: center;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  padding-bottom: ${RFValue(10)}px;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const TitleInput = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(100)}px;
  height: auto;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const ContentInput = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(100)}px;
  height: ${hp(20)}px;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
  margin-bottom: ${hp(5)}px;
`;

const StyledUploadImages = styled(UploadImages)`
  margin-top: ${hp(20)}px;
`;

export default WriteNewPostScreen;
