import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const InfinityScroll = ({
  children,
  callNext,
  paging,
  type,
  isChat,
  isFirst,
}) => {
  const spinnerRef = useRef(null);
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      callNext();
    }
  });

  useEffect(() => {
    if (paging.next === false) return;
    if (!spinnerRef.current) return;

    handleObserver.observe(spinnerRef.current);

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current);
    };
  }, [paging]);

  // 스크롤할 div useRef로 접근
  const scrollRef = useRef();
  // 채팅 무한스크롤 시 스크롤
  useEffect(() => {
    if (isChat) {
      console.log(isFirst);
      if (isFirst !== 1) {
        scrollRef.current.scrollIntoView();
      }
    }
  }, [callNext]);

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
      {isChat && (
        <>
          <div ref={scrollRef}> </div>

          {children}
        </>
      )}
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
