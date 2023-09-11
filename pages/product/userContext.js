import React, { createContext, useContext, useState } from 'react';

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

  const contextValue = {
    filenameContext,
    setFilenameContext,
    updateEditorFilename,
    setUpdateEditorFilename,
    deleteEditorFilename,
    setDeleteEditorFilename
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

