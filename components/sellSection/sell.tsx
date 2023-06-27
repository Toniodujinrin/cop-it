import { useState, useContext, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputGroup from "../inputGroup";
import FileUpload from "./fileUpload";
import Joi from "joi";
import { ProductsContext } from "../../Contexts/ProductsContexts";
import GreenButton from "../utilities/greenButton";
import { useRouter } from "next/router";
import BackButton from "../utilities/backButton";
import SellInputFields from "./inputFields";
import FileUploadComp from "./fileUploadComp";
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
  const[isAvailble, setIsAvailble]= useState(0)
  const productId = router.query.productId
  const [errors, setErrors] = useState({
    description: "",
    category: "",
    price: "",
    amountInStock: "",
    name: "",
    file: "",
  });
  
  const handleIsAvailable = (value:any)=>{
   
    isAvailble === 0 ?setIsAvailble(1):setIsAvailble(0)
    
  }
  useEffect(()=>{
    console.log()
  },[isAvailble])

  useEffect(()=>{
    if(productId){
      getProduct(productId)
    }
    else{
      
    }
   
  },[productId])
  useEffect(()=>{
  if(product && productId){
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
        productId:productId,
        isAvailable:true
      };

      if(productId){
        payload.isAvailable = isAvailble?true:false
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
      <div className="w-full p-4">
      <BackButton/>
      </div>
      <div className="lg:w-[60%] w-[80%] h-[800px] flex flex-col   ">
        <h1 className="text-darkGreen text-[32px] font-bold mb-6 ">{productId?'Edit':'Sell'}</h1>
         <SellInputFields isAvailable={isAvailble} handleIsAvailable={handleIsAvailable} productId={productId} name={name} nameErrors={errors.name} setName={setName} setCategory={setCategory} categoryErrors={errors.category} amountInStock={amountInStock} setAmountInStock={setAmountInStock} price={price} amountInStockErrors={errors.amountInStock} priceErrors={errors.price} setPrice={setPrice} description={description} descriptionErrors={errors.description} setDescription={setDescription}/>
        {!productId &&

          <FileUploadComp uploadFile={uploadFile} removeFile={removeFile} handleChange={handleChange} fileDetails={fileDetails} fileErrors={errors.file} file={file}  />
        }
        <div className="w-full  pb-4 flex items-end justify-end">
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
