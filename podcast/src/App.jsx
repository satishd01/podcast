import React, { lazy, Suspense } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));

const App = () => {
  return (
    <div className=" select-none">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
