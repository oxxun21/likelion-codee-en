import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "@emotion/styled";
import { AchieveInfo_I } from "../../interface";
import { getMonthlyAchieveAPI } from "../../api";
import { useCookies } from "react-cookie";
interface MonthlyAchieveProps {
  data: Array<AchieveInfo_I>;
}

export const MonthlyAchieve = ({ data }: MonthlyAchieveProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [achieveData, setAchieveData] = useState<AchieveInfo_I[]>(data);
  const [cookies] = useCookies(["googtrans"]);

  const isGoogTransEn = cookies.googtrans === "/ko/en";

  useEffect(() => {
    setAchieveData(data);
  }, [data]);

  // achieveInfo를 날짜 객체로 변환하여 cnt 값을 매핑
  const achieveMap = achieveData.reduce<{ [key: number]: number }>((acc, cur) => {
    // UTC 기준으로 날짜 객체 생성
    const date = new Date(cur.createdAt);
    // UTC 기준으로 일(day) 추출
    const day = date.getUTCDate();
    acc[day] = cur.cnt;
    return acc;
  }, {});

  const formatWeekDay = (nameOfDay: string) => {
    return nameOfDay.substring(0, 3).toLowerCase();
  };

  const handleMonthChange = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    getMonthlyAchieveAPI(year, month).then(data => {
      setAchieveData(data || []);
    });
  };

  return (
    <StyledContianer>
      <DatePicker
        dateFormatCalendar="YYYY.MM"
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        onMonthChange={handleMonthChange}
        inline
        formatWeekDay={formatWeekDay}
        renderDayContents={(dayOfMonth: number) => {
          return achieveMap[dayOfMonth] || "";
        }}
        dayClassName={(date: Date) => {
          const day = date.getDate();
          const cnt = achieveMap[day];

          let className = "react-datepicker__day--disabled notranslate";
          if (cnt === 1) {
            className += " react-datepicker__day--cnt-1";
          } else if (cnt === 2) {
            className += " react-datepicker__day--cnt-2";
          } else if (cnt === 3) {
            className += " react-datepicker__day--cnt-3";
          }

          return className;
        }}
      />
      <LevelIndicatorContainer className="notranslate">
        <LevelIndicator color="#98EA98">
          <span>{isGoogTransEn ? "1 success" : "1단계 성공"}</span>
        </LevelIndicator>
        <LevelIndicator color="#44B044">
          <span>{isGoogTransEn ? "2 success" : "2단계 성공"}</span>
        </LevelIndicator>
        <LevelIndicator color="#076E07">
          <span>{isGoogTransEn ? "3 success" : "3단계 성공"}</span>
        </LevelIndicator>
      </LevelIndicatorContainer>
    </StyledContianer>
  );
};

const StyledContianer = styled.article`
  background-color: #fafafa;
  border: 1px solid #d1d1d1;
  border-radius: 1.25rem;
  padding: 3rem 2.5rem;
  width: 26.25rem;
  height: 34.1875rem;
  position: relative;

  @media only screen and (max-width: 480px) {
    width: 21.5625rem;
    height: 25.25rem;
    border: none;
    background-color: transparent;
    padding: 0;
    padding-top: 1.25rem;
  }
`;

const LevelIndicatorContainer = styled.div`
  position: absolute;
  right: 2.5rem;
  bottom: 3rem;
  display: flex;
  gap: 1.25rem;
  @media only screen and (max-width: 480px) {
    right: 0;
    bottom: 0;
  }
`;
const LevelIndicator = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;

  & > span {
    color: var(--gray500-color);
    font-size: 0.75rem;
  }

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    background-color: ${props => props.color};
    border-radius: 2px;
  }
`;
