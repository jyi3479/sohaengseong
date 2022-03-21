import * as React from 'react';
// MUI datepicker -----------------------------------
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import PickersDay from '@mui/lab/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
//-----------------------------------------------------
import { useDispatch } from 'react-redux';
import { actionCreators as memberAction } from "../../redux/modules/member";
import { useParams } from 'react-router-dom';
import "../../styles/css/Date.css"

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

const CustomDay = (props) => {
    const dispatch = useDispatch()
    const challengeId = useParams().challengeId
    // 
    const [value, setValue] = React.useState(new Date());
    const [startDate, setStartDate] = React.useState(dateFormat(startOfWeek(value))); // 오늘 날짜가 포함된 일주일 시작날짜
    const [endDate, setEndDate] = React.useState(dateFormat(endOfWeek(value)))


  // 날짜 형식 맞춰주는 함수
  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
  
    return (
      date.getFullYear() +
      "." +
      month +
      "." +
      day 
    );
  }

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }
    // 선택한 날짜가 포함된 주의 시작일과 종료일
    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);
    
    // useState로 관리
    setStartDate(dateFormat(start))
    setEndDate(dateFormat(end))


    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  // startDate 바뀔 때마다 리포트 정보 get요청 하기
    React.useEffect(() => {
        dispatch(memberAction.getReportDB(challengeId, startDate));
      }, [startDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        minDate={new Date(props.startDate)} // 챌린지 시작일 이전은 선택 불가능
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={({ inputRef, inputProps, InputProps}) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <p ref={inputRef} {...inputProps} >{startDate.split('.')[0]+"년 "+startDate.split('.')[1]+"월 "+startDate.split('.')[2]+"일"} ~ {endDate.split('.')[1]+"월 "+endDate.split('.')[2]+"일"}</p>
              {InputProps?.endAdornment}
            </Box>
          )}
      />
      
    </LocalizationProvider>
  );
}


export default CustomDay;