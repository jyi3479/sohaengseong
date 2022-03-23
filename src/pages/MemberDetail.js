import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { challengeApis } from "../shared/apis";
import { targetChallenge } from "../redux/modules/challenge";
import { apis } from "../shared/apis";
import moment from "moment";

//이미지 슬라이더(Swiper) import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

//모달팝업
import Modal from "../components/Modal";

//사용자 import
import { Grid, Image, Button, Tag } from "../elements/index";
import { actionCreators as challengeAction } from "../redux/modules/challenge";
import { actionCreators as memberAction } from "../redux/modules/member";
import * as baseAction from "../redux/modules/base";
import empty from "../image/ic_empty_s@2x.png";
import defaultImg from "../image/img_profile_defalt @2x.png";
import crown from "../image/icons/ic_crown@2x.png";
import share from "../image/icons/ic_share@2x.png";
import plus from "../image/icons/ic_plus_s@2x.png";
import MemberModal from "../components/Member/MemberModal";

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

  const exitChallenge = () => {
    dispatch(memberAction.exitChallengeDB(challengeId));
    console.log("챌린지 나가기");
  };

  const deleteChallenge = () => {
    dispatch(challengeAction.deleteChallengeDB(challengeId));
  };

  //버튼 모달 팝업 -----------------------------------------
  const [modalType, setModalType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const deleteModal = () => {
    setModalType("deleteModal");
    console.log("챌린지 삭제");
    setModalOpen(true);
  };
  const exitModal = () => {
    setModalType("exitModal");
    console.log("챌린지 나가기");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("눌림");
    setModalOpen(false);
  };

  // 멤버 모달 팝업 -------------------------------------------------
  const [memberModalState, setMemberModalState] = React.useState(false);
  const openMemberModal = () => {
    setMemberModalState(true);
  };

  const closeMemberModal = () => {
    setMemberModalState(false);
  };

  React.useEffect(() => {
    challengeApis
      .getOneChallenge(challengeId)
      .then((res) => {
        console.log("한개", res);
        const target = res.data;
        dispatch(targetChallenge(target));
        //헤더&푸터 state
        dispatch(baseAction.setHeader("행성 정보", false));
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
        <Grid padding="0" margin="48px 0 -23px">
          <Grid padding="0" style={{ position: "relative" }}>
            {imageList.length > 0 ? (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                  type: "fraction", //페이지네이션 타입
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {imageList.map((el, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <Image
                        shape="rectangle"
                        padding="250px"
                        src={el ? el : defaultImg}
                      ></Image>
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
            <h1>{target.title}</h1>

            <p className="sub_color mt12">{target.category}</p>
            <Grid padding="0" margin="10px 0">
              {tagList.map((el, i) => {
                return <Tag key={i} tag={el} className="detailPage"></Tag>;
              })}
            </Grid>
          </Grid>

          <Grid bg="#fff" padding="20px">
            <ContentBox>
              <h3>방장</h3>
              <p className="caption">{admin.nickname}</p>
            </ContentBox>
            <ContentBox>
              <h3>개설일</h3>
              <p className="caption">
                {target.startDate.split(" ")[0].split(".").join("-")}
              </p>
            </ContentBox>
            <ContentBox>
              <h3>멤버수</h3>
              <p className="caption">
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
                          key={i}
                          className={admin.userId === el.userId ? "admin" : ""}
                        >
                          <Image
                            shape="border"
                            size="40"
                            level={el.levelName}
                            profile={
                              el.profileImage !== null
                                ? el.profileImage
                                : defaultImg
                            }
                          ></Image>
                        </Member>
                      );
                    })}
                  <MemberBtn onClick={openMemberModal}></MemberBtn>
                </Grid>
              </p>
            </ContentBox>
            <ContentBox>
              <h3>소개글</h3>
              <p className="caption" style={{width:"calc(100% - 90px)"}}>{target.content}</p>
            </ContentBox>
            <ContentBox>
              <h3>공개 여부</h3>
              <p className="caption">{target.isPrivate ? "비밀" : "공개"}</p>
            </ContentBox>              
          </Grid>
          {admin.userId === userInfo ? ( //내가 만든 챌린지
            moment(target.startDate, "YYYY.MM.DD kk:mm:ss").diff(
              moment(),
              "seconds"
            ) > 0 ? ( // 챌린지 시작 하루 전까지 수정/삭제 가능
              <Grid margin="28px 0 0" is_flex>
                <Button
                  line_btn
                  width="calc(50% - 4px)"
                  style={{ color: "#030102", border: "1px solid #666" }}
                  _onClick={() => {
                    deleteModal();
                  }}
                >
                  삭제하기
                </Button>
                <Button
                  width="calc(50% - 4px)"
                  _onClick={() => {
                    history.push(`/challengewrite/${challengeId}`);
                  }}
                >
                  수정하기
                </Button>
              </Grid>
            ) : (
              ""
            )
          ) : (
            //방장 아닌 멤버인 경우
            <Grid>
              <Button
                margin="28px 0 0"
                line_btn
                _onClick={() => {
                  exitModal();
                }}
              >
                행성 나가기
              </Button>
            </Grid>
          )}

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
            open={modalType === "exitModal" ? modalOpen : ""}
            close={closeModal}
            double_btn
            btn_text="나가기"
            _onClick={() => {
              exitChallenge();
            }}
          >
            <p>
              정말로 나가시겠습니까?
              <br />
              중도 하차할 경우 패널티(경험치%손실)가 <br />
              적용됩니다.
            </p>
          </Modal>
        </Grid>
      )}
      <MemberModal state={memberModalState} _handleModal={closeMemberModal}>
        {members &&
          members.map((el, i) => {
            return (
              //만약에 방을 만든 userId와 멤버의 userId가 같은 경우(방장인 경우) className을 붙여준다.
              <MemberBox>
                <Member
                  key={el.userId}
                  className={admin.userId === el.userId ? "admin" : ""}
                >
                  <Image
                    shape="border"
                    size="40"
                    level={el.levelName}
                    profile={
                      el.profileImage !== null ? el.profileImage : defaultImg
                    }
                  ></Image>
                </Member>
                <p>{el.nickname}</p>
              </MemberBox>
            );
          })}
      </MemberModal>
    </>
  );
};

const ContentBox = styled.div`
  display: flex;
  margin-bottom: 14px;
  h3 {
    width: 80px;
    color: #333333;
  }
  p {
    color: #333333;
  }
`;

const Member = styled.div`
  display: inline-block;
  margin-right: 4px;
  &:nth-child(n + 5) {
    //4번째 멤버 이후로는 미노출
    display: none;
  }
  &.admin {
    //방장일 경우
    position: relative;
    margin-right: 4px;
    &::after {
      content: "";
      width: 20px;
      height: 20px;
      background-image: url(${crown});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: absolute;
      bottom: -5px;
      right: -5px;
    }
  }
`;
const MemberBtn = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: solid 1px #a2aab3;
  border-radius: 50%;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${plus});
  background-color: #fff;
  margin-left: 4px;
`;

const MemberBox = styled.div`
  width: 100%;
  display: flex;
  align-content: flex-start;
  margin: 0 15px 10px 0px;
  p {
    margin: 10px 0px 0px 8px;
  }
`;


export default MemberDetail;
