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
        <NavBar/>
        <div  className="w-full p-4 lg:mt-0 mt-6 flex items-center bg-forestGreen h-[70px]">
        <img
        className="w-[25px] h-[25px]"
        src="../../assets/searchIconWhite.svg"
        alt=""
        />
            <input value={value} onChange={(e)=>setValue(e.currentTarget.value)} placeholder="Search for a profile" className="bg-transparent focus:outline-none border-none outline-none placeholder:text-white text-white w-full p-3 " onKeyUp={(e)=>{ if(e.key == 'Enter')handleSearch()}} type="text" name="" id="" />
        </div>
      

        <div className="w-full flex flex-col items-center h-full ">
            {
               searchLoading?
              <div className="spinner"></div>
              :
              searchedProfiles.length>0?
              <div className="lg:grid gap-4 grid-cols-4 mt-[50px] flex flex-col ">
                {
                    searchedProfiles.map((profile:FullUser)=>(
                        
                       <UserCard email={profile.email} fullName={`${profile.firstName} ${profile.lastName}`} imageUrl={profile.imageConfig.url}  />
                    ))
                    
                    }

              </div>
              :
              <div className="flex m-auto flex-col gap-4 items-center">
                 <img className="w-[200px] h-[200px]" src="../assets/magnifyingGlass.svg" alt="" />
                 <p className="text-forestGreen text-[21px] ">No Profile Found</p>
              </div>
               
            }

        </div>
        </>
    )
}

export default Profiles