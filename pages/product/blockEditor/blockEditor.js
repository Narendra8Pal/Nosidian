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

  const [output, setOutput] = useState("");
  // const [fetchedData, setFetchedData] = useState([]);
  const [editorData, setEditorData] = useState(initialData);

  useEffect(() => {
    console.log(fetchedData, "fetch data state");
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

        onChange: (newData) => {
          setEditorData(newData);
          console.log("changed something inside the block");
        },
      });
    }

    return () => {
      if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
      }
    };
  }, [onSave, fetchedData, initialData]);

  // after creating the filename empty block will be shown
  // purpose: to get the id of doc
  useEffect(() => {
    const emptyString = ""
    onSave(emptyString);
  }, []);

  const handleSaveBtn = async () => {
    try {
      const savedData = await editorInstanceRef.current.save();
      onSave(savedData);
      console.log(savedData, "in blockEditor");
      console.log(savedData.blocks[0].data);
      onReady(editorInstanceRef.current);

      setOutput(JSON.stringify(savedData, null, 4));
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  const handleUpdateBtn = async () => {
    try {
      const updateData = await editorInstanceRef.current.save();
      handleUpdateToServer(updateData);
      handleChange(editorInstanceRef.current);
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  const handleDeleteBtn = async () => {};

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
      <button onClick={handleUpdateBtn}>Update</button>
      <pre id="output" className="text-white">
        {output}
      </pre>
    </>
  );
};

export default BlockEditor;
