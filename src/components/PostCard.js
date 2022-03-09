import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as memberActions } from "../redux/modules/member";
import styled from "styled-components";
import { Button, Grid, Input, Image } from "../elements";
import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import comment from "../image/icons/ic_chat@2x.png";

const PostCard = (props) => {
  const challengeId = useParams().challengeId;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const is_me = userInfo.nickname === props.nickname;
  const isDetail = useParams().postId;
  console.log(isDetail);
  const recentComments = props.comments.filter((l, idx) => idx < 2);
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
          history.push(`/post/${challengeId}/detail/${props.postId}`);
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
          <p>{props.content}</p>
        </Grid>

        {/* PostCard의 댓글 조회 부분 */}
        <CommentContainer>
          <CommentBox>
            <img src={comment} />
            <p>
              댓글 <span>{props.comments.length}</span>개
            </p>
          </CommentBox>
          {recentComments?.map((el, i) => {
            return (
              <Grid padding="0px" margin="8px 0px" key={el.commentId} is_flex>
                <Grid is_flex padding="0px" width="auto">
                  <Writer>{el.nickname}</Writer>
                </Grid>
                <Comment>{el.content}</Comment>
                <Grid is_flex padding="0px" width="auto">
                  <Date>{el.createdAt}</Date>
                </Grid>
                {userInfo.nickname === el.nickname && (
                  <Delete
                    onClick={() => {
                      deleteComment(el.commentId);
                    }}
                  >
                    삭제
                  </Delete>
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

const Delete = styled.p`
  font-size: 12px;
  line-height: 1.5;
  text-align: right;
  color: #9b9b9b;
  cursor: pointer;
`;

export default PostCard;
