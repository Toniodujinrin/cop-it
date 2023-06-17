import FileUpload from "./fileUpload"
import { FileUploader } from "react-drag-drop-files"
interface FileUploadCompProps{
uploadFile:(_files: FileList | null)=>void
removeFile:()=>void
handleChange:(file:File)=>void
fileDetails:File|null|undefined
fileErrors:string
file:string
}
const FileUploadComp:React.FC<FileUploadCompProps> = ({
    uploadFile, removeFile, handleChange, fileDetails, fileErrors, file
})=>{
  return(
    
         <div className="mt-4 flex flex-col ">
          <label className="text-darkGreen font-semibold">
            Upload Product Images
          </label>{" "}
          <FileUploader
            children={<FileUpload uploadFile={uploadFile} />}
            handleChange={handleChange}
          />
          <small className="text-red-500">{fileErrors}</small>
          {fileDetails && (
            <div
              className="w-full mt-4 flex justify-between bg-forestGreen rounded-lg p-2 text-white
              "
            >
              <img
                className="lg:w-[100px] w-[80px] h-[80px] lg:h-[100px] rounded-lg"
                src={file}
                alt=""
              />
              <p className="lg:text-[18px] text-[14px]"> {`${fileDetails?.name.slice(0,7)}...`}</p>

              <img
                onClick={() => removeFile()}
                className="lg:w-[30px] w-[15px] h-[15px] lg:h-[30px] cursor-pointer items-center"
                src="../assets/close-white.svg"
                alt=""
              />
            </div>
          )}
        </div>
        
  )
}
export default FileUploadComp
