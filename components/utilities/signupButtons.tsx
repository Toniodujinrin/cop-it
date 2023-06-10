interface SignUpButtonsProps{
    onClick: any
    loading:boolean
    text:string
}

const SignUpButton:React.FC<SignUpButtonsProps> = ({onClick, loading,text})=>{
    return(
        <button
            disabled={loading}
              className="w-full h-[50px] rounded-md bg-forestGreen text-white font-semibold "
              onClick={onClick}
            >{
              loading?
              <div className="spinnerSmall"></div>
              :
              <p>Submit</p>
            }
            </button>
    )

}

export default SignUpButton