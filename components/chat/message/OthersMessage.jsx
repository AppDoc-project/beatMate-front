import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground } from 'react-native'; // Import ImageBackground
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styled } from 'styled-components/native';

OthersMessage.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    sender: PropTypes.shape({
      name: PropTypes.string,
      profile: PropTypes.any,
      userId: PropTypes.number,
    }),
  }),
};

function OthersMessage({ item }) {
  const hour = parseInt(item.createdAt.substring(11, 13), 10);
  const minute = item.createdAt.substring(14, 16);
  const period = hour < 12 ? '오전' : '오후';

  const formattedHour = hour % 12 || 12;
  const hourMinute = `${period} ${formattedHour}:${minute}`;

  return (
    <Container>
      <ProfileContainer>
        {item && item.sender.profile ? (
          <ImageBackground
            source={{
              uri: item.sender.profile,
            }}
            style={{ width: wp(12), height: wp(12), borderRadius: 50, overflow: 'hidden' }}
          >
            {/* You can add any additional content or styling here */}
          </ImageBackground>
        ) : (
          <FontAwesome name={'user-circle'} size={RFValue(35)} color={'lightgray'} />
        )}
      </ProfileContainer>
      <ContentContainer>
        <TextContainer>
          <Content>{item.content}</Content>
        </TextContainer>
        <Time>{hourMinute}</Time>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${hp(2)}px;
  padding-horizontal: ${RFValue(12)}px;
`;

const ProfileContainer = styled.View`
  width: ${wp(12)}px;
  height: ${wp(12)}px;
  margin-right: ${RFValue(2)}px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  max-width: ${wp(65)}px;
  min-width: ${hp(2)}px;
  justify-content: center;
  background-color: ${COLORS.lightgray01};
  border-radius: ${RFValue(8)}px;
  padding-vertical: ${RFValue(4)}px;
  padding-horizontal: ${RFValue(12)}px;
`;

const Content = styled.Text`
  font-weight: 500;
  font-size: ${RFValue(12)}px;
  color: ${COLORS.black};
  flex-grow: 1;
`;

const Time = styled.Text`
  align-self: flex-end;
  color: ${COLORS.gray};
  font-weight: 600;
  margin-left: ${RFValue(4)}px;
`;

export default OthersMessage;
