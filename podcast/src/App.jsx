import React, { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));
const GenresPage = lazy(() => import("./pages/GenresPage/GenresPage"));

const App = () => {
  return (
    <div className=" select-none">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genres" element={<GenresPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
