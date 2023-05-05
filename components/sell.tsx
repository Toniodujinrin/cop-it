import { useState, useEffect, useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputGroup from "./inputGroup";
import FileUpload from "./fileUpload";
import Joi from "joi";
import { ProductsContext } from "./../Contexts/ProductsContexts";
const SellComp = () => {
  const { postProduct } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amountInStock, setAmountInStock] = useState("0");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [errors, setErrors] = useState({
    description: "",
    category: "",
    price: "",
    amountInStock: "",
    name: "",
  });

  const handleSell = () => {
    const Schema = Joi.object({
      description: Joi.string().required().label("Description"),
      category: Joi.string().required().label("Category"),
      price: Joi.number().required().min(0.1).label("Price"),
      amountInStock: Joi.number().required().min(1).label("Amount"),
      name: Joi.string().required().label("Product Name"),
    });

    const errorsObject = Schema.validate(
      {
        description,
        category,
        price: parseInt(price),
        amountInStock: parseInt(amountInStock),
        name,
      },
      { abortEarly: false }
    );
    const temporaryErrorObject = {
      description: "",
      category: "",
      price: "",
      amountInStock: "",
      name: "",
    };
    if (errorsObject.error) {
      errorsObject.error?.details.forEach((detail) => {
        if (
          Object.keys(temporaryErrorObject).includes(detail.path[0].toString())
        ) {
          const path: string = detail.path[0].toString();
          temporaryErrorObject[
            path as keyof {
              description: string;
              category: string;
              price: string;
              amountInStock: string;
              name: string;
            }
          ] = detail.message;
        }
      });
      let errorsArray: string[] = [];
      errorsObject.error?.details.forEach((error) =>
        errorsArray.push(error.path[0].toString())
      );
      Object.keys(temporaryErrorObject).forEach((error) => {
        if (!errorsArray.includes(error)) {
          temporaryErrorObject[
            error as keyof {
              description: string;
              category: string;
              price: string;
              amountInStock: string;
              name: string;
            }
          ] = "";
        }
      });

      setErrors(temporaryErrorObject);
    } else {
      setErrors(temporaryErrorObject);

      const payload = {
        description: description,
        name: name,
        category: category,
        numberInStock: parseInt(amountInStock),
        price: parseInt(price),
        files: files,
      };

      postProduct(payload);
    }
  };

  const handleChange = (file: File) => {
    setFiles([...files, file]);
  };

  const uploadFile = (_files: FileList | null) => {
    if (_files) {
      const file = _files[0];
      setFiles([...files, file]);
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
            errors={errors.name}
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
            </select>
            <small className=" text-red-500">{errors.category}</small>
          </div>

          <InputGroup
            value={amountInStock}
            label={"Amount in Stock"}
            type="number"
            errors={errors.amountInStock}
            setValue={setAmountInStock}
          />
          <InputGroup
            value={price}
            label={"Price"}
            type="number"
            errors={errors.price}
            setValue={setPrice}
          />
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
          <small className=" text-red-500">{errors.description}</small>
        </div>
        <div className="mt-4 flex flex-col ">
          <label className="text-darkGreen font-semibold">
            Upload Product Images
          </label>{" "}
          <FileUploader
            children={<FileUpload uploadFile={uploadFile} />}
            handleChange={handleChange}
          />
          <div className="grid grid-cols-3 w-full mt-4 gap-[20px]">
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
            onClick={() => {
              handleSell();
            }}
            className={`w-[170px] p-2  my-[20px] items-center border-2 
           
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
