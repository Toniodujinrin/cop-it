import InputGroup from "./../inputGroup/index";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./../../Contexts/UserContext";
import WebcamCapture from "./webcam";
import { useRouter } from "next/router";
import 'react-phone-number-input/style.css'
import { motion } from "framer-motion";
import PhoneInputComp from "../inputGroup/phoneInput";
import AddressInput from "../inputGroup/addressInput";
import GreenButton from "../utilities/greenButton";
const Profile = ({}) => {
  const { user,  handleLogout, updateUserInfo, userUpdateLoading } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user._id);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [changeDetected, setChangeDetected] = useState(true);
  const [webcam, setWebCam] = useState(false);
  const router = useRouter();
  const handleAccountUpdate = ()=>{
    const payload = {
      firstName :firstName,
      lastName:lastName,
      phone:phone,
      email:email,
      address:address
    }
    updateUserInfo(payload)

  }

   
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
    <motion.div initial={{y:10, opacity:0.8}} animate={{y:0, opacity:1}} className="flex justify-content items-center">
      {webcam ? (
        <WebcamCapture setWebCam={setWebCam} />
      ) : (
        <div className="w-full">
          <div
            className="border-darkGreen lg:ml-4 mx-auto border
       rounded-full w-[200px] h-[200px] flex flex-col overflow-hidden "
          >
            <div className="h-[80%] flex items-center justify-center">
            <img
              onClick={() => router.push(`/profile?email=${email}`)}
              className={` ${user.imageConfig && user.imageConfig.url?  'w-full h-full object-cover':'w-[80%] h-[80%]' } `}
              src={user.imageConfig && user.imageConfig.url ? user.imageConfig.url : "../assets/profilePic.svg"}
              alt=""
            />
            </div>
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
           <PhoneInputComp label='Phone' setValue={setPhone} value={phone} errors={''}/>
            <InputGroup type="string" label="Address" value={address} setValue={setAddress} errors={''}/>
            <div></div>
            

           <GreenButton text="Save" disabled={!changeDetected} loading={userUpdateLoading} onCLick={()=>{handleAccountUpdate()}}/>
       
            <button onClick={()=>handleLogout()} className="flex border-2 rounded-[20px] text-red-600 border-red-600 hover:bg-red-600 transition-[1000ms] hover:text-white bg-white w-full lg:w-[170px] p-2 mt-[20px] items-center  justify-center">
              <p className="m-0 p-0">Log out</p>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
