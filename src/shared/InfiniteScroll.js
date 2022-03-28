import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const InfinityScroll = ({ children, callNext, paging, type, isChat }) => {
  // spinner 요소 useRef
  const spinnerRef = useRef(null);
  // intersection observer 생성
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    // isIntersection : 관찰 대상의 교차 상태(Boolean)
    if (isIntersecting) {
      // 관찰 대상이 교차하면 콜백 함수 실행
      callNext();
    }
  });

  useEffect(() => {
    // 다음으로 불러올 데이터 없으면 (관찰을) 실행하지 않는다.
    if (paging.next === false) return;
    if (!spinnerRef.current) return;

    // spinner 요소 관찰 시작 (관찰 대상 : 스피너)
    handleObserver.observe(spinnerRef.current);

    return () => {
      // 관찰하고 있던 대상 요소 관찰 중지
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current);
    };
  }, [paging]);

  return (
    <>
      {!isChat && children}

      {paging.next && (
        <Spinner ref={spinnerRef}>
          <CircularProgress
            sx={{ color: `${type === "white" ? "#FFFFFF" : "#444444"}` }}
          />
        </Spinner>
      )}
      {isChat && children}
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
};

const Spinner = styled.div`
  width: 100%;
  text-align: center;
`;

export default InfinityScroll;
