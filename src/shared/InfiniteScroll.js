import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const InfinityScroll = ({ children, callNext, paging, type, isChat }) => {
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
