import React from "react";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div style={{ flex: 1 }}>
        <AllRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
