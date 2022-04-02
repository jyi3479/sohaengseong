import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { Grid, Tag } from "../elements";

import lock from "../image/icon/ic_lock@2x.png";
import peopleIcon from "../image/icon/ic_people@2x.png";
import defaultImg from "../image/ic_empty_s@2x.png";
import stamp from "../image/icon/ic_stamp@2x.png";
import more from "../image/icons/ic_more_2@2x.png";


import { actionCreators as challengeAction } from "../redux/modules/challenge";

//모달
import Modal from "./Modal";
import PostModal from "./Member/PostModal";


import deleteIcon from "../image/icons/ic_delete@2x.png";
import close from "../image/icons/icon_close_btn@2x.png";
import edit from "../image/icons/ic_edit@2x.png";


const ChallengeCard = (props) => {
  const dispatch = useDispatch();
  const startDate = `${props.startDate.split(" ")[0].split("-")[0]}`;
  const endDate = `${props.endDate.split(" ")[0].split("-")[0]}`;


  // 모달 팝업1 (인증 게시글 상세버튼 클릭 시 모달 - 수정/삭제) -------------------------------------------------
  const [modalState, setModalState] = React.useState(false);
  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  // 모달 팝업2 (인증 게시글 삭제 클릭 시 모달) ---------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const openDeleteModal = () => {
    setModalType("openModal");
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
  };

  //챌린지 삭제
  const deleteChallenge = (challengeId) => {
    dispatch(challengeAction.deleteChallengeDB(challengeId));
  };

  return (
    <>
    <Box  className={props.className}>
      <ImageBox
        onClick={props._onClick}
        status={props.status}
        style={{
          backgroundImage: `url(${
            props.challengeImage[0] ? props.challengeImage[0] : defaultImg
          })`,
        }}
      >
        <p className="small">
          <img src={peopleIcon} />
          {props.currentMember}/{props.maxMember}명
        </p>
        {props.dailyAuth && props.dailyAuth === "true" ? <Done></Done> : null}
      </ImageBox>
      <ContentBox>
        <div style={{ height: "58px" }}>
          <div className={props.className === "admin_challenge"? "title_box admin":"title_box"}>
            <h3 className="ellipsis2">{props.title}</h3>
            <button className="menu_btn" onClick={openModal}></button>
          </div>
          <p className="caption caption_color" style={{ margin: "2px 0 6px" }}>
            {props.category}
          </p>
        </div>
        <div className="contents">
          <div>
            {props.tagName?.map((el, i) => {
              return <Tag key={i} tag={el}></Tag>;
            })}
          </div>
          <div className="date">
            <p className="small caption_color" style={{ marginRight: "6px" }}>
              {startDate} - {endDate}
            </p>
            <img
              src={props.isPrivate ? lock : null}
              style={{ width: "16px", verticalAlign: "sub" }}
            ></img>
          </div>
        </div>
      </ContentBox>
      {/* 상세 버튼 클릭 시 모달 */}
      <PostModal state={modalState} _handleModal={closeModal}>   
          <Grid width="auto" padding="0px">
            <ModalBox
              onClick={() => {                      
                history.push(`/challengewrite/${props.challengeId}`);  
              }}
            >
              <img src={edit} />
              <p>수정하기</p>
            </ModalBox>
            <ModalBox
              onClick={() => {
                openDeleteModal();
                closeModal();
              }}
            >
              <img src={deleteIcon} />
              <p>삭제하기</p>
            </ModalBox>
            <ModalBox onClick={closeModal}>
              <img src={close} />
              <p>취소</p>
            </ModalBox>
          </Grid>    
      </PostModal>
      {/* 챌린지 삭제 버튼 클릭 시 모달 */}
      <Modal
        open={modalType === "openModal" ? modalOpen : ""}
        close={closeDeleteModal}
        double_btn
        btn_text="삭제"
        _onClick={() => {
          deleteChallenge(props.challengeId);
        }}
      >
        <p>
          해당 챌린지를 삭제하시겠어요?
        </p>
      </Modal>
    </Box>
  </>
  );
};

const Box = styled.div`
  display: inline-block;
  width: calc(50% - 6px);
  height: auto;
  margin: 0 12px 16px 0;
  vertical-align: top;
  cursor: pointer;
  ${(props) =>
    props.className === "isRecommend"
      ? ``
      : `:nth-child(2n) {
    margin-right: 0;
  }`}
`;

const ImageBox = styled.div`
  width: 100%;
  height: 162px;
  border-radius: 12px;
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  margin-bottom: 12px;
  background-color: #fff;
  background-image: url(${defaultImg});
  p {
    color: #fff;
    background-color: rgba(3, 1, 2, 0.5);
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    img {
      width: 16px;
      vertical-align: sub;
    }
  }
`;

const Done = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  background-size: 82px;
  background-image: url(${stamp});
  background-position: center;
`;

const ContentBox = styled.div`
  height: 105px;
  position: relative;
  .title_box {    
    .menu_btn {
      display: none;
      width: 13px;
      height: 13px;
      background-image: url(${more});
      background-color: transparent;
      background-size: cover;
      border: none;
      margin-top: 5px;
    }
    &.admin {
      display: flex;
      width: 100%;
      align-items: flex-start;
      h3 {
        width: calc(100% - 20px);
        margin-right: 7px;
      }
      .menu_btn {
        display: inline-block;
      }
    }
  }  
  .contents {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    .date {
      * {
        display: inline-block;
      }
    }
  }
`;

//수정.삭제 모달
const ModalBox = styled.div`
  width: 375px;
  padding: 0px 21px;
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-right: 7px;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.48px;
    text-align: left;
    color: #000;
    margin: 3px;
  }
`;

export default ChallengeCard;
