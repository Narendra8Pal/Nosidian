import React, { createContext, useContext, useState } from 'react';
import  {useNodeId} from "reactflow";
// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);

//   const updateUser = (newUserId) => {
//     setUserId(newUserId);
//   };

//   return (
//     <UserContext.Provider value={{ userId, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

// ! **********up until this******** 

// for the editorComponent
export const FilesConnect = createContext();

export function FilenameProvider({ children }) {
  const [filenameContext, setFilenameContext] = useState('');
  const [updateEditorFilename, setUpdateEditorFilename] = useState(false)
  const [deleteEditorFilename, setDeleteEditorFilename] = useState(false)
  const [selectedEditorFileId, setSelectedEditorFileId] = useState("")
  const [editorIdFetched, setEditorIdFetched] = useState(false)
  const [nodesContext, setNodesContext ] = useState([])

  const nodeId = useNodeId();

  const onDeleteNode = () => {
    setNodesContext(nodesContext.filter((node) => node.id !== nodeId ));
    console.log(nodesContext, 'delete works');
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
    onDeleteNode
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

