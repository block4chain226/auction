import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProviderProvider } from "./context/ProviderContext";
import { Web3StorageProvider } from "./context/Web3StorageContext";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import MyNft from "./Pages/MyNft";
import ActiveAuctions from "./Pages/ActiveAuctions";
import { Layout } from "./components/Layout";

function App() {
  return (
    <div className="App">
      <div className="container">
        <AuthProvider>
          <ProviderProvider>
            <Web3StorageProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Main />} />
                  <Route index element={<Home />} />
                  <Route path="activeauctions" element={<ActiveAuctions />} />
                  <Route path="mynft" element={<MyNft />} />
                </Route>
              </Routes>
            </Web3StorageProvider>
          </ProviderProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
