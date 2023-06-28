import { useState, useContext, useEffect } from "react"
import NavBar from "../../components/navBar"
import ProfileComp from "../../components/profileSection/profileComp"
import SearchBar from "../../components/searchBar"
import UserCard from "../../components/utilities/userCard"
import { UserContext } from "../../Contexts/UserContext"
import { FullUser, User } from "../../types"

const Profiles = ()=>{
    const[value,setValue]= useState('')
    const {searchLoading, searchedProfiles, searchProfile}= useContext(UserContext)
    const handleSearch= ()=>{
        searchProfile(value)
    }
    useEffect(()=>{
      searchProfile(value)
    },[value])

    return(
        <>
        <NavBar hideSearchBar={true}/>
        <div className="lg:hidden p-4">
        <SearchBar value={value} setValue={setValue} handleSearch={handleSearch} placeholder={'Search Users'}/>
        </div>
        
        <div  className="w-full lg: p-4 lg:mt-0 mt-6 hidden lg:flex items-center bg-forestGreen h-[70px]">
        <img
        className="w-[25px] h-[25px]"
        src="../../assets/searchIconWhite.svg"
        alt=""
        />
            <input value={value} onChange={(e)=>setValue(e.currentTarget.value)} placeholder="Search for a profile" className="bg-transparent focus:outline-none border-none outline-none placeholder:text-white text-white w-full p-3 " onKeyUp={(e)=>{ if(e.key == 'Enter')handleSearch()}} type="text" name="" id="" />
        </div>
      

        <div className="w-full h-full  lg:h-[calc(100vh-100px)] flex flex-col items-center  ">
            {
               searchLoading?
              <div className="spinner"></div>
              :
              searchedProfiles.length>0?
              <div className="lg:grid gap-4 grid-cols-4 mt-[50px] flex flex-col ">
                {
                    searchedProfiles.map((profile:FullUser, index:number)=>(
                        
                       <UserCard key={index} email={profile.email} fullName={`${profile.firstName} ${profile.lastName}`} imageUrl={profile.imageConfig.url}  />
                    ))
                    
                    }

              </div>
              :
              <div className="flex h-full flex-col gap-4 items-center justify-center">
                 <img className="lg:w-[200px] aspect-square w-[150px]" src="../assets/magnifyingGlass.svg" alt="" />
                 <p className=" lg:text-[21px] text-[18px] ">No Profile Found</p>
              </div>
               
            }

        </div>
        </>
    )
}

export default Profiles