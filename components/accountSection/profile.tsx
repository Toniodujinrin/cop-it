import InputGroup from "./../inputGroup/index";
import { useState, useEffect } from "react";
interface ProfileProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;

  email: string;
}

const Profile: React.FC<ProfileProps> = ({
  firstName,
  lastName,
  phoneNumber,
  email,
}) => {
  const [_firstName, setFirstName] = useState(firstName);
  const [_lastName, setLastName] = useState(lastName);
  const [_email, setEmail] = useState(email);
  const [_phoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [_address, setAddress] = useState("");
  const [changeDetected, setChangeDetected] = useState(true);
  useEffect(() => {
    if (
      _firstName !== firstName ||
      _lastName !== lastName ||
      _email !== email ||
      _phoneNumber !== phoneNumber
    ) {
      setChangeDetected(true);
    } else setChangeDetected(false);
  }, [_firstName, _lastName, _email, _phoneNumber]);

  return (
    <div>
      <div
        className="border-darkGreen ml-4 border
       rounded-full w-[200px] h-[200px] flex flex-col overflow-hidden "
      >
        <img
          className="h-[90%] object-cover"
          src="../assets/hackthon_winner.png"
          alt=""
        />
        <div
          className="bg-darkGreen h-[20%] flex justify-center items-end w-full
         "
        >
          <img
            src="../assets/camera.svg"
            className="w-[30px] cursor-pointer h-[30px] pb-2"
            alt=""
          />
        </div>
      </div>
      <div className=" flex flex-col lg:grid grid-cols-2 p-4  gap-[20px] ">
        <InputGroup
          label="First Name"
          value={_firstName}
          setValue={setFirstName}
          errors=""
          type="string"
        />
        <InputGroup
          label="Last Name"
          value={_lastName}
          setValue={setLastName}
          errors=""
          type="string"
        />
        <InputGroup
          label="Email"
          value={_email}
          setValue={setEmail}
          errors=""
          type="string"
        />
        <InputGroup
          label="Phone Number"
          value={_phoneNumber}
          setValue={setPhoneNumber}
          errors=""
          type="string"
        />
        <InputGroup
          label="Address"
          value={_address}
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
  );
};

export default Profile;
