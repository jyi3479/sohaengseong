import React from "react";
import { InputBox, ImageLabel, ImgBox } from "../../styles/ChallengeWriteStyle";
import { Image } from "../../elements";

//heic 이미지 파일을 jpeg로 변환하는 라이브러리
import heic2any from "heic2any";
// 이미지 압축 라이브러리
import imageCompression from "browser-image-compression";

import plus from "../../image/icon/ic_plus_g@2x.png";
import defaultImg from "../../image/ic_empty_s@2x.png";

const ImageUpload = React.memo(({ image, setImage, preview, setPreview, compareImage, setCompareImage, isEdit }) => {
  const [isWarning, setIsWarning] = React.useState(false);

  // 이미지 업로드 부분 ----------------------------------------------------------------------------
  const fileInput = React.useRef();
  const selectFile = async (e) => {
    // 이미지 resize 옵션 설정
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
    };

    let fileArr = fileInput.current.files;
    let fileURLs = []; // preview 담을 배열
    let files = []; // image 담을 배열

    let file; // 임시 변수
    let filesLength;

    const maxSize = 20 * 1024 * 1024; // 파일 용량 제한 (20MB)

    setIsWarning(false); // 업로드 마다 용량 초과 파일 있는지 확인을 위해, 초기화

    if (isEdit) {
      filesLength = 3 - compareImage.length; // 이미지 3장 제한
    } else {
      filesLength = fileArr.length > 3 ? 3 : fileArr.length; // 이미지 3장 제한
    }

    // 다중 선택된 이미지 file 객체들을 반복문을 돌리며 preview와 image 배열에 추가하기
    for (let i = 0; i < filesLength; i++) {
      if (
        fileArr[i].name.split(".")[1] === "gif" ||
        fileArr[i].name.split(".")[1] === "GIF" ||
        fileArr[i].name.split(".")[1] === "heic" ||
        fileArr[i].name.split(".")[1] === "HEIC"
      ) {
        file = fileArr[i];
      } else {
        file = await imageCompression(fileArr[i], options);
      }
      if (file.size > maxSize) {
        console.log("파일 사이즈가 20MB를 넘습니다.");
        setIsWarning(true); // 용량 초과 파일 하나라도 있으면 true
      } else {
        let reader = new FileReader();
        if (file.name.split(".")[1] === "heic" || file.name.split(".")[1] === "HEIC") {
          let blob = file;
          // blob에다가 변환 시키고 싶은 file값을 value로 놓는다.
          // toType에다가는 heic를 변환시키고싶은 이미지 타입을 넣는다.
          heic2any({ blob: blob, toType: "image/jpeg" })
            .then(function (resultBlob) {
              //file에 새로운 파일 데이터를 씌웁니다.
              file = new File([resultBlob], file.name.split(".")[0] + ".jpg", {
                type: "image/jpeg",
                lastModified: new Date().getTime(),
              });
              reader.readAsDataURL(file);
              reader.onload = () => {
                // 읽기가 끝나면 발생하는 이벤트 핸들러.
                fileURLs.push(reader.result);
                // 미리보기 state에 저장
                setPreview([...preview, ...fileURLs]);
              };
              // 이미지 state에 저장
              if (file) {
                files.push(file);
                setImage([...image, ...files]);
              }
            })
            .catch(function (err) {
              console.log("이미지 변환 오류", err);
            });
        } else {
          // 파일 내용을 읽어온다.
          reader.readAsDataURL(file);
          reader.onload = () => {
            // 읽기가 끝나면 발생하는 이벤트 핸들러.
            fileURLs.push(reader.result);
            // 미리보기 state에 저장
            setPreview([...preview, ...fileURLs]);
          };
          // 이미지 state에 저장
          if (file) {
            files.push(file);
            setImage([...image, ...files]);
          }
        }
      }
    }

    e.target.value = ""; // 같은 파일 upload를 위한 처리
  };
  // 업로드한 이미지 삭제 함수
  const deleteImage = (index) => {
    const previewArr = preview.filter((el, idx) => idx !== index);
    setPreview([...previewArr]);

    // 수정일 때, 기존 이미지 배열과 새로운 이미지 배열 모두 고려해야 함
    let compareArr = [];
    let imageArr = [];
    if (index < compareImage.length) {
      // 1) 삭제 이미지가 기존 이미지 배열 안에 있을 때, compareImage에서 지우기
      compareArr = compareImage.filter((el, idx) => idx !== index);
      setCompareImage([...compareArr]);
    } else {
      // 2) 삭제 이미지가 새로운 이미지 배열 안에 있을 때, image에서 지우기
      imageArr = image.filter((el, idx) => idx !== index - compareImage.length);
      setImage([...imageArr]);
    }
  };

  return (
    <InputBox>
      <p style={{ fontSize: "16px", margin: "0px 0px 2px" }}>
        사진을 첨부해주세요. <span className="sub_color font14">(최대 3건)</span>
      </p>
      <p className="small sub_color">첫번째 이미지가 대표 이미지로 등록됩니다. (최대 20MB)</p>
      <div
        style={{
          position: "relative",
        }}
      >
        {preview.map((el, idx) => {
          return (
            <ImgBox key={idx}>
              <Image shape="rectangle" src={preview[idx] ? preview[idx] : defaultImg} />
              <button onClick={() => deleteImage(idx)}></button>
            </ImgBox>
          );
        })}
        {preview.length < 3 && (
          <ImageLabel className="input-file-button" htmlFor="input-file">
            <img
              src={plus}
              style={{
                width: "32px",
                margin: "20px 0px 0px",
              }}
            ></img>
          </ImageLabel>
        )}
        {isWarning && (
          <p className="fail_color caption" style={{ position: "absolute" }}>
            첨부 가능한 용량을 초과합니다. 20MB 이하의 파일을 올려주세요.
          </p>
        )}
      </div>

      <input
        id="input-file"
        type="file"
        onChange={selectFile}
        ref={fileInput}
        // disabled={is_uploading}
        multiple // 다중 업로드 가능
        //accept="image/*" // 이미지에 해당하는 모든 파일 허용 (JPG,JPEG,GIF,PNG 제한?)
        style={{ display: "none" }}
      />
    </InputBox>
  );
});

export default ImageUpload;
