import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import styled from "styled-components";
import { Button, Grid, Input, Image } from "../elements";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import comment from "../image/icons/ic_chat@2x.png";
import deleteIcon from "../image/icons/ic_delete@2x.png";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const PostCard = (props) => {
  const challengeId = useParams().challengeId;
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
  };

  const deleteComment = (commentId) => {
    dispatch(memberActions.deleteCommentDB(props.postId, commentId));
  };

  return (
    <Grid>
      {/* PostCard의 윗 부분 */}
      <Grid is_flex padding="0px" margin="20px 0px">
        <Grid is_flex width="auto" padding="0px">
          <Image size={40} profile={props.profileImage} />
          <p style={{ margin: "0px 10px" }}>{props.nickname}</p>
        </Grid>
        {is_me && (
          <Grid is_flex width="auto" padding="0px">
            <p
              onClick={() => {
                history.push(`/post/${challengeId}/write/${props.postId}`);
              }}
            >
              수정
            </p>
            <p onClick={deletePost}>삭제</p>
          </Grid>
        )}
      </Grid>
      {/* 인증 게시글 내용물 클릭하면 상세 페이지로 이동 */}
      <Grid
        padding="0px"
        _onClick={() => {
          if (!isDetail) {
            history.push(`/post/${challengeId}/detail/${props.postId}`);
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
        <Grid margin="16px 0" padding="0px">
          <p style={{ fontSize: "14px" }}>{props.content}</p>
        </Grid>

        {/* PostCard의 댓글 조회 부분 */}
        <CommentContainer>
          <CommentBox>
            <img src={comment} />
            <p>
              댓글 <span>{props.comments.length}</span>개
            </p>
          </CommentBox>
          {/* PostCard의 댓글 입력 창 */}
          {isDetail && (
            <CommentWriteBox>
              <div>
                <Image
                  size={36}
                  profile={
                    userInfo
                      ? userInfo.profileUrl
                      : "https://www.garyqi.com/wp-content/uploads/2017/01/default-avatar-500x500.jpg"
                  }
                />
              </div>

              <InputBox>
                <input
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  placeholder="댓글달기"
                />
                <button onClick={addComment}>등록</button>
              </InputBox>
            </CommentWriteBox>
          )}
          {comments.map((el, i) => {
            return (
              <Grid padding="0px" margin="8px 0px" key={el.commentId} is_flex>
                <ContentBox>
                  {isDetail && <Image size={36} profile={el.profileImage} />}
                  <Writer>{el.nickname}</Writer>

                  <Comment>{el.content}</Comment>

                  <Date>
                    {moment(el.createdAt, "YYYY.MM.DD kk:mm:ss").fromNow("")}
                  </Date>
                </ContentBox>
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
        </CommentContainer>
      </Grid>
    </Grid>
  );
};

const ProfileImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  min-width: var(--size);
  min-height: var(--size);
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 1px solid red;
`;

const CommentContainer = styled.div`
  margin: 16px 0px;
  padding: 10px 0px;
  border-top: 1px solid #d9d9d9;
`;

const CommentBox = styled.div`
  display: flex;

  img {
    width: 24px;
    height: 24px;
    margin-right: 9px;
  }

  p {
    font-size: 14px;
    line-height: 1.43;
    letter-spacing: -0.42px;
    text-align: left;
    color: #000;
    span {
      font-weight: bold;
      margin-left: 4px;
    }
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
  p {
    margin: 7px 5px 5px;
  }
`;

const Writer = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  color: #000;
`;

const Comment = styled.p`
  font-size: 14px;
  line-height: 1.43;
  color: #333;
`;

const Date = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: #9b9b9b;
`;

const Delete = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 5px;
  cursor: pointer;
`;

export default PostCard;
