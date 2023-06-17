import { Dispatch, SetStateAction } from "react";
import InputGroup from "../inputGroup";
interface SellInputFieldsProps {
    name:string
    nameErrors:string
    setName:Dispatch<SetStateAction<string>>
    setCategory:Dispatch<SetStateAction<string>>
    categoryErrors:string
    amountInStock:string
    setAmountInStock:Dispatch<SetStateAction<string>>
    price:string
    amountInStockErrors:string
    priceErrors:string
    setPrice:Dispatch<SetStateAction<string>>
    description:string
    descriptionErrors:string
    setDescription:Dispatch<SetStateAction<string>>
    productId:string|undefined|string[]
    isAvailable:number
    handleIsAvailable:(val:any)=>void
    
}


const SellInputFields:React.FC<SellInputFieldsProps> = ({
    name,nameErrors,isAvailable, handleIsAvailable, setName, amountInStockErrors, setCategory, setAmountInStock, setPrice, setDescription,  description, descriptionErrors, priceErrors, categoryErrors, price, amountInStock, productId})=>{
    return(
        <>
        <div className=" flex flex-col w-full lg:grid grid-cols-2 mb-4 gap-4 items-center ">
        <InputGroup
          value={name}
          label="Product Name"
          errors={nameErrors}
          type="text"
          setValue={setName}
        />
        <div className="w-full flex-col">
          <label className="text-darkGreen font-semibold">Category</label>
          <select
            className="border focus:outline-none bg-white border-[#5A5353] h-[42px] w-full p-2 rounded-lg"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
            }}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Fitness">Fitness</option>
            <option value="Games">Games</option>
            <option value="Shoes">Shoes</option>
            <option value="Stationary">Stationary</option>
            <option value="Furniture"></option>
            <option value="Books">Books</option>
          </select>
          <small className=" text-red-500">{categoryErrors}</small>
        </div>

        <InputGroup
          value={amountInStock}
          label={"Amount in Stock"}
          type="number"
          errors={amountInStockErrors}
          setValue={setAmountInStock}
        />
        <InputGroup
          value={price}
          label={"Price"}
          type="number"
          errors={priceErrors}
          setValue={setPrice}
        />
        {

         productId&&
        <div className="flex w-full flex-col gap-3">
        <label className="text-[#9c9c9c] focus:text-forestGreen text-[16px] font-semibold">{'Available'}</label>
        <label className="switch">
         <input value={isAvailable} onChange={(e)=>{handleIsAvailable(e.currentTarget.value)}} type="checkbox"/>
         < span className="slider round"></span>
         </label>
        </div>
        }
      </div>
    
      <div className="w-full flex flex-col space-y-2">
        <label className="text-darkGreen font-semibold">Description</label>
        <textarea
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
          value={description}
          className={
            "border focus:outline-none p-2 bg-white border-[#5A5353] rounded-md resize-none w-full h-[140px]"
          }
          placeholder="Type in a meaningfull description of what you want to sell"
        ></textarea>
        <small className=" text-red-500">{descriptionErrors}</small>
      </div>
      </>
    )
}

export default SellInputFields