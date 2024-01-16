import { RegisterBtn } from '@assets/Icons/Buttons';
import SelectCategory from '@components/community/newPost/SelectCategory';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function WriteNewPostScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState(''); //제목
  const [content, setContent] = useState(''); //본문
  const [communityId, setCommunityId] = useState(''); //communityId
  const [addresses, setAddresses] = useState([]); //사진들

  const onChangeTitle = (text) => setTitle((prev) => ({ ...prev, name: text }));
  const onChangeContent = (text) => setContent((prev) => ({ ...prev, name: text }));

  const onPressRegisterBtn = () => {};

  const onPressPreviousBtn = () => {
    setTitle('');
    setContent('');
    setCommunityId('');
    setAddresses([]);
    navigation.goBack();
  };

  return (
    <Container>
      <KeyboardAwareScrollView>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <SelectCategory setCommunityId={setCommunityId} />
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
        <RegisterBtn
          fontColor={title && content && communityId ? 'white' : 'navy'}
          backColor={title && content && communityId ? 'navy' : 'white'}
          width={wp(100)}
          justifyContent="center"
          onPress={onPressRegisterBtn}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Component = styled.View`
  width: ${wp(100)}px;
`;

const TitleInput = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(100)}px;
  height: ${hp(5)}px;
  border-radius: 8px;
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
  height: ${hp(30)}px;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default WriteNewPostScreen;
