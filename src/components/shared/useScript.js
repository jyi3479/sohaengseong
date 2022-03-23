//카카오톡 공유를 위한 스크립트 (여러곳에서 사용할 수도 있어서 따로 파일 분리)

import { useEffect } from 'react'

const useScript = url => {

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script)
    }

  }, [url])

};

export default useScript;