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
        <div className="w-full flex flex-col items-center mt-[50px]">
        <SearchBar handleSearch={handleSearch} value={value} setValue={setValue} placeholder="search for a profile"/>
        </div>

        <div className="w-full flex flex-col items-center h-full ">
            {
               searchLoading?
              <div className="spinner"></div>
              :
              searchedProfiles.length>0?
              <div className="lg:grid gap-4 grid-cols-4 mt-[50px] ">
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