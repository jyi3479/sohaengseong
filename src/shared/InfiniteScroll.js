import React from "react";

const InfiniteScroll = (props) => {
    const Size = 5; // 한 번 요청으로 가져올 게시글의 개수 
    const getScrollTop = function () { 
        return (window.pageYOffset !== undefined) ? window.pageYOffset 
        : (document.documentElement || document.body.parentNode || document.body).scrollTop; 
    }; 
    const getDocumentHeight = function () { 
        const body = document.body; 
        const html = document.documentElement; 
        return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ); 
    }; 

    const onscroll = function () { 
        if (getScrollTop() === getDocumentHeight() - window.innerHeight) {
            const articleCards = document.querySelectorAll('.article-card'); 
            const lastArticleId = Array.from(articleCards).map(function (card) { 
            return parseInt(card.id, 10); }).reduce(function (previous, current) { 
                return previous > current ? current : previous; 
            }); // 현재 DOM에 그려진 게시물 중 가장 작은 id 값을 추려낸다. 
            //dispatch(); // Axios 로직 실행 
        } 
    };

    return(
        <></>
    );
};

export default InfiniteScroll;