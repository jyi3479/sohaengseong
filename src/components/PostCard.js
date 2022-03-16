import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";

import moment from "moment";
import "moment/locale/ko";

import { actionCreators as memberActions } from "../redux/modules/member";
import { actionCreators as challengeActions } from "../redux/modules/challenge";
import { Grid, Image } from "../elements";
import Modal from "./Modal";
import PostModal from "./Member/PostModal";
import comment from "../image/icons/ic_relpy@2x.png";
import deleteIcon from "../image/icons/ic_delete@2x.png";
import close from "../image/icons/icon_close_btn@2x.png";
import edit from "../image/icons/ic_edit@2x.png";
import more from "../image/icons/ic_more@2x.png";
import crown from "../image/icons/ic_crown@2x.png";
import defaultImg from "../image/img_profile_defalt @2x.png";


const PostCard = (props) => {
  moment.locale("ko"); // 모멘트 한글로 바꾸기
  const challengeId = useParams().challengeId;
  const roomId = useParams().roomId;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const post = useSelector((state) => state.member.post);
  const is_me = userInfo&&userInfo.nickname === props.nickname;
  const isDetail = useParams().postId ? true : false;
  // const comments = props.comments.filter((l, idx) =>
  //   isDetail ? true : idx < 2
  // );
  const comments = props.comments;
  const no_comment = comments&&comments.length === 0;
  const target = useSelector(state => state.challenge.target);
  const members = target&&target.members;
  const member_idx = members&&members.findIndex((m) => m.userId === parseInt(target.userId));
  const admin = members&&members[member_idx].nickname === props.nickname;


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

  React.useEffect(()=>{
    dispatch(challengeActions.getOneChallengeDB(challengeId));
  },[]);

  return (
    <>
        <Wrap className={isDetail? "is_detail" : ""}>
          {/* PostCard의 윗 부분 */}
          <Grid is_flex padding="16px 12px 16px 20px">
            <Grid is_flex width="auto" padding="0px" style={{overflow:"initial"}}>
              <ProfileBox className={admin? "admin" : ""}>
                <Image
                  shape="border"
                  size="40"
                  level={props.levelName}
                  profile={
                    props.profileImage !== null ? props.profileImage : defaultImg
                  }
                ></Image>
              </ProfileBox>
              
              <p style={{ marginLeft: "12px" }}>{props.nickname}</p>
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
            <Grid padding="16px 20px">
              <p className={isDetail? "" : "ellipsis2"} style={{ color: "#333333" }}>{props.content}</p>
            </Grid>

            {/* PostCard의 댓글 조회 부분 */}
            <CommentContainer>
              <CommentBox>
                <img src={comment} />
                <p className="font15">
                  댓글 <span className="poppins font15">{props.comments? props.comments.length : "0"}</span>개
                </p>
              </CommentBox>
              {/* PostCard의 댓글 입력 창 */}
              {isDetail && userInfo&& (
                <CommentWriteBox className="comment_write_box">
                  <div>
                    <Image
                      shape="circle"
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
                      <h3 className={content?"point_color":"caption_color"}>등록</h3>
                    </button>
                  </InputBox>
                </CommentWriteBox>
              )}
               
              <Grid padding={no_comment ? "0" : "15px 0 0"}>
                {comments.map((el, i) => {
                  return (
                    <Comment
                      className="comment"
                      key={el.commentId}
                    >
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
                      <div className="comment_box">
                        <div className="comment_info">
                          <p className="bold">{el.nickname}</p>
                          <p className="ellipsis">{el.content}</p>
                        </div>
                        <div className="comment_tool">                      
                          <p className="caption_color small t_right">
                            {moment(el.createdAt, "YYYY.MM.DD kk:mm:ss").fromNow("")}
                          </p>

                          {isDetail && userInfo.nickname === el.nickname && (
                            <Delete
                              className="sub_point_color small"
                              onClick={() => {
                                deleteComment(el.commentId);
                              }}
                            >삭제하기</Delete>
                          )}
                        </div>        
                      </div>              
                    </Comment>
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
        </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  &.is_detail {
    .comment {
      align-items: flex-start;
      &:nth-child(n+3) {
        display: flex;
      }
      .comment_box {
        display: inline-block;
        margin-left: 13px;
        width: calc(100% - 50px);
        .comment_info{
          width: 100%;
          p:last-child {
            white-space: normal;
          }
        }
        .comment_tool {
          width: 100%;
          line-height: 1;
          p:first-child {
            display: inline-block;
            margin-right: 8px;
          }         
        }
      }
    }
  }
  .comment {
    &:nth-child(n+3) {
      display: none;
    }
    .comment_box {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .comment_info {
        display: flex;
        width: calc(100% - 60px);
        p:last-child {
          margin-left:4px;
          width: calc(100% - 100px);
        }
      }
    }
  }

`;

const ProfileBox = styled.div`
  position: relative;
  &.admin {
    &::after {
      content: '';
      width:20px;
      height: 20px;
      background-image: url(${crown});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: absolute;
      bottom:-3px;
      right: -5px;
    }
  }  
`;

const CommentContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #eff0f2;
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
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
    margin-left: -4px
  }
`;

const CommentWriteBox = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Comment = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  margin-bottom:8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  border-radius: 18px;
  background-color: rgba(124, 130, 136, 0.1);
  margin-left: 6px;
  overflow: hidden;
  input {
    border: none;
    width: 80%;
    padding: 8px 16px;
    background-color: initial;
    &::placeholder {
      color: #a2aab3;
    }
  }
  button {
    border: none;
    background: none;
    width: 20%;
    h3 {

    }
  }
`;

const Delete = styled.button`
  border:none;
  background-color: transparent;
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
