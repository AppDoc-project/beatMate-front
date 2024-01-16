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

function WriteNewPostScreen() {
  const [title, setTitle] = useState(''); //제목
  const [content, setContent] = useState(''); //본문
  const [communityId, setCommunityId] = useState(''); //communityId
  const [addresses, setAddresses] = useState([]); //사진들

  const onChangeTitle = (text) => setTitle((prev) => ({ ...prev, name: text }));
  const onChangeContent = (text) => setContent((prev) => ({ ...prev, name: text }));

  const onPressRegisterBtn = () => {};

  return (
    <Container>
      <KeyboardAwareScrollView>
        <SelectCategory setCommunityId={setCommunityId} />
        <Component>
          <Input
            value={title}
            onChangeText={onChangeTitle}
            placeholder="제목 (최대 20자까지 가능합니다)"
            placeholderTextColor="lightgray"
          />
        </Component>
        <Component>
          <Input
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

const Input = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(90.4)}px;
  height: ${hp(5)}px;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default WriteNewPostScreen;
