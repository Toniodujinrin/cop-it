import React, { useState } from "react";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState("");
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);
  return (
    <div className="flex flex-col w-full items-center">
      <div className=" p-4 bg-slate-200 mb-4 flex items-center flex-col rounded-[20px]  w-[400px] ">
        {image ? (
          <div className="w-[300px] h-[300px]">
            <img className="w-full h-full" src={image} alt="" />
          </div>
        ) : (
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints}
          />
        )}

        <div className="flex flex-row items-center mt-4 justify-evenly space-x-4">
          <button
            className="border border-2 rounded-full  border-white w-[50px] flex justify-center items-center  h-[50px]"
            onClick={capture}
          >
            <div className="w-[40px] h-[40px] bg-white rounded-full"></div>
          </button>
          <div>
            <label className="bg-white rounded-[20px] p-2" htmlFor="file">
              Upload
            </label>
            <input id="file" className="hidden" type="file" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
