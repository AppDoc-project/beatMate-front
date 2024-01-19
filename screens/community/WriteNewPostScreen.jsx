import { RegisterBtn } from '@assets/Icons/Buttons';
import SelectCategory from '@components/community/newPost/SelectCategory';
import UploadImages from '@components/community/newPost/UploadImages';
import { useNavigation } from '@react-navigation/native';
import { postNewPost } from 'api/commity';
import format from 'pretty-format';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function WriteNewPostScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState(''); //제목
  const [content, setContent] = useState(''); //본문
  const [communityId, setCommunityId] = useState(0); //communityId
  const [addresses, setAddresses] = useState([]); //사진들

  const onChangeTitle = (text) => setTitle(text);
  const onChangeContent = (text) => setContent(text);

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
      })
      .catch((error) => console.log(format(error)));
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
        <StyledUploadImages addresses={addresses} setAddresses={setAddresses} />
        <RegisterBtn
          fontColor={title && content && communityId ? 'white' : 'navy'}
          backColor={title && content && communityId ? 'navy' : 'white'}
          width={wp(100)}
          justifyContent="center"
          onPress={onPressRegisterBtn}
        />
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
  height: ${hp(5)}px;
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
  height: ${hp(25)}px;
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
