import { useContext } from "react"
import { BasketContext } from "../../Contexts/BasketContext"

const BasketNotePill = ()=>{
    const {amountInBasket}= useContext(BasketContext);
    return(
        <>
       {amountInBasket > 0 && (
        <div className="bg-forestGreen text-white rounded-[20px] w-[30px] h-[22px] flex items-center font-bold justify-center ">
          <p className="m-0">{amountInBasket}</p>
        </div>
        )}
        </>
    );
};

export default BasketNotePill;