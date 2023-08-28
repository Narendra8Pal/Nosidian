//NEXT, REACT
import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
//styles, files
import styles from "@/styles/home.module.css";
import ModelStyles from "@/styles/modal.module.css";
import Modal from "../components/Modal";
import { useUser } from "./userContext.js";
//libraries
import { ToastContainer, toast } from "react-toastify";

const home = () => {
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
  const { userId } = useUser();

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

  const handleSelectedFileName = (fileId) => {
    setSelectedFileId(fileId);
  };

  const handleTitleInputChange = (e) => {
    setFileName(e.target.value);
  };

  const createFile = async () => {
    if (fileName !== "") {
      const reqBody = {
        fileName: fileName.trim(),
        userId: cookUserId,
        layout: layout,
      };
      try {
        const res = await fetch("/api/mongodb/controllers/DashFiles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });

        const fileData = await res.json();
        console.log("fetchData:", fileData);
        console.log("req body:", reqBody);
        // setFileList((prevFileList) => [
        //   ...prevFileList,
        //   {
        //     _id: reqBody._id,
        //     fileName: reqBody.fileName,
        //   },
        // ]);

        console.log("you did it thanks shiva");
        setIsOpen(!isOpen);
        setFileName("");
        fetchData();
        console.log(fileList, "this list from createfile func");
      } catch (error) {
        console.log(error, "err in try catch shiva");
      }
    } else {
      alert("err in create file shiva");
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/mongodb/controllers/DashFiles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setFileList(data);
      // console.log(data, "coming from fetchData");
    } catch (error) {
      console.log("Error in fetchData useEffect:", error);
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
      await fetch("/api/mongodb/controllers/DashFiles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.log(error, "error in updating the file name in client");
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
      await fetch("/api/mongodb/controllers/DashFiles", {
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
      setIsDelete(false);
      console.log("File deleted successfully");
    } catch (err) {
      console.log("Error in handleDelete:", err);
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
              are you sure you want to delete the file? This step cannot be
              undone.
            </p>

            <div className={ModelStyles.twoBtns}>
              <button onClick={handleDelete} className={ModelStyles.closeBtn}> {/*handleDelete handles the usestate hook*/}
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
            <img
              src="/flow.png"
              alt=""
              value="canvas"
              onClick={() => handleIcons("canvas")}
            />
            <img
              src="/kanban.png"
              alt=""
              value="board"
              onClick={() => handleIcons("board")}
            />
          </div>
        </div>

        <div className={styles.mainPane}>
          <div className={styles.showPane}>
            <img
              src="/create.png"
              alt=""
              value="block"
              onClick={() => handleIcons("block")}
            />
          </div>

          {fileList &&
            fileList
              .filter((files) => files.userId === cookUserId)
              .map((files) => (
                <div
                  className={`${styles.nameBox} ${
                    selectedFileId === files._id
                      ? styles.selected
                      : hoveredId === files._id
                      ? styles.hovered
                      : ""
                  }`}
                  key={files._id}
                  onMouseEnter={() => setHoveredId(files._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleSelectedFileName(files._id)}
                >
                  <div className={styles.mainContent}>
                    <p>{files.fileName}</p>
                  </div>

                  {hoveredId === files._id && (
                    <div className={styles.iconsHover}>
                      <img
                        src="/edit.png"
                        alt=""
                        onClick={() => handleEdit(files)}
                      />
                      <img
                        src="/delete.png"
                        alt=""
                        onClick={() => handleDelete(files._id)}
                      />
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>

      {/* default page to show before the layout*/}
      <div className={styles.defaultPage}>
        <div className={styles.defaultBox}>
      <div className={styles.layouts}>
        <div className={styles.canvasBox}>
<img src="/createCanvas.png" alt="" srcset="" className={styles.layoutsIcons} />
<p>enjoy making mind maps</p>
        </div>
        <div className={styles.flowBox}>
<img src="/flow.png" alt="" srcset="" className={styles.layoutsIcons}/>
<p>enjoy making blocks</p>
        </div>

      </div>
      <p className="">this is the default page</p>

        </div>
      </div>
    </>
  );
};

export default home;
