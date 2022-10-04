import "./index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProviderProvider } from "./context/ProviderContext";
import { Web3StorageProvider } from "./context/Web3StorageContext";
import Main from "./Pages/Main";
import Home from "./Pages/Home";
import MyNft from "./Pages/MyNft";
import ActiveAuctions from "./Pages/ActiveAuctions";
import { Layout } from "./components/Layout";
import { BiddProvider } from "./context/BiddContext";
import AuctionsParticipation from "../src/Pages/AuctionsParticipation";

function App() {
  return (
    <div className="App">
      <div className="container">
        <AuthProvider>
          <ProviderProvider>
            <Web3StorageProvider>
              <BiddProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="home" element={<Home />} />
                    <Route path="mynft" element={<MyNft />} />
                    <Route path="activeauctions" element={<ActiveAuctions />} />
                    <Route
                      path="auctionsparticipation"
                      element={<AuctionsParticipation />}
                    />
                  </Route>
                </Routes>
              </BiddProvider>
            </Web3StorageProvider>
          </ProviderProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
