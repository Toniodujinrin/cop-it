import { useState, useContext, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputGroup from "../inputGroup";
import FileUpload from "./fileUpload";
import Joi from "joi";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import GreenButton from "../utilities/greenButton";
import { useRouter } from "next/router";
import BackButton from "../utilities/backButton";
const SellComp = () => {
  const { postProduct, productsProcessLoading, product, getProduct, editProduct } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [amountInStock, setAmountInStock] = useState("0");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [fileDetails, setFileDetails] = useState<File | null>();
  const router = useRouter()
  const productId = router.query.productId
  const [errors, setErrors] = useState({
    description: "",
    category: "",
    price: "",
    amountInStock: "",
    name: "",
    file: "",
  });

  useEffect(()=>{
    getProduct(productId)
  },[productId])
  useEffect(()=>{
  if(product){
    setName(product.name)
    setCategory(product.category)
    setPrice(product.price)
    setDescription(product.description)
    setAmountInStock(product.numberInStock)
    setFile('ii')
  }
  },[product])

  const handleProcess = async () => {
    const Schema = Joi.object({
      description: Joi.string().required().label("Description"),
      category: Joi.string().required().label("Category"),
      price: Joi.number().required().min(0.1).label("Price"),
      amountInStock: Joi.number().required().min(1).label("Amount"),
      name: Joi.string().required().label("Product Name"),
      file: Joi.string().min(2).required().label("Product Image"),
    });

    const errorsObject = Schema.validate(
      {
        description,
        category,
        price: parseInt(price),
        amountInStock: parseInt(amountInStock),
        name,
        file,
      },
      { abortEarly: false }
    );
    const temporaryErrorObject = {
      description: "",
      category: "",
      price: "",
      amountInStock: "",
      name: "",
      file: "",
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
              file: string;
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
              file: string;
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
        file: file,
        productId:productId
      };

      if(productId){
        
        editProduct(payload)

      }
      else{
         postProduct(payload);
      }
     
    }
  };

  const handleChange = (file: File) => {
    if (file) {
      setFileDetails(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result == "string") setFile(reader.result);
      };
    }
  };

  const uploadFile = (_files: FileList | null) => {
    if (_files) {
      setFileDetails(_files[0]);
      console.log(fileDetails);
      const reader = new FileReader();
      reader.readAsDataURL(_files[0]);
      reader.onloadend = () => {
        if (typeof reader.result == "string") setFile(reader.result);
      };
    }
  };
  const removeFile = () => {
    setFile("");
    setFileDetails(null);
  };

  return (
    <div className="w-full lg:p-8 flex-col items-center  flex justify-center ">
      <div className="w-full">
      <BackButton/>
      </div>
      <div className="lg:w-[60%] w-[80%] h-[800px] flex flex-col   ">
        <h1 className="text-darkGreen text-[32px] font-bold mb-6 ">{productId?'Edit':'Sell'}</h1>
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
        {!productId &&
        <div className="mt-4 flex flex-col ">
          <label className="text-darkGreen font-semibold">
            Upload Product Images
          </label>{" "}
          <FileUploader
            children={<FileUpload uploadFile={uploadFile} />}
            handleChange={handleChange}
          />
          <small className="text-red-500">{errors.file}</small>
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
        }
        <div className="w-full flex items-end justify-end">
          {
            !productId?
            <GreenButton
            disabled={productsProcessLoading}
            onCLick={()=>{handleProcess()}}
            text='Sell'
            loading={productsProcessLoading}
           />
           :
           <GreenButton disabled={productsProcessLoading} onCLick={()=>{handleProcess()}} text='Edit' loading={productsProcessLoading}/>
          }


        </div>
      </div>
    </div>
  );
};

export default SellComp;
