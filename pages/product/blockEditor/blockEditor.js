// // REACT, STYLES, FILES
// import React, { useContext, useEffect, useRef, useState } from "react";
// import styles from "@/styles/editor.module.css";
// import SimpleImage from "./imageTool";
// import { FilesConnect } from "../../userContext.js";

// // library
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import LinkTool from "@editorjs/link";
// import RawTool from "@editorjs/raw";
// // import SimpleImage from "@editorjs/simple-image";
// import Checklist from "@editorjs/checklist";
// import Embed from "@editorjs/embed";
// import Quote from "@editorjs/quote";
// import ImageTool from "@editorjs/image";
// import Delimiter from "@editorjs/delimiter";
// import InlineImage from "editorjs-inline-image";
// import CodeTool from "@editorjs/code";

// const BlockEditor = ({
//   onSave,
//   onReady,
//   initialData,
//   fetchedData,
//   handleUpdateToServer,
// }) => {
//   const editorRef = useRef(null);
//   const editorInstanceRef = useRef(null);
//   const { filenameContext } = useContext(FilesConnect);

//   useEffect(() => {
//     // console.log(fetchedData, "fetch data state");
//     // console.log(filenameContext, "filename in editor useeff");
//     if (!editorInstanceRef.current) {
//       editorInstanceRef.current = new EditorJS({
//         holder: editorRef.current,

//         tools: {
//           header: {
//             class: Header,
//             config: {
//               placeholder: "Enter a header",
//               levels: [1, 2, 3],
//             },
//             inlineToolbar: ["link", "italic"],
//           },
//           list: {
//             class: List,
//             inlineToolbar: true,
//             config: {
//               defaultStyle: "unordered",
//             },
//           },
//           raw: RawTool,
//           checklist: {
//             class: Checklist,
//             inlineToolbar: true,
//           },
//           code: CodeTool,
//           quote: {
//             class: Quote,
//             inlineToolbar: true,
//           },

//           image: {
//             class: SimpleImage,
//             inlineToolbar: true,
//           },

//           // delimiter: Delimiter,
//         },

//         data: {
//           time: Date.now(),
//           blocks: initialData
//             .filter((document) => document.filename === filenameContext)
//             .flatMap((document) =>
//               document.blocks.map((block) => ({
//                 data: {
//                   text: block.data.text,
//                   level: block.data.level,
//                   url: block.data.url,
//                   caption: block.data.caption,
//                   alignment: block.data.alignment,
//                   withBorder: block.data.withBorder,
//                   withBackground: block.data.withBackground,
//                   stretched: block.data.stretched,
//                   style: block.data.style,
//                   items: Array.isArray(block.data.items)
//                     ? block.data.items.map((item) => {
//                         if (typeof item === "object") {
//                           return {
//                             text: item.text,
//                             checked: item.checked,
//                           };
//                         } else if (typeof item === "string") {
//                           return item;
//                         } else {
//                           return null;
//                         }
//                       })
//                     : [],
//                   type: block.data.type,
//                   html: block.data.html,
//                   code: block.data.code,
//                 },
//                 id: block.id,
//                 type: block.type,
//                 _id: block._id,
//               }))
//             ),
//         },
//       });
//     }

//     return () => {
//       if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
//         editorInstanceRef.current.destroy();
//         editorInstanceRef.current = null;
//       }
//     };
//   }, [onSave, fetchedData, initialData, filenameContext]);

//   const handleUpdateBtn = async () => {
//     try {
//       const updateData = await editorInstanceRef.current.save();
//       handleUpdateToServer(updateData);
//       // handleChange(editorInstanceRef.current);
//     } catch (error) {
//       console.error("Error saving document", error);
//     }
//   };

//   return (
//     <>
//       {/* <img src="/coverPage.png" className={styles.coverPage} alt="" /> */}

//       {/* <h1 className={styles.heading} contentEditable={true}>
//               {filenameContext}
//             </h1> */}
//       <div ref={editorRef} className="" />
//       {/* <button id="save-btn" onClick={handleSaveBtn} className="text-white">
//         Save
//       </button> */}
//       <button onClick={handleUpdateBtn} className={styles.btn}>
//         Update
//       </button>
//     </>
//   );
// };

// export default BlockEditor;


import React from 'react'

const BlockEditor = () => {
  return (
    <div></div>
  )
}

export default BlockEditor
