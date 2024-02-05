import LessonCalendar from '@components/lesson/lessonCalendarItem/LessonCalendar';
import LessonScheduleItem from '@components/lesson/lessonCalendarItem/LessonScheduleItem';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React from 'react';
import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function LessonScheduleScreen(props) {
  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    navigation.navigate('lessonMainScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Header>
          <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
          <HeaderText>레슨 내역</HeaderText>
        </Header>
        <Calendear>
          <LessonCalendar />
        </Calendear>
        <ScrollView>
          <LessonList>
            {/* <NoLesson>레슨 내역이 없어요.🥲</NoLesson> */}
            <LessonScheduleItem />
          </LessonList>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
`;

const Calendear = styled.View`
  margin: ${RFValue(10)}px 0;
`;

const LessonList = styled.View`
  margin: ${RFValue(5)}px 0;
`;

const NoLesson = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  text-align: center;
`;

export default LessonScheduleScreen;
