import BackButton from "./backButton"
import InputGroup from "./inputGroup"
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import PhoneInputComp from "./inputGroup/phoneInput";
import AddressInput from './inputGroup/addressInput'

const CheckOutComp = ()=>{
  const {user,refreshUserAndNotRoute}= useContext(UserContext)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  console.log(user)
  
  useEffect(() => {
    refreshUserAndNotRoute()
    
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
      setPhone(user.phone)
      setAddress(user.address)
    } 
  }, [user]);
  
    return(
        <div className="p-4 flex flex-col lg:flex-row ">
          <section className=" w-full lg:w-[60%] flex items-center flex-col">
            <div className="w-full">
            <BackButton/>
            <h1 className=" mt-4 text-[36px] text-darkGreen font-semibold">Checkout</h1>
            <div className=" mt-8">
            <p className="text-[21px] font-semibold">Contact Information</p>
            <div className="flex flex-col w-full items-center lg:grid grid-cols-2 justify-items-start gap-6 mt-8">
            <InputGroup type="string" errors="" label="FirstName" value={firstName} setValue={setFirstName} />
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
          

            </div>
            </div>


            <div className="mt-8">
            <p className="text-[21px] font-semibold">Delivery Information</p>
            <div className="flex flex-col items-start gap-6 mt-8">
              {
                user.address?
                <InputGroup type="string" label="Address" value={address} setValue={setAddress} errors={''}/>
 :
 <AddressInput errors="" label="Address" value={address} setValue={setAddress}/>

              }
            
            </div>
            </div>

            <div className="mt-8">
            <p className="text-[21px] font-semibold">Payment Information</p>
             <div className="w-[200px]  mt-4 justify-between h-[50px] p-2 flex flex-row items-center border shadow-lg border-forestGreen">
              <img src="../assets/paypal.svg" className="w-[30px] h-[30px]" alt="" />
              <div className="w-[30px] h-[30px] flex items-center justify-center border border-forestGreen rounded-full">
              <div className="rounded-full p-0 m-0 w-[20px] bg-forestGreen h-[20px] border "></div></div>
             </div>
            </div>
            </div>
          </section>
          <section className="w-full lg:w-[40%] flex items-center justify-center ">
             <div className="w-[80%] shadow-lg border border-lightGray rounded-[18px] flex flex-col items-center p-4">
               <h1 className="text-[24px] font-semibold ">36 Items</h1>

               <div className="w-[80%] flex flex-row justify-between items-center ">
                <p className="font-bold">Total</p>
                <p className="text-[32px]">$499</p>
               </div>

               <button className="w-[200px]  flex items-center justify-center border p-2 bg-forestGreen ">
                <p className="text-white">Pay</p>
               </button>
             </div>
          </section>
        </div>
    )
}
export default CheckOutComp 