// REACT, STYLES, FILES
import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/editor.module.css";
import SimpleImage from "./imageTool";

// library
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
// import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Delimiter from "@editorjs/delimiter";
import DragDrop from "editorjs-drag-drop";
import InlineImage from "editorjs-inline-image";
import CodeTool from "@editorjs/code"

const BlockEditor = ({ onSave, onReady}) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  
  useEffect(() => {
    if (!editorInstanceRef.current) {
      editorInstanceRef.current = new EditorJS({
        holder: editorRef.current,
        
    // onReady: () => {
    //   onReady(editorInstanceRef.current); // Call onReady prop with the editor instance
    // },
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3],
              // defaultLevel: 3
            },
            inlineToolbar: ["link"],
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          raw: RawTool,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          code: CodeTool,
          quote: Quote,

          // image: {
          //           class: ImageTool,
          //   config: {
          //     endpoints: {
          //       byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          //       byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
          //     }
          //   },
          // },

          image: {
            class: SimpleImage,
            inlineToolbar: true,
          },

          delimiter: Delimiter,
        },
        data: {
          time: 1691858563980,
          blocks: [
            {
              id: "ojkFaQODhe",
              type: "image",
              data: {
                url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fencrypted-tbn1.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcTk0_tLLzT8w2DC5UbKXOO1Gop4jZsQqUS0UusrEo1HXjxWxjq8fDibmOL0GvS9gU6gHNPlxIT0mo3e92w&psig=AOvVaw37hfhiOXZGpWCasoUfqnSU&ust=1692015251013000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiUppHO2YADFQAAAAAdAAAAABAE",
              },
            },
          ],
          version: "2.27.2",
        },        
      });
    }

    return () => {
      if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [onSave]);

  const [output, setOutput] = useState("");

  const handleSaveBtn = async () => {
    try {
      const savedData = await editorInstanceRef.current.save();
      onSave(savedData)
      console.log(savedData, 'in blockEditor')
      
        onReady(editorInstanceRef.current); // Call onReady prop with the editor instance

      setOutput(JSON.stringify(savedData, null, 4));
    } catch (error) {
      console.error('Error saving document', error);
    }
  };

  // const handleSaveBtn = () => {
  //   editorInstanceRef.current.save().then((savedData) => {
  //     setOutput(JSON.stringify(savedData, null, 4));
  //   });
  // };

  return (
    <>
      <img src="/coverPage.png" className={styles.coverPage} alt="" />

      <h1 className={styles.heading}>Add ons</h1>
      <div ref={editorRef} className="" />
      <button id="save-btn" onClick={handleSaveBtn} className="text-white">
        Save
      </button>
      <pre id="output" className="text-white">
        {output}
      </pre>
    </>
  );
};

export default BlockEditor;
