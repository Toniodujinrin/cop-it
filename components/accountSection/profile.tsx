import InputGroup from "./../inputGroup/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./../../Contexts/UserContext";
import WebcamCapture from "./../webcam";
import { useRouter } from "next/router";

const Profile = ({}) => {
  const { user, refreshUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user._id);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [changeDetected, setChangeDetected] = useState(true);
  const [webcam, setWebCam] = useState(false);
  const router = useRouter();
   refreshUser()
  useEffect(() => {
    if (
      firstName !== user.firstName ||
      lastName !== user.lastName ||
      email !== user._id ||
      phone !== user.phone ||
      address !== user.address
    ) {
      setChangeDetected(true);
    } else setChangeDetected(false);
  }, [firstName, lastName, email, phone, address]);

  return (
    <div className="flex justify-content items-center">
      {webcam ? (
        <WebcamCapture setWebCam={setWebCam} />
      ) : (
        <div className="w-full">
          <div
            className="border-darkGreen ml-4 border
       rounded-full w-[200px] h-[200px] flex flex-col overflow-hidden "
          >
            <img
              onClick={() => router.push(`/profile?email=${email}`)}
              className="h-[90%] object-cover"
              src={user.imageConfig ? user.imageConfig.url : ""}
              alt=""
            />
            <div
              className="bg-darkGreen h-[20%] flex justify-center items-end w-full
         "
            >
              <img
                onClick={() => setWebCam(true)}
                src="../assets/camera.svg"
                className="w-[30px] cursor-pointer h-[30px] pb-2"
                alt=""
              />
            </div>
          </div>
          <div className=" flex flex-col lg:grid grid-cols-2 p-4  gap-[20px] ">
            <InputGroup
              label="First Name"
              value={firstName}
              setValue={setFirstName}
              errors=""
              type="string"
            />
            <InputGroup
              label="Last Name"
              value={lastName}
              setValue={setLastName}
              errors=""
              type="string"
            />
            <InputGroup
              label="Email"
              value={email}
              setValue={setEmail}
              errors=""
              type="string"
            />
            <InputGroup
              label="Phone Number"
              value={phone}
              setValue={setPhone}
              errors=""
              type="string"
            />
            <InputGroup
              label="Address"
              value={address}
              setValue={setAddress}
              errors=""
              type="string"
            />
            <div></div>

            <button
              disabled={!changeDetected}
              className={`w-[170px] p-2 mt-[20px] items-center border-2 ${
                changeDetected
                  ? `bg-forestGreen border-forestGreen `
                  : `bg-slate-500`
              }  text-white cursor-pointer  rounded-[20px]`}
            >
              <p>Save</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
