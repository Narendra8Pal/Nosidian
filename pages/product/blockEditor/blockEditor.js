// REACT, STYLES
import React, { useEffect, useRef } from 'react';
import styles from "@/styles/editor.module.css";

// library
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import  SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import DragDrop from 'editorjs-drag-drop';
const BlockEditor = ({ onSave}) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null); 

  useEffect(() => {
    if (!editorInstanceRef.current) { 
      editorInstanceRef.current = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: {
            class: Header, 
            inlineToolbar: ['link'] 
          }, 
          list: { 
            class: List, 
            inlineToolbar: true ,
            config: {
              defaultStyle: 'unordered'
            }
          } ,
          raw: RawTool,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },

          quote: Quote,

          image: {
            class: ImageTool,
            // config: {
            //   endpoints: {
            //     byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
            //     byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            //   }
            // }
          },

          delimiter: Delimiter,
  
        },
        data: {}, 
      });
    }



    return () => {
      if (editorInstanceRef.current && editorInstanceRef.current.destroy) {
        editorInstanceRef.current.destroy(); 
        editorInstanceRef.current = null; 
      }
    };
  }, [onSave]);

  return (
    <>
      <div ref={editorRef} className='cdx-block ce-block_content ce-toolbar_content' />
    </>
  );
};

export default BlockEditor;
