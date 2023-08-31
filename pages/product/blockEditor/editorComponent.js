// REACT, IMPORTS
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import { FilenameProvider } from "@/pages/product/userContext.js";
// import { useFilename } from "@/pages/product/userContext.js";
import { FilesConnect, useFilename } from "@/pages/product/userContext.js";

// LIBRARIES
import Home from "@/pages/product/home.js";

const EditorWidget = dynamic(import("./blockEditor.js"), { ssr: false }); // it will be executed on the client side after the initial page load (working with DOM)

const EditorComponent = () => {
  // const [editor, setEditor] = useState(null);
  const editorInstanceRef = useRef(null);
  // const {filename}  = useFilename;
  const { filenameContext } = useContext(FilesConnect);

  const [fetchedData, setFetchedData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editorDataId, setEditorDataId] = useState("");

  const handleSaveToServer = async (data) => {
    // Handle saving data to the server
    // also you can send the data to the server from here
    if (data) {
      try {
        // const jsonDataPromise = await data; // Call .save() on the instance
        // const jsonData = await jsonDataPromise; // Resolve the Promise to get JSON data

        // console.log(jsonData, "this is json data save server");
        console.log(filenameContext, "in filenameContext");
        const reqBody = {
          filename: filenameContext,
          time: data.time,
          blocks: data.blocks,
        };

        const response = await fetch("/api/mongodb/controllers/EditorData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });

        const dataWhy = await response.json();
        console.log("Response from server:", dataWhy);
      } catch (error) {
        console.error("Error saving document", error);
      }
    }
  };

  const handleUpdateToServer = async (data) => {
    if (data) {
      try {
        const jsonDataPromise = await data;
        const jsonData = await jsonDataPromise;
        console.log(jsonData, "the jsonData is here");
        const response = await fetch("/api/mongodb/controllers/EditorData", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: jsonData.id,
            // updatedData: {
            //   time: Date.now(),
            //   blocks: jsonData.blocks,
            // },
            jsonData: jsonData,
          }),
        });

        const responseData = await response.json();
        console.log("Response from server:", responseData);
      } catch (error) {
        console.error("Error saving document", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        const editorFileId = await id;
      } catch (error) {}
    }
  };

  useEffect(() => {
    async function fetchAndSetData() {
      try {
        const response = await fetch("/api/mongodb/controllers/EditorData", {
          method: "GET",
        });
        const jsonData = await response.json();
        setFetchedData(jsonData);
        // console.log(fetchedData[0].blocks[0].data.text, "fetch data state zoomed in")
        setInitialData(jsonData);
        setIsLoading(false);
        console.log(jsonData, " json data");
        console.log(fetchedData, "fetchedata is working");
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchAndSetData();
  }, []);

  const handleReady = (editorInstance) => {
    // new DragDrop(editor);
    // setEditor(editorInstanceRef);
    editorInstanceRef.current = editorInstance;
  };

  return (
    <>
      {/* <FilenameProvider> */}
      <div className="flex">
        <div className="w-1/5">
          <Home />
        </div>
        <div className="w-4/5">
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <EditorWidget
              // style={{ marginTop: "20px" }}
              onSave={handleSaveToServer}
              onReady={handleReady}
              fetchedData={fetchedData}
              initialData={initialData}
              handleUpdateToServer={handleUpdateToServer}
            />
          )}
        </div>
      </div>
      {/* </FilenameProvider> */}
    </>
  );
};

export default EditorComponent;
