import React from "react";

//  internal imports
import styles from "./globals.css";
import { NavBar } from "./components/ComponentIndex";
import { Footer } from "./components/ComponentIndex";
import {HeroSection} from './components/ComponentIndex'

const App = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <Footer />
    </>
  );
};

export default App;
