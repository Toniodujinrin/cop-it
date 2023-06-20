import ProfileComp from "../../components/profileSection/profileComp";
import NavBar from "../../components/navBar/index";
import { useContext } from "react";
import { ProfileContext } from "../../Contexts/ProfileContext";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BackButton from "../../components/utilities/backButton";
const Profile = () => {
  const email = useRouter().query.email;
  const { getEntireProfile, profile } = useContext(ProfileContext);

  useEffect(() => {
    try {
      if (email) {
        getEntireProfile(email);
      }
    } catch (error) {}
  }, [email]);
  return (
    <>
      <NavBar hideSearchBar={false} />;
      <div>
        <div className="ml-4">
          <BackButton/>
        </div>
        {!Object.keys(profile).includes("firstName") ? (
          <div className="spinner"></div>
        ) : (
          <ProfileComp />
        )}
      </div>
    </>
  );
};

export default Profile;
