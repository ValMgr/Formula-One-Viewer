import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/404";

import App from "./App";
import Drivers from "./routes/Drivers";
import { Seasons, Season } from "./routes/Seasons";
import Teams from "./routes/Teams";

import "./assets/css/index.css";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Header />
    <main className="container">
      <Routes>
        <Route path="/" element={<App />} />
        
        <Route path="/seasons" element={<Seasons />}></Route>
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/teams" element={<Teams />} />

        <Route path="/seasons/:seasonId" element={<Season />} />

        <Route path="*" element={<NotFound />} status={404} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
