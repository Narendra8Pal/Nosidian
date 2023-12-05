// REACT, IMPORTS
import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import { FilesConnect } from "../../userContext.js";
import { useRouter } from "next/router";
import styles from "@/styles/editor.module.css";

// LIBRARIES
import Home from "@/pages/product/home.js";
const EditorWidget = dynamic(import("./blockEditor.js"), { ssr: false }); // it will be executed on the client side after the initial page load (working with DOM)

const EditorComponent = () => {
  const editorInstanceRef = useRef(null);
  const {
    filenameContext,
    setFilenameContext,
    updateEditorFilename,
    setUpdateEditorFilename,
    deleteEditorFilename,
    setDeleteEditorFilename,
    setSelectedEditorFileId,
    setEditorIdFetched,
  } = useContext(FilesConnect);

  const router = useRouter();
  const { id } = router.query;

  const [fetchedData, setFetchedData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editorDataId, setEditorDataId] = useState("");
  const [fileTitle, setFileTitle] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [filenameToUpdate, setFilenameToUpdate] = useState("");
  const [deleteEditorFileId, setDeleteEditorFileId] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_FILE_NAME_ID}?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFilenameContext(data.fileName);
          setFilenameToUpdate(data.fileName);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      setSelectedEditorFileId(id);
      setEditorIdFetched(true);
    }
  }, [id]);

  const handleSaveToServer = async (data) => {
    if (filenameContext !== "") {
      try {
        const reqBody = {
          filename: filenameContext,
        };

        const response = await fetch(process.env.NEXT_PUBLIC_EDITOR_DATA, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        const dataWhy = await response.json();
        // console.log("Response from server:", dataWhy);
        // console.log("you r about to setIsDataChanged to true");
        setIsDataChanged(true);
        // setShowFilteredData(true);
      } catch (error) {
        // console.error("Error saving document", error);
      }
    }
  };

  const handleUpdateToServer = async (data) => {
    if (data) {
      try {
        const jsonDataPromise = await data;
        const jsonData = await jsonDataPromise;
        // console.log(id, "query id");
        // console.log(jsonData, "the jsonData to catch up id");
        const response = await fetch(process.env.NEXT_PUBLIC_EDITOR_DATA, {
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
        // console.log("Response from server:", responseData);
        setIsDataChanged(true);
      } catch (error) {
        console.error("Error saving document", error);
      }
    }
  };

  useEffect(() => {
    const handleUpdateToEditor = async () => {
      const reqBody = {
        filename: filenameToUpdate,
        updatedFileName: filenameContext,
      };
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_FILE_NAME_ID, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });

        const responseData = await response.json();
        // console.log("Response from server:", responseData);
        setIsDataChanged(true);
        setUpdateEditorFilename(false);
      } catch (error) {
        // console.error("Error saving document", error);
      }
    };
    handleUpdateToEditor();
  }, [updateEditorFilename]);

  useEffect(() => {
    const handleDeleteEditor = async () => {
      await handleDelete();
      // console.log(deleteEditorFileId, "it is deleteEditorFileId");
      const reqBody = {
        _id: deleteEditorFileId,
      };
      try {
        await fetch(process.env.NEXT_PUBLIC_EDITOR_DATA, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });

        const updatedFileList = initialData.filter(
          (file) => file._id !== deleteEditorFileId
        );
        if (updatedFileList.length === initialData.length - 1) {
          router.push({
            pathname: `/product/home`,
          });
        }
        setInitialData(updatedFileList);
        setDeleteEditorFilename(false);
      } catch (err) {
        // console.log("Error in handleDelete:", err);
      }
    };
    handleDeleteEditor();
  }, [deleteEditorFilename]);

  useEffect(() => {
    async function fetchAndSetData() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_EDITOR_DATA, {
          method: "GET",
        });
        const jsonData = await response.json();
        setFetchedData(jsonData);
        setInitialData(jsonData);
        setIsLoading(false);
        setIsDataChanged(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    fetchAndSetData();
  }, [isDataChanged]);

  const handleDelete = async () => {
    initialData
      .filter((files) => files.filename === filenameToUpdate)
      .map((filteredFiles) => {
        setDeleteEditorFileId(filteredFiles._id);
      });
  };

  useEffect(() => {
    async function fetchFileListData() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DASH_FILES, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // setFileTitle(data);
        // console.log(data, "filename dahsfiles data in editor");
      } catch (error) {
        // console.log("Error in fetchData useEffect:", error);
      }
    }
    fetchFileListData();
  }, []);

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
          {/* cover page functionality  */}
          {/* <Image
            src="/coverPage.png"
            className={styles.coverPage}
            width={1536}
            height={256}
            alt=""
            priority={true}
          /> */}

          <h1
            className={styles.heading}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {filenameContext}
          </h1>

          <button
            id="save-btn"
            onClick={handleSaveToServer}
            className={styles.btn}
          >
            Save Title
          </button>

          {/* {initialData
            .filter((item) => item.filename === filenameContext)
            .map((filteredItem) => (
              <div key={filteredItem.filename}>
                {isLoading ? (
                  <p className="flex text-white">loading...</p>
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
            ))} */}
        </div>
      </div>
    </>
  );
};

export default EditorComponent;
