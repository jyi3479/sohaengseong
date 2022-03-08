import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { challengeApis } from "../shared/apis";
import { targetChallenge } from "../redux/modules/challenge";
import { apis } from "../shared/apis";

//비밀방 비밀번호 커스텀
import ReactCodeInput from "react-code-input";

//이미지 슬라이더(Swiper) import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

//모달팝업
import Modal from "../components/Modal";

//사용자 import
import { Grid, Image, Button } from "../elements/index";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import * as baseAction from "../redux/modules/base";
import empty from "../image/ic_empty_s@2x.png";
import defaultImg from "../image/img_profile_defalt @2x.png";
import crown from "../image/icons/ic_crown@2x.png";
import share from "../image/icons/ic_share@2x.png";

const MemberDetail = (props) => {
  const dispatch = useDispatch();
  const userInfo = parseInt(localStorage.getItem("userId"));
  const challengeId = props.match.params.challengeId;
  const target = useSelector((state) => state.challenge.target);
  const tagList = target && target.tagName;
  const members = target && target.members;
  const member_idx =
    members && members.findIndex((m) => m.userId === parseInt(target.userId));
  const member =
    members && members.find((m) => m.userId === parseInt(userInfo));
  const admin = members && members[member_idx];
  const imageList = target && target.challengeImage;
  const startDate = target && `${target.startDate.split(" ")[0].split("-")[0]}`;
  const endDate = target && `${target.endDate.split(" ")[0].split("-")[0]}`;

  console.log(member);

  const joinChallenge = () => {
    dispatch(challengeAction.joinChallengeDB(challengeId));
  };

  const deleteChallenge = () => {
    dispatch(challengeAction.deleteChallengeDB(challengeId));
  };

  //모달 팝업 -----------------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [checkPrivate, setCheckPrivate] = React.useState(false); //비밀방 비밀번호 맞는지 확인
  const [isNum, setIsNum] = React.useState(false); //비밀방 비밀번호 숫자체크
  const [join, setJoin] = React.useState(false); //입장하기 클릭여부
  const [privatePwd, setPrivatePwd] = React.useState(""); //비밀방 비밀번호 value

  const deleteModal = () => {
    setModalType("deleteModal");
    console.log("챌린지 삭제");
    setModalOpen(true);
  };
  const joinModal = () => {
    if (!target.isPrivate) {
      setModalType("joinModal");
    } else {
      setModalType("privateModal");
    }
    console.log("챌린지 입장");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("눌림");
    setModalOpen(false);
    setPrivatePwd("");
  };

  const privateCheck = (e) => {
    setIsNum(false);
    const pwdRegex = /^[0-9]+$/;
    const pwdcurrent = e;
    let PwdRegex = pwdRegex.test(e);

    setPrivatePwd(e);

    if (!PwdRegex) {
      setIsNum(false);
    } else {
      setIsNum(true);
    }
  };

  const pwdCheck = () => {
    const input = document.getElementsByClassName("ReactCodeInput");
    setJoin(true);
    apis
      .post(`/challenge/${challengeId}/private`, { password: privatePwd })
      .then((res) => {
        console.log("비밀방 비밀번호 확인", res);
        if (res.result === true) {
          setCheckPrivate(true);
          dispatch(challengeAction.joinChallengeDB(challengeId));
          history.push(`/member/${challengeId}`);
        } else {
          setCheckPrivate(false);
        }
      })
      .catch((err) => {
        console.log("비밀번호 확인오류", err);
      });
  };

  React.useEffect(() => {
    challengeApis
      .getOneChallenge(challengeId)
      .then((res) => {
        console.log("한개", res);
        const target = res.data;
        dispatch(targetChallenge(target));
        //헤더&푸터 state
        dispatch(baseAction.setHeader("행성 정보", true));
      })
      .catch((err) => {
        console.log("특정 챌린지 조회 오류", err);
      });
    dispatch(baseAction.setGnb(false));
    return () => {
      dispatch(baseAction.setHeader(false, ""));
      dispatch(baseAction.setGnb(true));
    };
  }, []);

  return (
    <>
      {target && (
        <Grid padding="0" margin="48px 0 0" bg="#eee">
          <Grid padding="0" style={{ position: "relative" }}>
            {imageList.length > 0 ? (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                  type: "fraction", //페이지네이션 타입
                  el: ".pagination", //페이지네이션 클래스
                }}
                modules={[Pagination]}
                className="mySwiper"
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {imageList.map((el, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <Image shape="rectangle" padding="250px" src={el}></Image>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              //이미지 리스트에 이미지가 없다면 디폴트 이미지 노출 (디폴트 이미지 변경예정)
              <Image shape="rectangle" padding="250px" src={empty}></Image>
            )}
          </Grid>
          <Grid bg="#fff" margin="0 0 10px" padding="20px">
            <TitleBox>
              <h1>{target.title}</h1>
            </TitleBox>
            <p style={{ fontSize: "14px", color: "#666" }}>{target.category}</p>
            <Grid padding="0" margin="12px 0">
              {tagList.map((el, i) => {
                return <Tag key={i}>{el}</Tag>;
              })}
            </Grid>
          </Grid>

          <Grid bg="#fff" padding="20px">
            <ContentBox>
              <Title>방장</Title>
              <Content>{admin.nickname}</Content>
            </ContentBox>
            <ContentBox>
              <Title>개설일</Title>
              <Content>{target.startDate.split(" ")[0]}</Content>
            </ContentBox>
            <ContentBox>
              <Title>멤버수</Title>
              <Content>
                {target.currentMember}명{" "}
                <Grid
                  padding="24px 0"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {members &&
                    members.map((el, i) => {
                      return (
                        //만약에 방을 만든 userId와 멤버의 userId가 같은 경우(방장인 경우) className을 붙여준다.
                        <Member
                          key={el.userId}
                          className={admin.userId === el.userId ? "admin" : ""}
                          style={{
                            backgroundImage: `url(${
                              el.profileImage !== null
                                ? el.profileImage
                                : defaultImg
                            })`,
                          }}
                          src={el.profileImage}
                        ></Member>
                      );
                    })}
                </Grid>
              </Content>
            </ContentBox>
            <ContentBox>
              <Title>소개글</Title>
              <Content>{target.content}</Content>
            </ContentBox>
            <ContentBox>
              <Title>공개 여부</Title>
              <Content>{target.isPrivate ? "비밀" : "공개"}</Content>
            </ContentBox>
            <Fixed>
              {target.status !== "완료" ? (
                target.maxMember !== members.length ? (
                  member !== undefined ? (
                    admin.userId === userInfo ? (
                      //내가 만든 챌린지 (시작 전)
                      <Grid padding="0" is_flex>
                        <Button
                          width="calc(50% - 5px)"
                          bg="#fff"
                          style={{ color: "#666", border: "1px solid #666" }}
                          _onClick={() => {
                            deleteModal();
                          }}
                        >
                          삭제하기
                        </Button>
                        <Button
                          width="calc(50% - 5px)"
                          _onClick={() => {
                            history.push(`/challengewrite/${challengeId}`);
                          }}
                        >
                          수정하기
                        </Button>
                      </Grid>
                    ) : (
                      //내가 참여중인 챌린지 (방장인데 챌린지 시작했을 경우도 포함)
                      <Button
                        bg="#bbb"
                        color="#fff"
                        style={{ cursor: "auto" }}
                        _disabled
                      >
                        행성 나가기
                      </Button>
                    )
                  ) : (
                    //참여가능한 챌린지
                    <Button
                      _onClick={() => {
                        //joinChallenge()
                        joinModal();
                      }}
                    >
                      소행성 입주하기
                    </Button>
                  )
                ) : (
                  //참가자 꽉참
                  <Button
                    bg="#bbb"
                    color="#fff"
                    style={{ cursor: "auto" }}
                    _disabled
                  >
                    마감된 행성입니다.
                  </Button>
                )
              ) : (
                //기간 끝남
                <Button
                  bg="#bbb"
                  color="#fff"
                  style={{ cursor: "auto" }}
                  _disabled
                >
                  기간이 만료되었습니다.
                </Button>
              )}
            </Fixed>
          </Grid>

          {/* 삭제하기 버튼 클릭 시 뜨는 모달팝업 */}
          <Modal
            open={modalType === "deleteModal" ? modalOpen : ""}
            close={closeModal}
            double_btn
            btn_text="삭제"
            _onClick={() => {
              deleteChallenge();
            }}
          >
            <p>정말로 삭제하시겠습니까?</p>
          </Modal>
          {/* 삭제하기 눌렀을 때 진행중인 챌린지에 뜨는 모달팝업 */}
          <Modal
            open={modalType === "deleteModal2" ? modalOpen : ""}
            close={closeModal}
            btn_text="확인"
          >
            <p>
              진행중인 챌린지는
              <br />
              삭제하실 수 없습니다.
            </p>
          </Modal>
          {/* 입장하기 버튼 클릭 시 뜨는 모달팝업 - 공개방 */}
          <Modal
            open={modalType === "joinModal" ? modalOpen : ""}
            close={closeModal}
            double_btn
            btn_text="입장"
            _onClick={() => {
              joinChallenge();
            }}
          >
            <div>
              <h6>입장하시겠습니까?</h6>
              <p>
                다른 입주민분들을 위해 <br />
                신중하게 선택해 주시기 바랍니다.
                <br />
              </p>
            </div>
          </Modal>
        </Grid>
      )}
    </>
  );
};
const ShareBtn = styled.button`
  //공유버튼
  position: absolute;
  width: 28px;
  height: 28px;
  right: 20px;
  top: 20px;
  background-color: transparent;
  border: none;
  background-image: url(${share});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 2;
`;

const TitleBox = styled.div`
  margin-bottom: 5px;
  h1 {
    font-size: 20px;
    line-height: 25px;
    font-weight: 500;
  }
`;

const Tag = styled.p`
  display: inline-block;
  margin: 0;
  margin-right: 6px;
  font-size: 12px;
  color: #7b7b7b;
  border-radius: 5px;
  padding: 2px 4px;
  background-color: #ededed;
`;

const ContentBox = styled.div`
  display: flex;
  margin-bottom: 14px;
`;

const Title = styled.p`
  width: 65px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  text-align: left;
  color: #333;
`;

const Content = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  text-align: left;
  color: #333;
`;

const Member = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  border: solid 1px #999;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-right: 5px;
  &:nth-child(n + 4) {
    //3번째 멤버 이후로는 미노출
    display: none;
  }
  &.admin {
    //방장일 경우
    position: relative;
    margin-right: 9px;
    &::after {
      content: "";
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background-image: url(${crown});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: absolute;
      bottom: 0;
      right: -3px;
    }
  }
`;
const Fixed = styled.div`
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.04);
  button {
    border-radius: 5px;
  }
`;

export default MemberDetail;
