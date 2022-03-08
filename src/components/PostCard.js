import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import styled from "styled-components";
import { Button, Grid, Input, Image } from "../elements";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";

const PostCard = (props) => {
  const challengeId = useParams().challengeId;
  const dispatch = useDispatch();
  const [content, setContent] = React.useState("");
  const addComment = () => {
    // 유저 정보랑 날짜 등 합치고 initialstate 형식에 맞추어서 딕셔너리 만들기

    // dispatch(memberActions.addComment(props.postId, comment));
    dispatch(memberActions.addCommentDB(props.postId, content));
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
      </Grid>

      {/* PostCard의 내용 부분 */}
      {/* 인증사진 올리지 않는 경우 대비 */}
      {props.postImage ? (
        <Image shape="rectangle" size={375} src={props.postImage} />
      ) : (
        ""
      )}
      <Grid margin="16px 0" padding="0px">
        <p>{props.content}</p>
      </Grid>

      {/* PostCard의 댓글 조회 부분 */}
      <CommentBox>
        <p>
          댓글 <span>{props.comments.length}</span>개
        </p>
        {props.comments?.map((el, i) => {
          return (
            <Grid padding="0px" margin="8px 0px" key={el.commentId} is_flex>
              <Grid is_flex padding="0px" width="auto">
                <p>{el.nickname}</p>
              </Grid>
              <p>{el.content}</p>
              <Grid is_flex padding="0px" width="auto">
                <p>{el.createdAt}</p>
              </Grid>
              <p
                onClick={() => {
                  deleteComment(el.commentId);
                }}
              >
                삭제
              </p>
            </Grid>
          );
        })}
      </CommentBox>
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

const CommentBox = styled.div`
  margin: 16px 0px;
  padding: 10px 0px;
  border-top: 1px solid #d9d9d9;
`;

export default PostCard;
