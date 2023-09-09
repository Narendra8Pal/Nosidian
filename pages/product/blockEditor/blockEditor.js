// REACT, STYLES, FILES
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "@/styles/editor.module.css";
import SimpleImage from "./imageTool";
import { FilesConnect, useFilename } from "@/pages/product/userContext.js";

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
import CodeTool from "@editorjs/code";

const BlockEditor = ({
  onSave,
  onReady,
  initialData,
  fetchedData,
  handleUpdateToServer,
}) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const { filenameContext } = useContext(FilesConnect);

  
  useEffect(() => {
    console.log(fetchedData, "fetch data state");
    console.log(filenameContext, "filename in editor useeff");
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
              placeholder: "Enter a header",
              levels: [1, 2, 3],
              // defaultLevel: 3
            },
            inlineToolbar: ["link", "italic"],
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
          quote: {
            class: Quote,
            inlineToolbar: true,
          },

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
          time: Date.now(),
          blocks: initialData.flatMap((document) => {
            if (document.filename === filenameContext) {
              return document.blocks.map((block) => ({
                data: {
                  time: Date.now(),
                  blocks: initialData.flatMap((document) =>
                    document.blocks.map((block) => ({
                      data: {
                        text: block.data.text,
                        level: block.data.level,
                        url: block.data.url,
                        caption: block.data.caption,
                        alignment: block.data.alignment,
                        withBorder: block.data.withBorder,
                        withBackground: block.data.withBackground,
                        stretched: block.data.stretched,
                        style: block.data.style,
                        items: Array.isArray(block.data.items)
                          ? block.data.items.map((item) => {
                              if (typeof item === "object") {
                                return {
                                  text: item.text,
                                  checked: item.checked,
                                };
                              } else if (typeof item === "string") {
                                return item;
                              } else {
                                return null;
                              }
                            })
                          : [],
                        type: block.data.type,
                        html: block.data.html,
                        code: block.data.code,
                      },
                      id: block.id,
                      type: block.type,
                      _id: block._id,
                    }))
                  ),
                },
                id: block.id,
                type: block.type,
                _id: block._id,
              }));
            } else {
              return [];
            }
          }),
        },

        // ? don't need it right now 
        // onChange: (newData) => {
        //   setEditorData(newData);
        //   console.log("changed something inside the block");
        // },
      });
    }

    return () => {
      if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [onSave, fetchedData, initialData, filenameContext]);

  // const handleSaveBtn = async () => {
  //   try {
  //     const savedData = await editorInstanceRef.current.save();
  //     onSave(savedData);
  //     console.log(savedData, "in blockEditor");
  //     // console.log(savedData.blocks[0].data);
  //     onReady(editorInstanceRef.current);
  //   } catch (error) {
  //     console.error("Error saving document", error);
  //   }
  // };

  const handleUpdateBtn = async () => {
    try {
      const updateData = await editorInstanceRef.current.save();
      handleUpdateToServer(updateData);
      // handleChange(editorInstanceRef.current);
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  return (
    <>
      {/* <img src="/coverPage.png" className={styles.coverPage} alt="" /> */}

      {/* <h1 className={styles.heading} contentEditable={true}>
              {filenameContext}
            </h1> */}
      <div ref={editorRef} className="" />
      {/* <button id="save-btn" onClick={handleSaveBtn} className="text-white">
        Save
      </button> */}
      <button onClick={handleUpdateBtn}>Update</button>
    </>
  );
};

export default BlockEditor;
