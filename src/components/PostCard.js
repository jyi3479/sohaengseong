import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import styled from "styled-components";
import { Button, Grid, Input, Image } from "../elements";
import PostModal from "./Member/PostModal";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import comment from "../image/icons/ic_relpy@2x.png";
import deleteIcon from "../image/icons/ic_delete@2x.png";
import close from "../image/icons/icon_close_btn@2x.png";
import edit from "../image/icons/ic_edit@2x.png";
import more from "../image/icons/ic_more@2x.png";
import defaultImg from "../image/img_profile_defalt @2x.png";
import moment from "moment";
import "moment/locale/ko";
import Modal from "./Modal";

const PostCard = (props) => {
  moment.locale("ko"); // 모멘트 한글로 바꾸기
  const challengeId = useParams().challengeId;
  const roomId = useParams().roomId;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const is_me = userInfo.nickname === props.nickname;
  const isDetail = useParams().postId ? true : false;
  const comments = props.comments.filter((l, idx) =>
    isDetail ? true : idx < 2
  );
  const [content, setContent] = React.useState("");
  const addComment = () => {
    // 유저 정보랑 날짜 등 합치고 initialstate 형식에 맞추어서 딕셔너리 만들기

    // dispatch(memberActions.addComment(props.postId, comment));
    dispatch(memberActions.addCommentDB(props.postId, content));
    setContent("");
  };
  const deletePost = () => {
    dispatch(memberActions.deletePostDB(props.postId));
    setModalOpen(false);
    history.replace(`/post/${challengeId}/${roomId}`);
  };

  const deleteComment = (commentId) => {
    dispatch(memberActions.deleteCommentDB(props.postId, commentId));
  };

  // 모달 팝업1 -------------------------------------------------
  const [modalState, setModalState] = React.useState(false);
  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  // 모달 팝업2 ---------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const openDeleteModal = () => {
    setModalType("openModal");
    console.log("챌린지 개설");
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    console.log("눌림");
    setModalOpen(false);
  };

  return (
    <Grid bg="#fff" padding="0px" margin="0 0 32px">
      {/* PostCard의 윗 부분 */}
      <Grid is_flex margin="16px 0px">
        <Grid is_flex width="auto" padding="0px">
          <Image
            shape="border"
            size="40"
            level={props.levelName}
            profile={
              props.profileImage !== null ? props.profileImage : defaultImg
            }
          ></Image>
          <p style={{ margin: "0px 10px" }}>{props.nickname}</p>
        </Grid>
        {is_me && (
          <MoreBtn onClick={openModal}>
            <img src={more}></img>
          </MoreBtn>
        )}
      </Grid>
      {/* 인증 게시글 내용물 클릭하면 상세 페이지로 이동 */}
      <Grid
        padding="0px"
        _onClick={() => {
          if (!isDetail) {
            history.push(
              `/post/${challengeId}/detail/${props.postId}/${props.roomId}`
            );
          }
        }}
      >
        {/* PostCard의 내용 부분 */}
        {/* 인증사진 올리지 않는 경우 대비 */}
        {props.postImage ? (
          <Image shape="rectangle" size={375} src={props.postImage} />
        ) : (
          ""
        )}
        <Grid margin="16px 0">
          <p style={{ color: "#333333" }}>{props.content}</p>
        </Grid>

        {/* PostCard의 댓글 조회 부분 */}
        <CommentContainer>
          <CommentBox>
            <img src={comment} />
            <p>
              댓글 <span className="poppins">{props.comments.length}</span>개
            </p>
          </CommentBox>
          {/* PostCard의 댓글 입력 창 */}
          {isDetail && (
            <CommentWriteBox>
              <div>
                <Image
                  shape="border"
                  size="36"
                  level={props.levelName}
                  profile={
                    userInfo.profileUrl !== null
                      ? userInfo.profileUrl
                      : defaultImg
                  }
                ></Image>
              </div>

              <InputBox>
                <input
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="댓글달기"
                />
                <button onClick={addComment}>
                  <h3 className="caption_color">등록</h3>
                </button>
              </InputBox>
            </CommentWriteBox>
          )}
          <Grid padding="0" margin="16px 0px">
            {comments.map((el, i) => {
              return (
                <Grid
                  padding="0px"
                  margin="0 0 10px"
                  key={el.commentId}
                  is_flex
                >
                  <ContentBox>
                    {isDetail && (
                      <Image
                        shape="border"
                        size="36"
                        level={el.levelName}
                        profile={
                          el.profileImage !== null
                            ? el.profileImage
                            : defaultImg
                        }
                      ></Image>
                    )}
                    <p className="writer">{el.nickname}</p>

                    <p>{el.content}</p>
                  </ContentBox>
                  <p className="caption_color small t_right">
                    {moment(el.createdAt, "YYYY.MM.DD kk:mm:ss").fromNow("")}
                  </p>

                  {isDetail && userInfo.nickname === el.nickname && (
                    <Delete
                      src={deleteIcon}
                      onClick={() => {
                        deleteComment(el.commentId);
                      }}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </CommentContainer>
      </Grid>
      <PostModal state={modalState} _handleModal={closeModal}>
        <>
          <Grid width="auto" padding="0px">
            <ModalBox
              onClick={() => {
                history.push(
                  `/postwrite/${challengeId}/${roomId}/${props.postId}`
                );
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
        </>
      </PostModal>

      <Modal
        open={modalType === "openModal" ? modalOpen : ""}
        close={closeDeleteModal}
        double_btn
        btn_text="삭제"
        _onClick={() => {
          deletePost();
        }}
      >
        <p>
          해당 인증을 삭제하시겠어요? <br />
          삭제 시 인증 미달성으로 바뀝니다.
        </p>
      </Modal>
    </Grid>
  );
};

const CommentContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #d9d9d9;
`;

const MoreBtn = styled.div`
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;

const CommentBox = styled.div`
  display: flex;

  img {
    width: 240x;
    height: 20px;
    margin-right: 5px;
  }
`;

const CommentWriteBox = styled.div`
  display: flex;
  margin-top: 12px;
`;
const InputBox = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  border-radius: 15px;
  background-color: #eaeaea;
  margin-left: 6px;
  input {
    border: none;
    width: 80%;
    border-radius: 15px;
    padding: 8px 16px;
    font-family: inherit;
    background-color: #eaeaea;
  }
  button {
    border: none;
    background: none;
    font-family: inherit;
    width: 20%;
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    margin: 0 10px 0 0;
  }

  .writer {
    font-weight: bold;
  }
`;

const Delete = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 5px;
  cursor: pointer;
`;

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

export default PostCard;
