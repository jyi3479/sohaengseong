import React from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

const ShareLink = () => {
    const currentUrl = window.location.href;
    
    return (
        <>
            <FacebookShareButton style={{ marginRight: "20px" }} url={currentUrl}>
                <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
            </FacebookShareButton>
            <TwitterShareButton style={{ marginRight: "20px" }} url={currentUrl}>
                <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
            </TwitterShareButton>
            <LineShareButton url={currentUrl}>
                <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
            </LineShareButton>
        </>
    )
}

export default ShareLink;