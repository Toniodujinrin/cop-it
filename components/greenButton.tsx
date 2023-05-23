
interface GreenButtonProps{
    onCLick:any
    text:string
    loading:boolean
}

const GreenButton:React.FC<GreenButtonProps> =({onCLick, text, loading})=>{
    return(
        <button
          onClick={onCLick}
          className={`w-[170px] p-2 mt-[20px] items-center border-2 
           
         bg-forestGreen border-forestGreen 
          
           text-white cursor-pointer  rounded-[20px]`}
        >
            { loading?
                <div className="spinnerSmall"></div>
                :
                <p>{text}</p>
            }
          
      </button>
    )
}

export default GreenButton