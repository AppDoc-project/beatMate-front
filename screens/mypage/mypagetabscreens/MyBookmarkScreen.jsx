import { COLORS } from 'colors';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

function MyBookmarkScreen(props) {
  return (
    <Mybookmark>
      <Category>자유게시판</Category>
      <Title>북마크 화면</Title>
      <Content>나는 내용이다아아아아아</Content>
      <Postinfo>
        <Date>2023.12.26</Date>
        <Commentbox>
          <Commenticon name={'comment'} size={RFValue(10)} color={'lightgray'} />
          21
        </Commentbox>
        <Bookmarkbox>
          <Bookmarkicon name={'heart'} size={RFValue(11)} color={'#BB271A'} />
          12
        </Bookmarkbox>
      </Postinfo>
    </Mybookmark>
  );
}

const Mybookmark = styled.View`
  height: 125px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
`;

const Category = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.main};
  margin: 15px 0px 8px 15px;
`;

const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  color: ${COLORS.black};
  margin: 3px 0px 5px 15px;
`;

const Content = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.black};
  margin: 1px 0px 5px 15px;
`;

const Postinfo = styled.View`
  flex-direction: row;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.gray};
  margin: 0px 10px 5px 15px;
`;

const Commentbox = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.lightgray};
  margin: 0px 3px 5px 15px;
`;

const Bookmarkbox = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.lightgray};
  margin: 0px 0px 5px 5px;
`;

const Commenticon = styled(MaterialCommunityIcons)`
  position: absolute;
  left: 130px;
  top: 120px;
`;

const Bookmarkicon = styled(MaterialCommunityIcons)`
  position: absolute;
  left: 180px;
  top: 120px;
`;

export default MyBookmarkScreen;
