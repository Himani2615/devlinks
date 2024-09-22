"use client";

import React, { useState, ChangeEvent,useEffect } from "react";
import Navbar from "@/components/Navbar";
import { doc, getDoc,addDoc,setDoc } from "firebase/firestore";
import { db,auth } from "@/firebase"; 

interface Link {
  id: number;
  url: string;
  label: string;
}


const Page = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [errors, setErrors] = useState<{ [key: number]: { label: string; url: string } }>({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchLinks(user.uid); // Call fetchLinks when user is authenticated
      } else {
        console.log('No authenticated user.');
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const fetchLinks = async (userId: string) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Fetched data:', data); 
        setLinks(data.links || []); 
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

    const handleAddLink = () => {
      setLinks((prevLinks) => [
        ...prevLinks,
        { id: prevLinks.length > 0 ? prevLinks[prevLinks.length - 1].id + 1 : 1, url: "", label: "" },
      ]);
    };

    const handleDeleteLink = (id: number) => {
      setLinks((prevLinks)=>{
      const updatedLinks=prevLinks.filter((link) => link.id !== id);
      return updatedLinks.map((link, index) => ({ ...link, id: index + 1 }));
    });
  };

    const handleEditLinkLabel = (id: number, value: string) => {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, label: value } : link
        )
      );
      if (value) setErrors({ ...errors, [id]: { ...errors[id], label: "" } });
    };

    const handleEditLinkURL = (id: number, value: string) => {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === id ? { ...link, url: value } : link
        )
      );
      if (value) setErrors({ ...errors, [id]: { ...errors[id], url: "" } });
    };

  const validateLink = (link: Link) => {
    const newErrors = { label: "", url: "" };
    let isValid = true;

    if (!link.label) {
      newErrors.label = "Label can't be empty";
      isValid = false;
    }

    if (!link.url) {
      newErrors.url = "URL can't be empty";
      isValid = false;
    }

    setErrors({ ...errors, [link.id]: newErrors });
    return isValid;
  };

  const handleSave = async () => {
    const validLinks = links.filter(validateLink);
    if (validLinks.length === links.length) {
      const user = auth.currentUser;
  
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, { links: validLinks }, { merge: true }); 
        console.log("Links saved successfully!");
      } else {
        console.log("No authenticated user.");
      }
    } else {
      console.log("Please make sure all links are valid.");
    }
  };
  

  return (
    <div className="text-[#333333]">
      <Navbar />
      <div className="flex min-h-screen relative ">
        <div className="w-0 lg:w-1/2"></div>
        <div className="mx-auto w-2/3 mt-20 h-full ">
          <div className="flex flex-wrap flex-col">
          <p className="text-2xl font-bold">Customize your links</p>
          <p className="text-sm mt-1">
            Add/Edit/Remove Links below and then share all your profiles with
            the world!
          </p>
          </div>

          <div className="mt-5 w-4/5">
            <button
              onClick={handleAddLink}
              className="w-full text-[#633CFF] border-2 border-[#633CFF] p-2 rounded font-semibold"
            >
              + Add new link
            </button>
          </div>


          <>
            {links.length === 0 ? (
              <p className="h-full justify-center flex flex-col mt-5 place-items-center max-w-[460px] xl:ml-32">
                <h1 className="font-bold text-xl mb-5">Let get you started</h1>
                <p>
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </p>
            ) : (
              <ul className="w-full md:w-4/5 mt-10">
                {links.map((link) => (
                  <li
                    key={link.id}
                    className="border p-4 flex justify-between items-center mb-2 px-4 rounded-lg"
                  >
                    <div className="flex-1">
                    <div className="flex w-full">
                    <p className="float-left">{`Link # ${link.id}`}</p>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-sm ml-2 float-right"
                    >
                      Remove
                    </button>
                    </div>
                    
                      <label htmlFor="label" className=" text-xs float-left ml-2 mt-5">Platform</label>
                      <input id="label"
                        type="text"
                        placeholder="Platform"
                        value={link.label}
                        onChange={(e) =>
                          handleEditLinkLabel(link.id, e.target.value)
                        }
                        className={`border rounded w-full p-2 mb-2 ${
                          errors[link.id]?.label ? "border-red-500" : ""
                        }`}
                      />
                      {errors[link.id]?.label && (
                        <p className="text-red-500 text-xs">
                          {errors[link.id].label}
                        </p>
                      )}

                      <label htmlFor="url" className=" text-xs float-left ml-2">Link</label>
                      <input id="url"
                        type="url"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) =>
                          handleEditLinkURL(link.id, e.target.value)
                        }
                        className={`border rounded w-full p-2 mb-2 ${
                          errors[link.id]?.url ? "border-red-500" : ""
                        }`}
                      />
                      {errors[link.id]?.url && (
                        <p className="text-red-500 text-xs">
                          {errors[link.id].url}
                        </p>
                      )}
                    </div>
                    
                  </li>
                ))}
              </ul>
            )}
          
          </>


          <button
          onClick={handleSave}
          className="absolute bottom-20 right-10 mr-10  bg-[#633CFF] text-white p-2 px-5 rounded self-end"
        >
          Save
        </button>
        </div>
        
      </div>
      
    </div>
  );
};

export default Page;
