// REACT, IMPORTS
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import { FilenameProvider } from "@/pages/product/userContext.js";
// import { useFilename } from "@/pages/product/userContext.js";
import { FilesConnect, useFilename } from "@/pages/product/userContext.js";
import { useRouter } from "next/router";
import styles from "@/styles/editor.module.css";

// LIBRARIES
import Home from "@/pages/product/home.js";

const EditorWidget = dynamic(import("./blockEditor.js"), { ssr: false }); // it will be executed on the client side after the initial page load (working with DOM)

const EditorComponent = () => {
  // const [editor, setEditor] = useState(null);
  const editorInstanceRef = useRef(null);
  // const {filename}  = useFilename;
  const { filenameContext } = useContext(FilesConnect);
  const router = useRouter();
  const { id } = router.query;

  const [fetchedData, setFetchedData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editorDataId, setEditorDataId] = useState("");
  const [fileTitle, setFileTitle] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false)
  const [fileListData, setFileListData] = useState('')

  useEffect(() => {
    if (id) {
      fetch(`/api/mongodb/controllers/FileNameId/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data through id:', data);
          setFileListData(data.fileName)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    console.log('is id useEffect working ?')
  }, [id]);

  const handleSaveToServer = async (data) => {
    // Handle saving data to the server
    // also you can send the data to the server from here
    if (filenameContext !== "") {
      try {
        // const jsonDataPromise = await data; // Call .save() on the instance
        // const jsonData = await jsonDataPromise; // Resolve the Promise to get JSON data

        // console.log(jsonData, "this is json data save server");
        console.log(filenameContext, "in filenameContext");
        const reqBody = {
          filename: filenameContext,
          // time: data.time,
          // blocks: data.blocks,
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
        console.log("you r about to setIsDataChanged to true")
        setIsDataChanged(true);
        // setShowFilteredData(true);
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
        console.log(id, "query id");
        console.log(jsonData, "the jsonData to catch up id");
        const response = await fetch("/api/mongodb/controllers/EditorData", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: filenameContext,
            updatedData: {
              time: jsonData.time,
              blocks: jsonData.blocks,
            },
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
        setInitialData(jsonData);
        console.log("you have entered the fetchandsetData useEffect")
        console.log(jsonData, "this is for setinitialData AGAIN");
        setIsLoading(false);
        // console.log(jsonData, "json data of editor");
        // console.log(fetchedData, "fetchedata is working");
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
      fetchAndSetData();
  }, [isDataChanged]);

  useEffect(() => {
    async function fetchFileListData() {
      try {
        const res = await fetch("/api/mongodb/controllers/DashFiles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // setFileTitle(data);
        console.log(data, "filename dahsfiles data in editor");
      } catch (error) {
        console.log("Error in fetchData useEffect:", error);
      }
    }
    fetchFileListData();
  }, []);

  const handleReady = (editorInstance) => {
    // new DragDrop(editor);
    // setEditor(editorInstanceRef);
    editorInstanceRef.current = editorInstance;
  };

  const filteredData = initialData.map((item) => item.filename)
  // .filter((filename) => filename === filenameContext);

  return (
    <>
      {/* <FilenameProvider> */}
      <div className="flex">
        <div className="w-1/5">
          <Home />
        </div>
        <div className="w-4/5">
    
          {console.log(filteredData, "filteredData is this")}
          {console.log(filenameContext, "filename context")}
          {/* {console.log(
            initialData
            .map((item) => item.filename)
            .filter((filename) => filename === filenameContext),
            "initialData mapped and now filtering"
          )} */}

          <img src="/coverPage.png" className={styles.coverPage} />

          <h1 className={styles.heading} contentEditable={true}>
            {filenameContext}
          </h1>

          <button
            id="save-btn"
            onClick={handleSaveToServer}
            className="text-white"
          >
            Save
          </button>

          {
            initialData
              .filter((item) => item.filename === filenameContext)
              .map((filteredItem) => (
                <div key={filteredItem.filename}>
                  {isLoading ? (
                    <p>loading...</p>
                  ) : (
                    <EditorWidget
                      // style={{ marginTop: "20px" }}
                      // onSave={handleSaveToServer}
                      onReady={handleReady}
                      fetchedData={fetchedData}
                      initialData={initialData}
                      handleUpdateToServer={handleUpdateToServer}
                    />
                  )}
                </div>
              ))
              }

        </div>
      </div>
      {/* </FilenameProvider> */}
    </>
  );
};

export default EditorComponent;
