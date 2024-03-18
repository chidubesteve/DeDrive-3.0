import React from "react";

//  internal imports
import styles from "./globals.css";
import { NavBar } from "./components/ComponentIndex";
import { Footer } from "./components/ComponentIndex";

const App = () => {
  return (
    <div>
      <NavBar />
      <Footer />
    </div>
  );
};

export default App;
