import React, { createContext, useContext, useState } from 'react';
export const FilesConnect = createContext();

export function FilesConnect({ children }) {
  const [filenameContext, setFilenameContext] = useState('');
  const [updateEditorFilename, setUpdateEditorFilename] = useState(false)
  const [deleteEditorFilename, setDeleteEditorFilename] = useState(false)
  const [selectedEditorFileId, setSelectedEditorFileId] = useState("")
  const [editorIdFetched, setEditorIdFetched] = useState(false)
  const [nodesContext, setNodesContext ] = useState([])
  const [deleteNodesContext, setDeleteNodesContext ] = useState([])
  const [updateNodes, setUpdateNodes] = useState(false)
  const [nodeIdContext, setNodeIdContext] = useState([])
  const [textContext, setTextContext] = useState([])
  const [getTextContext, setGetTextContext] = useState([])
  const [getNodeContext, setGetNodeContext] = useState(false);
  const [textareaId, setTextareaId] = useState([])
  const [nodeItems, setNodeItems] = useState([]);
  const [canvasDataContext, setCanvasDataContext] = useState({})
  // const nodeId = useNodeId();

  const onDeleteNode = () => {
    console.log(nodeIdContext,'node id')
    console.log(nodesContext, 'nodes context this is')
    setDeleteNodesContext(nodesContext.filter((node) => node.id !== nodeIdContext));
    console.log(nodesContext, 'delete works setupdate node is going to be true');
    setUpdateNodes(true)
  };

  const contextValue = {
    filenameContext,
    setFilenameContext,
    updateEditorFilename,
    setUpdateEditorFilename,
    deleteEditorFilename,
    setDeleteEditorFilename,
    selectedEditorFileId,
    setSelectedEditorFileId,
    editorIdFetched,
    setEditorIdFetched,
    nodesContext,
    setNodesContext,
    onDeleteNode,
    updateNodes,
    setUpdateNodes,
    deleteNodesContext,
    nodeIdContext,
    setNodeIdContext,
    textContext,
    setTextContext,
    getNodeContext,
    setGetNodeContext,
    textareaId,
    setTextareaId,
    nodeItems,
    setNodeItems,
    getTextContext,
    setGetTextContext,
    canvasDataContext,
    setCanvasDataContext
  };
 

  return (
    <FilesConnect.Provider value={contextValue}>
      {children}
    </FilesConnect.Provider>
  );
}
// export const  useFilename = () => {
//   return useContext(FilesConnect);
// }

