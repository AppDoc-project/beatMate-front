// ... (other imports)
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

import RenderCalendarDate from './RenderCalendarDate';

LessonCalendar.propTypes = {
  setYear: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  setSearchDate: PropTypes.func.isRequired,
  feedbackDates: PropTypes.array,
};

function LessonCalendar({ setYear, setMonth, setSearchDate, feedbackDates }) {
  const [thisCalendar, setThisCalendar] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());

  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const calendarData = RenderCalendarDate({ thisYear, thisMonth });
    setThisCalendar(calendarData);

    // setYear와 setMonth를 사용해서 년도와 월을 설정
    setYear(thisYear);
    setMonth(thisMonth + 1);
  }, [date, thisMonth, thisYear]);

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const goToday = () => {
    setDate(new Date());
  };

  const isToday = (year, month, day) => {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
  };

  const selectDate = (year, month, day) => {
    const newDate = new Date(year, month, day);
    setSelectedDate((prevSelectedDate) =>
      prevSelectedDate && prevSelectedDate.getTime() === newDate.getTime() ? null : newDate,
    );
  };

  useEffect(() => {
    const dateObject = new Date(selectedDate);

    const formattedDate = `${dateObject.getFullYear()}:${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, '0')}:${dateObject.getDate().toString().padStart(2, '0')}`;
    setSearchDate(formattedDate);
  }, [selectedDate]);

  return (
    <Container>
      <Calendar>
        <Header>
          <LeftSection>
            <Year>{`${thisYear}년`}</Year>
          </LeftSection>
          <MiddleSection>
            <Btn onPress={prevMonth}>
              <Icon name="keyboard-arrow-left" />
            </Btn>
            <Month>{`${thisMonth + 1}월`}</Month>
            <Btn onPress={nextMonth}>
              <Icon name="keyboard-arrow-right" />
            </Btn>
          </MiddleSection>
          <RightSection>
            <Btn onPress={goToday}>
              <TodayIcon name="today" />
            </Btn>
          </RightSection>
        </Header>
        <Days>
          {daysOfWeek.map((day, index) => (
            <Day key={index}>{day}</Day>
          ))}
        </Days>
        <Dates>
          {thisCalendar &&
            thisCalendar.prev.map((day, i) => (
              <OtherDate key={i} style={{ color: COLORS.lightgray }}>
                {day}
              </OtherDate>
            ))}
          {thisCalendar &&
            thisCalendar.thisDate.map((day, i) => (
              <CurrentDate key={i}>
                <Today
                  isToday={isToday(thisYear, thisMonth, day)}
                  isSelected={selectedDate && selectedDate.getDate() === day}
                  onPress={() => selectDate(thisYear, thisMonth, day)}
                  day={day}
                  feedbackDates={feedbackDates || []} // Ensure feedbackDates is an array
                >
                  <DateText isSelected={selectedDate && selectedDate.getDate() === day}>{day}</DateText>
                </Today>
              </CurrentDate>
            ))}
          {thisCalendar &&
            thisCalendar.next.map((day, i) => (
              <OtherDate key={i} style={{ color: COLORS.lightgray }}>
                {day}
              </OtherDate>
            ))}
        </Dates>
      </Calendar>
    </Container>
  );
}

const Container = styled.View``;

const Calendar = styled.View`
  border-width: 1px;
  border-color: rgba(217, 217, 217, 0);
  border-radius: ${RFValue(5)}px;
  background-color: rgba(217, 217, 217, 0.3);
  margin: ${RFValue(5)}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(10)}px;
`;

const LeftSection = styled.View`
  width: ${100 / 3}%;
`;

const Year = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  margin: 0 ${RFValue(10)}px;
`;

const MiddleSection = styled.View`
  flex-direction: row;
  width: ${100 / 3}%;
  justify-content: center;
`;

const Month = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
  margin: 0 ${RFValue(10)}px;
`;

const Btn = styled.TouchableOpacity``;

const Icon = styled(MaterialIcons)`
  font-size: ${RFValue(20)}px;
`;

const RightSection = styled.View`
  width: ${100 / 3}%;
  align-items: flex-end;
`;

const TodayIcon = styled(MaterialIcons)`
  font-size: ${RFValue(18)}px;
  margin: 0 ${RFValue(8)}px;
`;

const Days = styled.View`
  flex-direction: row;
  margin-top: ${RFValue(10)}px;
`;

const Day = styled.Text`
  width: ${100 / 7}%;

  font-size: ${RFValue(14)}px;
  font-weight: 600;
  text-align: center;
`;

const Dates = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${RFValue(5)}px;
`;

const OtherDate = styled.Text`
  width: ${100 / 7}%;
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  text-align: center;
  margin: ${RFValue(15)}px 0;
`;

const CurrentDate = styled.View`
  width: ${100 / 7}%;
  margin: ${RFValue(15)}px 0;
  align-items: center;
`;

const Today = styled.TouchableOpacity`
  width: ${RFValue(22)}px;
  height: ${RFValue(22)}px;
  border-radius: 50%;
  border-width: ${(props) => (props.isToday ? '2px' : '0')};
  border-color: ${(props) => (props.isToday ? COLORS.main : 'transparent')};
  background-color: ${(props) =>
    props.isSelected || (props.feedbackDates && props.feedbackDates.includes(String(props.day).padStart(2, '0')))
      ? COLORS.subLightblue
      : 'transparent'};

  justify-content: center;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.isSelected ? COLORS.white : COLORS.black)};
`;

export default LessonCalendar;
