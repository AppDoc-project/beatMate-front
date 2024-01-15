import EnterIcon from '@assets/chat/EnterIcon';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

MessageInput.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

/**
 * 메세지 입력 및 전송
 */
function MessageInput({ onFocus, onBlur }) {
  return (
    <Form>
      <Input placeholder={'메세지 보내기'} onFocus={onFocus} onBlur={onBlur} />
      <EnterButton />
    </Form>
  );
}

const Form = styled.View`
  min-height: 10%;
  padding: ${RFValue(4)}px;
  margin-top: auto;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  width: ${wp(80)}px;

  padding: ${RFValue(12)}px;
  background-color: ${COLORS.gray02};
  border-radius: ${RFValue(18)}px;
  margin-right: ${wp(1)}px;
`;

const EnterButton = styled(EnterIcon)``;

export default MessageInput;
