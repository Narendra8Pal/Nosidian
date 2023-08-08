import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const BlockEditor = ({ onSave }) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null); 

  useEffect(() => {
    if (!editorInstanceRef.current) { 
      editorInstanceRef.current = new EditorJS({
        holder: editorRef.current,
        tools: {
          header: Header,
          list: List,
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
    <div>
      <div ref={editorRef} />
    </div>
  );
};

export default BlockEditor;
