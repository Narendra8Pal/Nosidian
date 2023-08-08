import React from 'react';
import dynamic from 'next/dynamic';

const EditorWidget = dynamic(import('./blockEditor.js'), { ssr: false });// it will be executed on the client side after the initial page load (working with DOM)

const EditorComponent = () => {
  const handleSaveToServer = (data) => {
    // Handle saving data to the server
    // also you can send the data to the server from here 
    console.log('EditorJS data:', data);
  };

  return (
    <div className='bg-white'>
      <h1>EditorJS Example</h1>
      <EditorWidget onSave={handleSaveToServer} />
    </div>
  );
};

export default EditorComponent;
