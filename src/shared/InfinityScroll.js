
import React, { useCallback } from 'react'
import _ from 'lodash'

const InfinityScroll = (props) => {
    const {children, callNext, is_next, loading} = props;
    
    const _handleScroll = _.throttle(() => {
        if(loading){
            return;
        }
        const {innerHeignt} = window;
        const {scrollHeight} = document.body

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeignt -scrollTop <200) {
            callNext();    
        }
    },300)

    const handleScroll = React.useCallback(_handleScroll,[loading])
    React.useEffect(()=>{
        if(loading){
            return;
        }
        if(is_next){
            window.addEventListener("scroll", handleScroll);
        }else{
            window.removeEventListener('scroll', handleScroll)
        }
        
        return () => window.removeEventListener("scroll", handleScroll)
    },[is_next, loading]);
    
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children :null,
    callNext : () => {},
    is_next : false,
    loading : false,
}

export default InfinityScroll