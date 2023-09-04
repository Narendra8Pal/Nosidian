// REACT, IMPORTS
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import { FilenameProvider } from "@/pages/product/userContext.js";
// import { useFilename } from "@/pages/product/userContext.js";
import { FilesConnect, useFilename } from "@/pages/product/userContext.js";
import { useRouter } from "next/router";

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
  // useEffect(() => {
  //   if (id) {
  //     fetch(`/api/mongodb/controllers/EditorData/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('Fetched data through id:', data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //       });
  //   }
  // }, [id]);

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
        console.log(id, "query id")
        console.log(jsonData, "the jsonData to catch up id");
        const response = await fetch("/api/mongodb/controllers/EditorData", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: filenameContext,
            updatedData: {
              time: Date.now(),
              blocks: jsonData.blocks[0],
            },
            // jsonData: jsonData,
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
        console.log(jsonData, 'this is for setinitialData')
        setIsLoading(false);
        console.log(jsonData, " json data of editor");
        // console.log(fetchedData, "fetchedata is working");
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchAndSetData();
  }, []);

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
        setFileTitle(data);
        console.log(data, "filename data in editor");
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

  // const filteredData = initialData.filter(
  //   (item) => item.filename === filenameContext
  // );



  return (
    <>
      {/* <FilenameProvider> */}
      <div className="flex">
        <div className="w-1/5">
          <Home />
        </div>
        <div className="w-4/5">
          {/* {filteredData.map((data) => (
            <div key={data.filename}> */}

{initialData &&
  initialData
    .filter((item) => item.blocks.filename === filenameContext)
    .map((item) => (
      <div key={item.id}>
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
        ))}

            {/* </div>
          ))} */}
        </div>
      </div>
      {/* </FilenameProvider> */}
    </>
  );
};

export default EditorComponent;
