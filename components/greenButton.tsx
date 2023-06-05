
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
          className={`w-[170px] ${disabled?'bg-slate-500':'bg-forestGreen border-forestGreen '} p-2 mt-[20px] items-center border-2 
           
         
          
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