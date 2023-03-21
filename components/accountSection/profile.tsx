import InputGroup from "./../inputGroup/index";
import { useState } from "react";
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

  return (
    <div className=" flex flex-col lg:grid grid-cols-2 p-4  space-x-[20px] ">
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

      <button className="w-[170px] p-2 mt-[20px] items-center border-2 bg-forestGreen text-white border-forestGreen rounded-[20px]">
        <p>Save</p>
      </button>
    </div>
  );
};

export default Profile;
