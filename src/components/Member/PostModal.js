import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.4); */
  /* backdrop-filter: blur(5px); */
  opacity: 0.5;
  background-color: #000;
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.5;
    }
  }
`;

const ModalBlock = styled.div`
  position: absolute;
  bottom: 0;
  /* top: 6.5rem; */
  /* border-radius: 10px; */
  padding-top: 24px;
  background-color: #fff;
  width: 60rem;
  /* @media (max-width: 1120px) {
    width: 50rem;
  }
  @media (max-width: 50rem) {
    width: 80%;
  } */
  min-height: 168px;
  animation: modal-show 0.5s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-bottom: -50px;
    }
    to {
      opacity: 1;
      margin-bottom: 0;
    }
  }
`;

// const Close = styled.img.attrs({
//   src: close,
// })`
//   position: absolute;
//   right: 1.5rem;
//   top: 1.5rem;
//   cursor: pointer;
// `;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostModal = ({ state, _handleModal, children, ...rest }) => {
  return state ? (
    <Container>
      <Background onClick={_handleModal} />
      <ModalBlock {...rest}>
        <Contents>{children}</Contents>
      </ModalBlock>
    </Container>
  ) : (
    <></>
  );
};

export default PostModal;
