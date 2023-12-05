//NEXT, REACT
import React from "react";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
//styles, files
import styles from "@/styles/home.module.css";
import ModelStyles from "@/styles/modal.module.css";
import Modal from "../components/Modal";
import { FilesConnect } from "../userContext.js";
//libraries
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const [currentFileName, setCurrentFileName] = useState({});
  const [fileNameToUpdate, setFileNameToUpdate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [cookUserId, setCookUserId] = useState("");
  const [layout, setLayout] = useState("");
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [deleteFileId, setDeleteFileId] = useState("");
  const [showDefaultPg, setShowDefaultPg] = useState(true);
  const [createdFileNameId, setCreatedFileNameId] = useState("");
  const [createdFileNameLayout, setCreatedFileNameLayout] = useState("");
  const [updateServerFilename, setUpdateServerFilename] = useState("");

  const {
    filenameContext,
    setFilenameContext,
    setUpdateEditorFilename,
    setDeleteEditorFilename,
    selectedEditorFileId,
    editorIdFetched,
    setEditorIdFetched,
  } = useContext(FilesConnect);
  const router = useRouter();

  // const openModal = (e) => {
  //   setIsOpen(true);
  // };

  const handleIcons = (selectedLayout) => {
    setLayout(selectedLayout);
    setIsOpen(true);
  };
  // const openEditModal = () => {
  //   setIsEditing(true);
  // };

  const handleSelectedFileName = (fileId, layout) => {
    setHoveredId(fileId);
    setSelectedFileId(fileId);
    if (layout === "block") {
      router.push({
        pathname: process.env.NEXT_PUBLIC_EDITOR_COMPONENT,
        query: { id: fileId },
      });
    } else if (layout === "canvas") {
      router.push({
        pathname: process.env.NEXT_PUBLIC_CANVAS,
        query: { id: fileId },
      });
    }
  };

  useEffect(() => {
    const fetchingEditorFileId = () => {
      if (selectedEditorFileId) {
        setHoveredId(selectedEditorFileId);
        setSelectedFileId(selectedEditorFileId);
      }
      setEditorIdFetched(false);
    };
    fetchingEditorFileId();
  }, [selectedFileId, editorIdFetched]);

  const handleTitleInputChange = (e) => {
    setFileName(e.target.value);
    //setFilenameContext(e.target.value); // passing it to blockEditor &editorComponent
  };

  const createFile = async () => {
    setShowDefaultPg(false);
    if (fileName !== "") {
      const reqBody = {
        fileName: fileName.trim(),
        userId: cookUserId,
        layout: layout,
      };
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_DASH_FILES, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });

        const fileData = await res.json();
        console.log("fetchData:", fileData);
        // console.log("req body:", reqBody);
        setCreatedFileNameId(fileData._id);
        setCreatedFileNameLayout(fileData.layout);
        // setFileList((prevFileList) => [
        //   ...prevFileList,
        //   {
        //     _id: reqBody._id,
        //     fileName: reqBody.fileName,
        //   },
        // ]);
        setIsOpen(!isOpen);
        setFileName("");
        fetchData();
        setFilenameContext(fileName); // in inputchange it was (filename) visible under the modal
        // console.log(filenameContext, "filename context");
        // console.log(fileList, "this list from createfile func");
      } catch (error) {
        // console.log(error, "err in try catch shiva");
      }
    } else {
      alert("err in create file shiva");
    }
  };

  // useeffect for adding "id" do the pathname after file is created
  useEffect(() => {
    // console.log(createdFileNameId, "useeffect fileid");
    if (createdFileNameId && createdFileNameLayout == "block") {
      router.push({
        pathname: `/product/blockEditor/editorComponent`,
        query: { id: createdFileNameId },
      });
    } else if (createdFileNameId && createdFileNameLayout == "canvas") {
      router.push({
        pathname: `/product/canvas/canvas`,
        query: { id: createdFileNameId },
      });
    }
  }, [createdFileNameId]);

  const fetchData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_DASH_FILES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setFileList(data);
      // console.log(data, "coming from fetchData");
    } catch (error) {
      // console.log("Error in fetchData useEffect:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCookie = async () => {
    try {
      const response = await fetch("/api/components/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const user = await response.json();
      // console.log(user);
      setCookUserId(user.userId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleCookie();
  });

  const handleTitleEditChange = (e) => {
    setCurrentFileName({ ...currentFileName, fileName: e.target.value });
  };

  const handleEdit = async (files) => {
    setIsEditing(true);
    setCurrentFileName({ ...files });
    setFileNameToUpdate(files.fileName);
  };

  const handleUpdateFileName = async () => {
    const reqBody = {
      fileName: fileNameToUpdate,
      updatedFileName: currentFileName.fileName,
    };
    try {
      await fetch(process.env.NEXT_PUBLIC_DASH_FILES, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      setIsEditing(false);
      setUpdateEditorFilename(true);
      setFilenameContext(reqBody.updatedFileName);
      // setUpdateServerFilename(reqBody.updatedFileName)
      fetchData();
    } catch (error) {
      // console.log(error, "error in updating the file name in client");
    }
  };

  const updateFile = (e) => {
    e.preventDefault();
    handleUpdateFileName();
  };

  const handleDelete = (_id) => {
    setIsDelete(!isDelete);
    setDeleteFileId(_id);
  };

  const handleDeleteFileName = async () => {
    const reqBody = {
      _id: deleteFileId,
    };
    try {
      await fetch(process.env.NEXT_PUBLIC_DASH_FILES, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const updatedFileList = fileList.filter(
        (file) => file._id !== deleteFileId
      );
      setFileList(updatedFileList);
      setDeleteEditorFilename(true);
      setIsDelete(false);
      // console.log("File deleted successfully");
    } catch (err) {
      // console.log("Error in handleDelete:", err);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="" alt="motion-v2 logo" />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />

      {isOpen && (
        <Modal
          fileName={fileName}
          setIsOpen={setIsOpen}
          handleTitleInputChange={handleTitleInputChange}
          createFile={createFile}
        />
      )}

      {isEditing && (
        <div>
          <div
            className={ModelStyles.darkBG}
            onClick={() => setIsEditing(false)}
          />
          <div className={ModelStyles.centered}>
            <div className={ModelStyles.modal}>
              <div className={ModelStyles.modalHeader}>
                <h5 className={ModelStyles.heading}>create a file</h5>
                <button
                  className={ModelStyles.closeBtn}
                  onClick={() => setIsEditing(false)}
                >
                  close
                </button>
              </div>
              <div className={ModelStyles.modalContent}>
                <div className={ModelStyles.title}>
                  <div className={ModelStyles.title}>Type File Name</div>
                  <input
                    type="text"
                    value={currentFileName.fileName}
                    onChange={handleTitleEditChange}
                    placeholder="how to be fast"
                  />
                </div>
              </div>
              <div className={ModelStyles.submit}>
                <button className={ModelStyles.btn} onClick={updateFile}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDelete && (
        <div className={ModelStyles.centered}>
          <div className={ModelStyles.modal}>
            <h1 className={ModelStyles.modalHeader}>Caution</h1>
            <p>
              are you sure you want to delete the file {filenameContext}? This
              step cannot be undone.
            </p>

            <div className={ModelStyles.twoBtns}>
              <button onClick={handleDelete} className={ModelStyles.closeBtn}>
                {" "}
                {/*handleDelete handles the usestate hook*/}
                cancel
              </button>
              <button
                onClick={handleDeleteFileName}
                className={ModelStyles.deleteBtn}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.leftPane}>
        <div className={styles.innerPane}>
          <div className={styles.icons}>
            <Image
              width={28}
              height={28}
              src="/create.png"
              alt=""
              value="block"
              onClick={() => handleIcons("block")}
              priority={true}
            />
            <Image
              width={28}
              height={28}
              src="/flow.png"
              alt=""
              value="canvas"
              onClick={() => handleIcons("canvas")}
              priority={true}
            />
          </div>
        </div>

        <div className={styles.mainPane}>
          {fileList &&
            fileList
              .filter((files) => files.userId === cookUserId)
              .map((files) => (
                <div
                  className={`${styles.nameBox} ${
                    selectedFileId === files._id
                      ? styles.selected
                      : hoveredId === files._id
                  }`}
                  key={files._id}
                  // onMouseEnter={() => setHoveredId(files._id)}
                  // onMouseLeave={() => setHoveredId(null)}
                  onClick={() =>
                    handleSelectedFileName(files._id, files.layout)
                  }
                >
                  <div className={styles.mainContent}>
                    <p>{files.fileName}</p>
                  </div>

                  {hoveredId === files._id && (
                    <div className={styles.iconsHover}>
                      <Image
                        width={16}
                        height={16}
                        src="/edit.png"
                        alt=""
                        onClick={() => handleEdit(files)}
                      />
                      <Image
                        width={16}
                        height={16}
                        src="/delete.png"
                        alt=""
                        onClick={() => handleDelete(files._id)}
                      />
                    </div>
                  )}
                </div>
              ))}
          <div className={styles.nameBoxEmpty}></div>
        </div>
      </div>

      {/* default page to show before the layout*/}
      {/* {showDefaultPg && (
        <div className={styles.defaultPage}>
          <div className={styles.defaultBox}>
            <div className={styles.layouts}>
              <div className={styles.canvasBox}>
                <div className={styles.canvasImg}>
                  <Image
                    src="/createCanvas.png"
                    alt=""
                    className={styles.layoutsIcons}
                  />
                </div>
                <p>enjoy making mind maps</p>
              </div>
              <div className={styles.flowBox}>
                <div className={styles.flowImg}>
                  <Image src="/flow.png" alt="" className={styles.layoutsIcons} />
                </div>
                <p>enjoy making blocks</p>
              </div>
            </div>
            <p className={styles.layoutsPara}>
              Explore all the available tools , create a canvas or a block
              editor file and get going
            </p>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Home;
