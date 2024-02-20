import LessonCalendar from '@components/lesson/lessonCalendarItem/LessonCalendar';
import LessonScheduleItem from '@components/lesson/lessonCalendarItem/LessonScheduleItem';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAllLessonInfo } from 'api/lesson';
import format from 'pretty-format';

function LessonScheduleScreen(props) {
  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    navigation.navigate('lessonMainScreen');
  };

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [feedbackDates, setFeedbackDates] = useState([]);

  // 년 월별 레슨 정보
  const [lessonDatas, setLessonData] = useState(null);

  useEffect(() => {
    getAllLessonInfo(year, month)
      .then((res) => {
        console.log('년.월별 레슨 정보', format(res.data));
        setLessonData(res.data);
        console.log('lesson데이터', lessonDatas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [year, month]);

  useEffect(() => {
    // Extract feedback dates from lessonDatas and setFeedbackDates
    const extractedDates = lessonDatas?.data?.map((lessonData) => lessonData.feedbackTime.substring(8, 10));
    setFeedbackDates(extractedDates);
  }, [lessonDatas]);

  return (
    <Container>
      <Header>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
        <HeaderText>레슨 내역</HeaderText>
      </Header>
      <Calendear>
        <LessonCalendar setYear={setYear} setMonth={setMonth} feedbackDates={feedbackDates} />
      </Calendear>
      <LessonList>
        {lessonDatas && lessonDatas.data && lessonDatas.data.length >= 1 ? (
          <ScheduleListScrollView>
            {lessonDatas.data.map((lessonData) => (
              <LessonScheduleItem key={lessonData.id} lessonData={lessonData} />
            ))}
          </ScheduleListScrollView>
        ) : (
          <NoLesson>레슨 내역이 없어요.🥲</NoLesson>
        )}
      </LessonList>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  margin-top: ${hp(8)}px;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
`;

const Calendear = styled.View`
  margin-top: ${hp(1)}px;
`;

const LessonList = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoLesson = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  text-align: center;
`;

const ScheduleListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default LessonScheduleScreen;
