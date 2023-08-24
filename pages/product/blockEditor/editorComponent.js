// REACT, IMPORTS 
import React from "react";
import {useState, useEffect, useRef} from "react"
import dynamic from "next/dynamic";

// LIBRARIES
import Home from "@/pages/product/home.js";

const EditorWidget = dynamic(import("./blockEditor.js"), { ssr: false }); // it will be executed on the client side after the initial page load (working with DOM)

const EditorComponent = () => {
  // const [editor, setEditor] = useState(null);
  const editorInstanceRef = useRef(null);
const [allData, setAllData] = useState("")

  // const handleSaveToServer = async (data) => {
  //   // Handle saving data to the server
  //   // also you can send the data to the server from here
  //   if (editorInstanceRef.current) {
  //     console.log(editorInstanceRef, "this is editcomponent")
  //     try {
  //       const jsonData = await editorInstanceRef.current.save();
  //       const response = await fetch("/api/mongodb/controllers/EditorData", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(jsonData),
  //       }); 

  //       const dataJson = await response.json();
  //       console.log("Response from server:", dataJson);
  //     } catch {
  //       console.error("Error saving document", error);
  //     }
  //   }

  //   console.log("EditorJS data:", data);
  // };

  const handleSaveToServer = async (data) => {
    // Handle saving data to the server
    // also you can send the data to the server from here
    if (data) {
      try {
        const jsonDataPromise = await data; // Call .save() on the instance
        const jsonData = await jsonDataPromise; // Resolve the Promise to get JSON data
  
        console.log(jsonData, 'this is json data save server');
  
        const response = await fetch("/api/mongodb/controllers/EditorData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        });
  
        const dataWhy = await response.json();
        console.log("Response from server:", dataWhy);
      } catch (error) {
        console.error("Error saving document", error);
      }
    }
  

  };
  


  const handleReady = (editorInstance) => {
    // new DragDrop(editor);
    // setEditor(editorInstanceRef);
    editorInstanceRef.current = editorInstance;
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/5">
          <Home />
        </div>
        <div className="w-4/5">
          <EditorWidget
            // style={{ marginTop: "20px" }}
            onSave={handleSaveToServer}
            onReady={handleReady}
          />
        </div>
      </div>
    </>
  );
};

export default EditorComponent;
