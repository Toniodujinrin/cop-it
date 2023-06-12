import { useContext, useState } from "react";
import { BasketContext } from "../../Contexts/BasketContext";
import { Product } from "../../types";
import CartItem from "./cartItem";
import DeletePopUp from "../utilities/deletePopUp";
import GreenButton from "../utilities/greenButton";
import { CheckoutContext } from "../../Contexts/CheckoutContext";
import { Basket } from "../../types";
const BasketComp = () => {
  const {createCheckout} = useContext(CheckoutContext)
  const { basket, removeItemFromBasket } = useContext(BasketContext);
  const [id, setId] = useState("");
  const [popUpShowing, setPopUpShowing] = useState(false);
  const [selected,setSelect]= useState<string[]>([])
  const [loading, setLoading]= useState(false)
  const handleSelect = (productId:string)=>{
    let _selected = [...selected]
    if(selected.includes(productId)){
      _selected = _selected.filter(id => id !== productId)
      setSelect(_selected)
    }
    else{
      _selected.push(productId)
      setSelect(_selected)
    }

  }
  const handleCheckout = async ()=>{
   
    const checkedOut = basket.filter((item:Basket) =>  selected.includes(item.product._id))
    const payload = {
     products : checkedOut
    }
    setLoading(true)
    await createCheckout(payload)
    setLoading(false)

  }
  const handleDelete = async () => {
    const payload = {
      productId: id,
    };
    await removeItemFromBasket(payload);
  };

  return (
    <div className="mx-auto  lg:w-[70%]">
      <h1 className="font-bold text-[32px] ml-2 mb-4 ">My Basket</h1>

      <div className="w-full p-4 flex items-center justify-center">
        {basket.length > 0 ? (
          popUpShowing ? (
            <DeletePopUp
              setPopUpShowing={setPopUpShowing}
              handleDelete={handleDelete}
            />
          ) : (
            <div className="flex flex-col gap-2 w-full items-center ">
              {basket.map((item: Basket, index:number) => (
                
                  

                  <CartItem key={index} productId={item.product._id} name={item.product.name}
                    selected={selected}
                    handleSelect={handleSelect}
                     imageUrl={item.product.imageConfig[0].url}
                     amount={item.amount}
                     price ={item.product.price}
                     setProductId={setId}
                     setDeleteAction={setPopUpShowing}
                  />
                
              ))}
             <div className="w-full">
             <GreenButton disabled={selected.length==0} onCLick={()=>{handleCheckout()}} text='Check Out' loading={loading}/>
             </div>
            </div>
          )
        ) : (
          <div
            className=" flex flex-col h-[600px] justify-center items-center space-y-4
          "
          >
            <img
              className="w-[200px] h-[200px]"
              src="../assets/emptyBasket.svg"
              alt=""
            />
            <h1 className="text-forestGreen text-[24px] font-semibold">
              Basket Empty
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketComp;