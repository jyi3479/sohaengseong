import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const WarningText = (props) => {
  const text = useSelector((state) => state.user.setwarning.text);
  const detail = useSelector((state) => state.user.setwarning.detail);
  if (detail) {
    return (
      <React.Fragment>
        <Wraps>
          <p className="small fail_color">{text}</p>
        </Wraps>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
    </React.Fragment>
  );
};

WarningText.defaultProps = {
  detail: false,
};

const Wraps = styled.div`
    margin-top: 4px;
`

export default WarningText