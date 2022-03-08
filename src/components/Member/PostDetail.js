import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../../redux/modules/member";
import styled from "styled-components";
import { Button, Grid, Input, Image } from "../../elements";

const PostDetail = (props) => {
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
          <ProfileImage size={40} src={props.profileImage} />
          <p>{props.nickname}</p>
        </Grid>
        <Grid is_flex width="auto" padding="0px">
          <p>수정</p>
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
      {/* PostCard의 댓글 입력 창 */}
      <Grid is_flex>
        <Grid>
          <Input
            value={content}
            _onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Grid>
        <Button width="50px" _onClick={addComment}>
          입력
        </Button>
      </Grid>

      {/* PostCard의 댓글 조회 부분 */}
      {props.comments?.map((el, i) => {
        return (
          <Grid key={el.commentId} is_flex>
            <Grid is_flex width="auto">
              <ProfileImage size={20} src={el.profileImage} />
              <p>{el.nickname}</p>
            </Grid>
            <p>{el.content}</p>
            <Grid is_flex width="auto">
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

const PostImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  min-width: var(--size);
  min-height: var(--size);
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border: 1px solid red;
`;

export default PostDetail;
