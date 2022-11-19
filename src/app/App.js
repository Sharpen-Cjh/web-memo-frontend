import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}

export default App;