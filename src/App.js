import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { ProviderProvider } from "./context/ProviderContext";
import { Web3StorageProvider } from "./context/Web3StorageContext";
import Main from "./Pages/Main";

function App() {
  return (
    <div className="App">
      <div className="container">
        <AuthProvider>
          <ProviderProvider>
            <Web3StorageProvider>
              <Header />
              <Main />
              <Footer />
            </Web3StorageProvider>
          </ProviderProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
