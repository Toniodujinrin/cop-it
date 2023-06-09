import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { useState } from 'react';
const FilterPanel = ({setFilter})=>{
    const [ value, setValue ] = useState(0); 
   
    const [rangeSliderShowing, setRangeSLiderShowing] = useState(false)
return(
    <div className=" lg:w-[90%] w-full   p-4 flex flex-row items-center  lg:gap-[300px] gap-4 h-[100px] rounded-lg ">
            {/* <div className=" flex  flex-col ">
                <div className="lg:text-[21px] text-[14px] justify-between items-center flex flex-row w-[120px] border border-darkGreen rounded-lg p-2  font-semibold">
                <p className='p-0 m-0'>Price</p> 
                <img onClick={()=>setRangeSLiderShowing(!rangeSliderShowing)} className='w-[20px] h-[20px]' src="../assets/chevron.svg" alt="" />
                </div>
                <div className={`${!rangeSliderShowing&&'hidden'}`}>
                <RangeSlider
      value={value}
      onChange={changeEvent => setValue(changeEvent.target.value)}
    />
            </div></div> */}

            <div className='flex flex-col'>
         
                
              <select  onChange={(e)=>setFilter(e.currentTarget.value)} className="lg:text-[21px] text-[14px] justify-between items-center flex flex-row bg-white border border-darkGreen rounded-lg p-2  font-semibold" id="Sort">
                <option value="low">Price:Low to High</option>
                <option value="high">Price:High to Low</option>
                <option value="high stock">High number in stock</option>
                <option value="low stock">Low number in stock</option>
              </select>
            </div>
    </div>
)
}
export default FilterPanel