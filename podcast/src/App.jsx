import React, { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));
const GenresPage = lazy(() => import("./pages/GenresPage/GenresPage"));
const SinglePodcast = lazy(() => import("./pages/SinglePodcast/SinglePodcast"));
const PodcastsContent = lazy(() =>
  import("./pages/Home/features/PodcastsContent/PodcastsContent")
);
const StoriesContent = lazy(() =>
  import("./pages/Home/features/StoriesContent/StoriesContent")
);
const AudioBooksContent = lazy(() =>
  import("./pages/Home/features/AudioBooksContent/AudioBooksContent")
);

const App = () => {
  return (
    <div className=" select-none">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/podcasts" element={<PodcastsContent />} />
          <Route path="/stories" element={<StoriesContent />} />
          <Route path="/audio-book" element={<AudioBooksContent />} />
          <Route path="/podcast/:podId" element={<SinglePodcast />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
