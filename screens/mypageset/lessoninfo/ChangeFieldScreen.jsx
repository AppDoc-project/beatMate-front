import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function ChangeFieldScreen(props) {
  return (
    <Container>
      <FirstSection>
        <Txt>변경된 음악 분야를 선택해주세요.</Txt>
        <SubTxt1>(중복 가능)</SubTxt1>
      </FirstSection>
      <FieldSection1>
        <FieldBtn>
          <FieldTxt>피아노</FieldTxt>
        </FieldBtn>
        <FieldBtn>
          <FieldTxt>기타</FieldTxt>
        </FieldBtn>
        <FieldBtn>
          <FieldTxt>보컬</FieldTxt>
        </FieldBtn>
      </FieldSection1>
      <FieldSection2>
        <FieldBtn>
          <FieldTxt>드럼</FieldTxt>
        </FieldBtn>
        <FieldBtn>
          <FieldTxt>베이스</FieldTxt>
        </FieldBtn>
        <FieldBtn>
          <FieldTxt>음악이론</FieldTxt>
        </FieldBtn>
      </FieldSection2>
      <FieldSection3>
        <FieldBtn>
          <FieldTxt>작곡</FieldTxt>
        </FieldBtn>
        <FieldBtn>
          <FieldTxt>관악기</FieldTxt>
        </FieldBtn>
        <FieldBtn>
          <FieldTxt>건반악기</FieldTxt>
        </FieldBtn>
      </FieldSection3>

      <SecondSection>
        <Text>※ "레슨 이름"을 변경하기 위해서는 증명서를 재제출해야 합니다.</Text>
        <Text>※ 수정이 승인되면 해당 정보가 변경되며 승인되었음을 알리는 알림이 갑니다.</Text>
      </SecondSection>

      <ThirdSection>
        <Txt>강사 자격을 인증할 수 있는 이미지를 첨부해주세요.</Txt>
        <SubTxt2>최소 1장 이상, 최대 5장까지 첨부 가능</SubTxt2>
        <SubTxt2>해당 이미지들로 강사 자격 심사가 진행될 예정입니다.</SubTxt2>
        <ImageSection></ImageSection>
      </ThirdSection>
      <ChangeBtn
      // fontColor={ ? 'white' : COLORS.main}
      // backColor={ ? COLORS.main : 'white'}
      // width={wp(90.4)}
      // marginBottom={hp(6.15)}
      // marginTop={hp(8)}
      // justifyContent="center"
      // onPress={onPressChangeBtn}
      >
        <BtnText>변경하기</BtnText>
      </ChangeBtn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const FirstSection = styled.View`
  position: absolute;
  top: ${hp(13)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;

  flex-direction: row;
`;

const SecondSection = styled.View`
  position: absolute;
  top: ${hp(41)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const ThirdSection = styled.View`
  position: absolute;
  top: ${hp(50)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const FieldSection1 = styled.View`
  position: absolute;
  top: ${hp(17)}px;

  margin-left: ${wp(4.8)}px;

  flex-direction: row;
`;

const FieldSection2 = styled.View`
  position: absolute;
  top: ${hp(23)}px;

  margin-left: ${wp(4.8)}px;

  flex-direction: row;
`;

const FieldSection3 = styled.View`
  position: absolute;
  top: ${hp(29)}px;

  margin-left: ${wp(4.8)}px;

  flex-direction: row;
`;

const ImageSection = styled.View`
  position: absolute;
  top: ${hp(48)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const SubTxt1 = styled.Text`
  font-size: ${RFValue(11.7)}px;
  margin-top: ${hp(0.2)}px;
  margin-left: ${wp(1)}px;
  color: ${COLORS.lightgray};
`;

const SubTxt2 = styled.Text`
  font-size: ${RFValue(11.7)}px;
  margin-top: ${hp(1)}px;
  color: ${COLORS.lightgray};
`;

const Text = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

const FieldBtn = styled.TouchableOpacity`
  width: ${wp(23)}px;
  height: ${hp(5)}px;

  border-radius: 10px;
  border-color: ${({ select }) => (select ? COLORS.main : COLORS.lightgray)};
  border-width: 1.5px;

  margin-right: ${wp(11)}px;
  justify-content: center;
  align-items: center;
`;

const FieldTxt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ select }) => (select ? COLORS.main : COLORS.lightgray)};
`;

const ChangeBtn = styled.TouchableOpacity`
  width: ${wp(90.4)}px;
  height: ${hp(5)}px;
  border: 2px;
  border-radius: ${wp(3)}px;
  border-color: ${COLORS.main};
  border-style: solid;

  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;

  position: absolute;
  bottom: ${hp(3)}px;
`;

const BtnText = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  text-align: center;
`;

export default ChangeFieldScreen;
