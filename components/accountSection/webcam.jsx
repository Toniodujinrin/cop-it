import React, { useState, useContext } from "react";
import Webcam from "react-webcam";
import { UserContext } from "../../Contexts/UserContext";
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = ({ setWebCam }) => {
  const { uploadUserImage } = useContext(UserContext);
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleBrowse = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleUpload = async () => {
    const payload = {
      image: image,
    };
    try {
      setLoading(true);
      await uploadUserImage(payload);
    } catch (error) {
    } finally {
      setLoading(false);
      setWebCam(false);
    }
  };
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);
  return (
    <div className="flex flex-col w-full lg:p-0 p-4  items-center">
      <div className=" p-4 bg-slate-200 mb-4 flex items-center flex-col rounded-[20px] w-full  lg:w-[400px] ">
        <div className="w-full mb-2   flex justify-end">
          <img
            onClick={() => {
              setWebCam(false);
            }}
            className="w-[30px] cursor-pointer h-[30px]"
            src="../assets/close.svg"
            alt=""
          />
        </div>
        {image ? (
          <div className="w-[300px] h-[245.45px]">
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
          {loading ? (
            <div className="spinnerSmallBlack"></div>
          ) : (
            <div className="flex flex-row items-center mt-4 justify-evenly space-x-4">
              {image ? (
                <button
                  onClick={() => setImage(null)}
                  className="bg-white rounded-[20px] p-2"
                >
                  Retake
                </button>
              ) : (
                <button
                  className=" border-2 rounded-full  border-white w-[50px] flex justify-center items-center  h-[50px]"
                  onClick={capture}
                >
                  <div className="w-[40px] h-[40px] bg-white rounded-full"></div>
                </button>
              )}
              {image ? (
                <button
                  onClick={() => handleUpload()}
                  className="bg-white rounded-[20px] p-2"
                >
                  Upload
                </button>
              ) : (
                <div>
                  <label className="bg-white rounded-[20px] p-2" htmlFor="file">
                    Browse
                  </label>
                  <input
                    onChange={(e) => {
                      handleBrowse(e.currentTarget.files[0]);
                    }}
                    id="file"
                    className="hidden"
                    type="file"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
