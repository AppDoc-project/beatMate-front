// eslint-disable-next-line react/prop-types
function RenderCalendarDate({ thisYear, thisMonth }) {
  const prevLast = new Date(thisYear, thisMonth, 0); //지난 달의 마지막 date
  const thisLast = new Date(thisYear, thisMonth + 1, 0); //이번 달의 마지막 date

  const prevLastDate = prevLast.getDate(); //지난 달의 마지막 date
  const prevLastDay = prevLast.getDay(); //지난 달의 마지막 day

  const thisLastDate = thisLast.getDate(); //이번 달 마지막 date
  const thisLastDay = thisLast.getDay(); //이번 달 마지막 day

  const prevDates = [];
  const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
  const nextDates = [];

  if (prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      prevDates.unshift(prevLastDate - i);
    }
  }
  //지난 달 날짜들 생성

  for (let i = 1; i < 7 - thisLastDay; i++) {
    nextDates.push(i);
  }
  //다음 달 날짜들 생성

  return { prev: prevDates, thisDate: thisDates, next: nextDates };
}

export default RenderCalendarDate;
