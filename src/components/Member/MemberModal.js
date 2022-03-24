import React from "react";
import styled from "styled-components";
import { Grid } from "../../elements";
import close from "../../image/icons/ic_delete_m.png";

//스크롤바 커스텀
import ScrollBar from "../../components/shared/ScrollBar";

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
  border-radius: 8px;
  background-color: #fff;
  width: 316px;
  min-height: 400px;
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
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 24px;
`;

const MemberModal = ({ state, _handleModal, children, ...rest }) => {
  return state ? (
    <Container>
      <Background onClick={_handleModal} />
      <ModalBlock {...rest}>
        <Grid
          is_flex
          height="58px"
          padding="20px 24px 16px"
          style={{ borderBottom: "solid 1px #eff0f2" }}
        >
          <h3 className="mt4">멤버 리스트</h3>
          <Close onClick={_handleModal} />
        </Grid>
        <ScrollBar height="341px">
          <Contents>{children}</Contents>
        </ScrollBar>        
      </ModalBlock>
    </Container>
  ) : (
    <></>
  );
};

export default MemberModal;
