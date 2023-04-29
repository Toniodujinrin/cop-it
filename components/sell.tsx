import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputGroup from "./inputGroup";
import FileUpload from "./fileUpload";
const SellComp = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amountInStock, setAmountInStock] = useState("0");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (file: File) => {
    setFiles([...files, file]);
  };
  const uploadFile = (_files: FileList | null) => {
    if (_files) {
      const file = _files[0];
      setFiles([...files, file]);
      const formData = new FormData();
      formData.append(file.name, file, file.name);
    }
  };
  const removeFile = (fileName: string) => {
    const _files = [...files];
    setFiles(_files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="w-full p-8 flex justify-center ">
      <div className="lg:w-[60%] w-[80%] h-[800px] flex flex-col   ">
        <h1 className="text-darkGreen text-[32px] font-bold mb-6 ">Sell</h1>
        <div className=" flex flex-col w-full lg:grid grid-cols-2 mb-4 gap-4 items-center ">
          <InputGroup
            value={name}
            label="Product Name"
            errors=""
            type="text"
            setValue={setName}
          />
          <div className="w-full">
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
            </select>
          </div>

          <InputGroup
            value={amountInStock}
            label={"Amount in Stock"}
            type="number"
            errors=""
            setValue={setAmountInStock}
          />
          <InputGroup
            value={price}
            label={"Price"}
            type="number"
            errors=""
            setValue={setPrice}
          />
        </div>
        <div className="w-full flex flex-col space-y-2">
          <label className="text-darkGreen font-semibold">Description</label>
          <textarea
            value={description}
            className={
              "border focus:outline-none p-2 bg-white border-[#5A5353] rounded-md resize-none w-full h-[140px]"
            }
            placeholder="Type in a meaningfull description of what you want to sell"
          ></textarea>
        </div>
        <div className="mt-4 flex flex-col ">
          <label className="text-darkGreen font-semibold">
            Upload Product Images
          </label>{" "}
          <FileUploader
            children={<FileUpload uploadFile={uploadFile} />}
            handleChange={handleChange}
          />
          <div className="grid grid-cols-4 w-full mt-4 gap-[20px]">
            {files.map((file) => (
              <div
                className="w-[200px] flex justify-between bg-forestGreen rounded-lg p-2 text-white
              "
              >
                <p> {file.name}</p>
                <img
                  onClick={() => removeFile(file.name)}
                  className="w-[30px] h-[30px] cursor-pointer items-center"
                  src="../assets/close-white.svg"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex items-end justify-end">
          <button
            className={`w-[170px] p-2 mt-[20px] items-center border-2 
           
         bg-forestGreen border-forestGreen 
          
           text-white cursor-pointer  rounded-[20px]`}
          >
            <p>Sell</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellComp;
