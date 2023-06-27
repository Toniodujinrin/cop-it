
interface GreenButtonProps{
    onCLick:any
    text:string
    loading:boolean
    disabled:boolean
}

const GreenButton:React.FC<GreenButtonProps> =({onCLick, text, loading, disabled})=>{
    return(
        <button
        disabled={disabled}
          onClick={onCLick}
          className={`lg:w-[170px]  w-full ${disabled?'bg-mediumGray':'bg-forestGreen border-forestGreen '} p-2 mt-[20px] items-center border-2 
           
         
          
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