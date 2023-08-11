import React from "react";
import dynamic from "next/dynamic";
import Home from "@/pages/product/home.js";

const EditorWidget = dynamic(import("./blockEditor.js"), { ssr: false }); // it will be executed on the client side after the initial page load (working with DOM)

const EditorComponent = () => {
  const handleSaveToServer = (data) => {
    // Handle saving data to the server
    // also you can send the data to the server from here
    console.log("EditorJS data:", data);
  };

  const handleReady = (editor) => {
    new DragDrop(editor);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/5">
          <Home />
        </div>
        <div className="w-4/5">
          <EditorWidget
            // style={{ marginTop: "20px" }}
            onSave={handleSaveToServer}
            onReady={handleReady}
          />
        </div>
      </div>
    </>
  );
};

export default EditorComponent;
