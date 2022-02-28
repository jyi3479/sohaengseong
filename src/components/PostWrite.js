import React from "react";
import styled from "styled-components";

const PostWrite = (props) => {
  return <Wrap>글 작성하는 곳</Wrap>;
};

const Wrap = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default PostWrite;
