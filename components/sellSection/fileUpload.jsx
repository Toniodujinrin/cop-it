const FileUpload = ({ uploadFile }) => {
  return (
    <div className=" bg-slate-200 border-[3px] h-[300px] border-dashed border-darkGreen flex flex-col items-center justify-center">
      <label className="cursor-pointer" htmlFor="fileUpload">
        <img src="../assets/cloud.svg" className="w-[50px] h-[50px]" alt="" />
      </label>
      <input
        onChange={(e) => {
          uploadFile(e.currentTarget.files);
        }}
        className="hidden"
        id="fileUpload"
        type="file"
      />
      <p className="text-darkGreen font-semibold">Supported Files: JPEG, PNG</p>
    </div>
  );
};

export default FileUpload;
