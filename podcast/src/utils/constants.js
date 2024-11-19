import { FaHeart } from "react-icons/fa";
import { IoDownloadSharp } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";

export const creatorNameLength = 14;
export const creatorTitleLength = 18;
export const playerTitleLength = 35;

export const libraryItems = [
  {
    id: 1,
    title: "Liked Podcasts",
    icon: FaHeart,
    duration: "60 mins",
  },
  {
    id: 2,
    title: "Downloaded Podcasts",
    icon: IoDownloadSharp,
    duration: "60 mins",
  },
  {
    id: 3,
    title: "My Playlist",
    icon: GiBookCover,
    duration: "60 mins",
  },
];

export const playlist = [
  {
    id: 1,
    name: "Motivation",
    episodes: 10,
  },
  {
    id: 2,
    name: "Health",
    episodes: 10,
  },
];
