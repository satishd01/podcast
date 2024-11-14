import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import Player from "./components/Player/Player";
import { setActivePlayer } from "./app/slices/activePlayerSlice";

const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/Search/Search"));
const GenresPage = lazy(() => import("./pages/GenresPage/GenresPage"));
const SinglePodcast = lazy(() => import("./pages/SinglePodcast/SinglePodcast"));
const SingleCreator = lazy(() => import("./pages/SingleCreator/SingleCreator"));
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
  const dispatch = useDispatch();
  const activePlayer = useSelector((state) => state.activePlayer.activePlayer);

  useEffect(() => {
    const podcast = localStorage.getItem("ActivePlayer");
    if (podcast) {
      dispatch(setActivePlayer(JSON.parse(podcast)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (activePlayer?.name) {
      localStorage.setItem("ActivePlayer", JSON.stringify(activePlayer));
    }
  }, [activePlayer]);

  return (
    <div className="select-none">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/podcasts" element={<PodcastsContent />} />
          <Route path="/stories" element={<StoriesContent />} />
          <Route path="/audio-book" element={<AudioBooksContent />} />
          <Route path="/podcast/:podId" element={<SinglePodcast />} />
          <Route path="/creator/:creatorId" element={<SingleCreator />} />
        </Routes>
      </Suspense>
      {activePlayer?.name && <Player />}
    </div>
  );
};

export default App;
