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
const Subscription = lazy(() => import("./pages/Subscription/Subscription"));
const Library = lazy(() => import("./pages/Library/Library"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const LikedPodcasts = lazy(() =>
  import("./pages/LikedPodcasts/LikedPodcasts.jsx")
);
const DownloadedPodcasts = lazy(() =>
  import("./pages/DownloadedPodcasts/DownloadedPodcasts.jsx")
);
const MyPlaylist = lazy(() => import("./pages/MyPlaylist/MyPlaylist.jsx"));
const SinglePlaylist = lazy(() =>
  import("./pages/SinglePlaylist/SinglePlaylist.jsx")
);
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
    <div className="select-none font-poppins">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/podcasts" element={<PodcastsContent />} />
          <Route path="/stories" element={<StoriesContent />} />
          <Route path="/audio-book" element={<AudioBooksContent />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/downloaded-podcasts" element={<DownloadedPodcasts />} />
          <Route path="/your-playlist" element={<MyPlaylist />} />
          <Route path="/your-playlist/:playlist" element={<SinglePlaylist />} />
          <Route path="/liked-podcasts" element={<LikedPodcasts />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/podcast/:podId" element={<SinglePodcast />} />
          <Route path="/creator/:creatorId" element={<SingleCreator />} />
        </Routes>
      </Suspense>
      {activePlayer?.name && <Player />}
    </div>
  );
};

export default App;
