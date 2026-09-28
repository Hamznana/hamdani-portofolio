import { BrowserRouter } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css"; // Optional baseline styling overrides

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
