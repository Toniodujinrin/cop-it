import InputGroup from "../../components/inputGroup";
import SignUpBar from "../../components/SignUpBar";
import { useState, useContext } from "react";
import Joi from "joi";
import { SignUpContext } from "../../Contexts/SignUpContext";

const Verify = () => {
  const { processAccountVerification } = useContext(SignUpContext);
  const Schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    address: Joi.string().required().label("Address"),
    phone: Joi.string().required().label("Phone Number"),
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errorsObject = Schema.validate(
      { firstName, lastName, address, phone },
      { abortEarly: false }
    );
    if (errorsObject.error) {
      const temporaryErrorObject = {
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
      };
      errorsObject.error?.details.forEach((detail) => {
        if (
          Object.keys(temporaryErrorObject).includes(detail.path[0].toString())
        ) {
          const path: string = detail.path[0].toString();
          temporaryErrorObject[
            path as keyof {
              lastName: string;
              firstName: string;
              phone: string;
              address: string;
            }
          ] = detail.message;
        }
      });
      let errorsArray: string[] = [];
      errorsObject.error?.details.forEach((error) =>
        errorsArray.push(error.path[0].toString())
      );
      Object.keys(temporaryErrorObject).forEach((error) => {
        if (!errorsArray.includes(error)) {
          temporaryErrorObject[
            error as keyof {
              lastName: string;
              firstName: string;
              phone: string;
              address: string;
            }
          ] = "";
        }
      });

      setErrors(temporaryErrorObject);
    } else {
      const payload = {
        lastName: lastName,
        firstName: firstName,
        phone: phone,
        address: address,
      };
      await processAccountVerification(payload);
    }
  };
  return (
    <SignUpBar>
      <section className="flex flex-col mt-[50px] h-screen  lg:w-[60%] items-center w-full  ">
        <div>
          <img
            src="../assets/logog2.svg"
            className="w-[60px] h-[60px] "
            alt=""
          />
        </div>
        <h1 className="text-[28px] mt-[30px] text-darkGreen font-semibold ">
          Create an Account{" "}
        </h1>

        <form className="lg:w-[700px]   pt-[40px] space-y-4" action="">
          <div className="w-full h-auto flex  lg:grid grid-cols-2 lg:justify-items-start justify-center">
            <InputGroup
              value={firstName}
              setValue={setFirstName}
              errors={errors.firstName}
              label="First Name"
              type="string"
            />
            <InputGroup
              value={lastName}
              setValue={setLastName}
              errors={errors.lastName}
              type={"string"}
              label={"Last Name"}
            />
            <InputGroup
              value={phone}
              setValue={setPhone}
              errors={errors.phone}
              type={"string"}
              label={"Phone"}
            />
          </div>
          <InputGroup
            value={address}
            setValue={setAddress}
            type={"text"}
            errors={errors.address}
            label={"Address"}
          />
          <div className="w-full flex flex-col items-center">
            <button
              className="w-[400px] h-[50px] rounded-md bg-forestGreen text-white font-semibold "
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </SignUpBar>
  );
};

export default Verify;
