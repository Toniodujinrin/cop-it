import { SignUpContext } from "../../Contexts/SignUpContext";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  const signUpContext = useContext(SignUpContext);
  const { emailVerified, accountVerified, firstSignUp } =
    useContext(SignUpContext);
  console.log(emailVerified, accountVerified, firstSignUp);

  const [items, setItems] = useState([
    {
      header: "Register email and passwords",
      text: "Please provide your email and set a good password",
      identifier: "firstSignUp",
      completed: false,
    },
    {
      header: " Verify email",
      text: "Please provide your email and set a good password",
      identifier: "emailVerified",
      completed: false,
    },
    {
      header: "Set your details ",
      text: "Please provide your email and set a good password",
      identifier: "accountVerified",
      completed: false,
    },
  ]);
  useEffect(() => {
    const _items = [...items];
    _items.forEach((item) => {
      item.completed = signUpContext[item.identifier];
      console.log(signUpContext[item.identifier]);
      console.log(item);
    });
    setItems(_items);
  }, [emailVerified, accountVerified, firstSignUp]);
  return (
    <div className="h-full w-[40%] lg:flex pl-4 pt-4 hidden flex-col space-y-2 bg-[#446348]">
      {items.map((item, index) => (
        <div className="flex flex-row space-x-4 ">
          <div className="flex flex-col space-y-1 items-center">
            <div
              className={`w-[30px] flex justify-center items-center ${
                item.completed && "bg-[#e0dcdc]"
              } h-[30px] rounded-full border-[#e0dcdc] border-2`}
            >
              {!item.completed ? (
                <div
                  className={`w-[10px] ${
                    item.completed && "hidden"
                  } h-[10px] rounded-full bg-[#dfe6e0]`}
                ></div>
              ) : (
                <img src="../../assets/check.svg" alt="" />
              )}
            </div>

            <div
              className={`w-[3px] rounded-t-md rounded-b-md ${
                index == items.length - 1 && "hidden"
              } h-[50px] bg-[#e0dcdc]`}
            ></div>
          </div>
          <div className="">
            <h1 className="text-[#e0dcdc] text-[18px]">{item.header}</h1>
            <p className="text-[14px] text-[#e0dcdc]">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
