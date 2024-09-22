"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { db } from "@/firebase";  
import { collection, addDoc } from "firebase/firestore";

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit=async(e: { preventDefault: () => void; })=>{
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        email,
        profilePicture,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="text-[#333333]">
      <Navbar />
      <form onSubmit={handleSubmit }>
      <div className="flex relative">
        <div className="w-0 lg:w-2/3"></div>
        <div className="ml-10 mt-20 w-full lg:w-2/3 h-full mr-20">
          <p className="text-2xl font-bold">Profile Details</p>
          <p className="text-sm mt-1">Add your details below to create a personal touch to your website.</p>


          <div className="mt-10 flex flex-col ">
            <div className="flex items-center mb-4 w-full ">
              <p className="text-left ">Profile Picture</p>
              <div className="flex flex-col md:flex-row ml-10">
              <div className="relative ">
                {profilePicture ? (
                  <div className="relative flex justify-centter items-center">
                    <Image
                      src={profilePicture}
                      alt="Profile"
                      width={48} 
                      height={48}
                      className="w-48 h-48 rounded-md object-cover hover:brightness-75 transition duration-300"
                    />
                    <label className="cursor-pointer text-white p-2 rounded-lg absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-40 ">
                      Change Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-md bg-violet-100 flex items-center justify-center relative">
                    <label className="cursor-pointer text-[#633CFF] p-2 rounded-lg absolute ">
                      + Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              <div>
                <div className="text-center text-xs w-2/3 flex justify-center h-full items-center ml-8">
                Image must be below 1024x1024px. Use PNG or JPG format.
                </div>
                </div>

              </div>
            </div>
            <div className="flex justify-between mb-4 w-full mt-5">
              <label htmlFor="firstName" className="text-left mt-1">First name*</label>
              <input
                type="text"
                id="firstName"
                placeholder="e.g. John"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-lg p-2 w-2/3 ml-10 "
              />
            </div>
            <div className="flex justify-between mb-4 w-full">
              <label htmlFor="lastName" className=" mt-1 text-left">Last name*</label>
              <input
                type="text"
                id="lastName"
                placeholder="e.g. Appleseed"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="border rounded-lg p-2 w-2/3 ml-10"
              />
            </div>
            <div className="flex justify-between mb-4 w-full">
              <label htmlFor="email" className="text-left mt-1">Email</label>
              <input
                type="email"
                id="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg p-2 w-2/3 ml-10 "
              />
            </div>
            
          </div>
        </div>
        
      </div>
      <button type="submit" className="bg-[#633CFF] text-white p-2 px-5 rounded text-semibold absolute right-20 mt-5">
              Save
      </button>
      </form>
    </div>
  );
};

export default ProfilePage;
