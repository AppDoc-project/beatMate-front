import SelectCategory from '@components/community/newPost/SelectCategory';
import { COLORS } from 'colors';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styled } from 'styled-components/native';

function WriteNewPostScreen() {
  return (
    <Container>
      <KeyboardAwareScrollView>
        <SelectCategory />

      </KeyboardAwareScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

export default WriteNewPostScreen;
