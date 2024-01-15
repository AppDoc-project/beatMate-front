import SelectCategory from '@components/community/newPost/SelectCategory';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styled } from 'styled-components/native';

function WriteNewPostScreen() {
  const [title, setTitle] = useState(''); //제목
  const [text, setText] = useState(''); //본문
  const [communityId, setCommunityId] = useState(''); //communityId
  const [addressess, setAddressess] = useState([{},]); //사진들

  return (
    <Container>
      <KeyboardAwareScrollView>
        <SelectCategory setCommunityId={setCommunityId} />
      </KeyboardAwareScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

export default WriteNewPostScreen;
