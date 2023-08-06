import React from "react";
import styles from "@/styles/modal.module.css"
const Modal = ({
fileName,
isOpen, 
setIsOpen,
handleTitleInputChange,
createFile,
}) => {

    
  return (
    <div>
        <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>create a file</h5>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>close</button>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.title}>
              <div className={styles.title}>Type File Name</div>
              <input
                type="text"
                value={fileName}
                onChange={handleTitleInputChange}
                placeholder="how to be fast"
                />
            </div>
          </div>
          <div className={styles.submit}>
            <button className={styles.btn} onClick={createFile}>
           Create
            </button>
          </div>
        </div>
      </div>


   

 
    </div>
  );
};

export default Modal;
