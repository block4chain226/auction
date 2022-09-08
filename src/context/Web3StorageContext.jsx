import React, { createContext } from "react";
import { Web3Storage } from "web3.storage";

const Web3StorageContext = createContext();

export const Web3StorageProvider = ({ children }) => {
  function getAccessToken() {
    return process.env.WEB3STORAGE_TOKEN;
  }
  function makeStorageClient() {
    return new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc0N0I4ZGUyNjlkMzM3MTI1Y0YzRkM1NDE2ODZGN0Y3M2QxN0Y4ZDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI1MzUxNDY3MzEsIm5hbWUiOiJFbmdsaXNoQXVjdGlvbiJ9.HqDXNON1MRU67-3TCpNeVp1wU1MzrVzrH2WBC-weawY",
    });
  }

  return (
    <Web3StorageContext.Provider value={{ makeStorageClient }}>
      {children}
    </Web3StorageContext.Provider>
  );
};

export default Web3StorageContext;
