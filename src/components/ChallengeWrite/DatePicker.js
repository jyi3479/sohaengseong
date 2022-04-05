import React from "react";

// 기간 선택 라이브러리(MUI)
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

import { DateBox } from "../../styles/ChallengeWriteStyle";
import { dateFormat } from "../../shared/dateFormat";

const DatePicker = React.memo(({ value, setValue, startDate, setStartDate, endDate, setEndDate, isEdit }) => {
  const [dateFocus, setDateFocus] = React.useState(false); // 날짜 선택 입력창 활성화 여부

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <p style={{ fontSize: "16px", margin: "0px 0px 2px" }}>기간을 선택해주세요.</p>
        <p className="small sub_color">시작날짜와 종료날짜를 선택하여 기간을 설정할 수 있습니다.</p>
        <MobileDateRangePicker
          calendars={1}
          value={value}
          minDate={new Date()} // 오늘 이전 날짜 선택 못 함
          onChange={(newValue) => {
            setValue(newValue);

            const range = (newValue[1] - newValue[0]) / (1000 * 60 * 60 * 24);
            if (newValue[1] && range < 14) {
              window.alert("2주 이상 선택해주세요!");
              setValue([null, null]);
            } else {
              setStartDate(newValue[0]);
              setEndDate(newValue[1]);
            }
          }}
          renderInput={(startProps, endProps, inputRef) => (
            <React.Fragment>
              {isEdit ? (
                <DateBox className="ok">
                  <input id="date" style={{ color: "#a2aab3", cursor: "default" }} value={startDate?.split(" ")[0] + " - " + endDate?.split(" ")[0]} disabled />
                </DateBox>
              ) : (
                <DateBox className={dateFocus ? "active" : !value.includes(null) ? "ok" : ""}>
                  <input
                    id="date"
                    ref={startProps.inputRef}
                    {...startProps.inputProps}
                    placeholder="예) 2022.03.06 - 2022.03.19"
                    value={
                      startDate || endDate
                        ? (startDate ? dateFormat(startDate).split(" ")[0] : "") + " - " + (endDate ? dateFormat(endDate).split(" ")[0] : "")
                        : ""
                    }
                    onFocus={() => setDateFocus(true)}
                    onBlur={() => setDateFocus(false)}
                  />
                </DateBox>
              )}
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
});

export default DatePicker;
