import React from "react";
import styled from "styled-components";
import close from "../../image/icons/btn_delete_s@2x.png";

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
  opacity: 0.5;
  background-color: #000;
  animation: modal-bg-show 0.5s;
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
  top: 6.5rem;
  border-radius: 10px;
  padding: 40px 30px;
  background-color: #fff;
  width: 60rem;
  @media (max-width: 1120px) {
    width: 50rem;
  }
  @media (max-width: 50rem) {
    width: 80%;
  }
  min-height: 35rem;
  animation: modal-show 0.5s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Close = styled.img.attrs({
  src: close,
})`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberModal = ({ state, _handleModal, children, ...rest }) => {
  return state ? (
    <Container>
      <Background onClick={_handleModal} />
      <ModalBlock {...rest}>
        <Close onClick={_handleModal} />
        <Contents>{children}</Contents>
      </ModalBlock>
    </Container>
  ) : (
    <></>
  );
};

export default MemberModal;
