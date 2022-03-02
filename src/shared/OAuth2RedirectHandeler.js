import React from "react";
import { useDispatch } from "react-redux";
import { ActionCreators as userActions } from "../redux/modules/user";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(async () => {
    await dispatch(userActions.loginBykakao(code));
  }, []);

  return null;
};

export default OAuth2RedirectHandler;
