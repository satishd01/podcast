import { fetchToken } from "./fetchToken";

export const fetchLatestPodcastShows = async (setLatestPodcasts) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/admin/getLatestPodcastShow`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch latest podcast shows: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Top podcast creators fetched successfully") {
      setLatestPodcasts(data.creators || []);
    } else {
      console.log(`Failed to fetch latest podcast shows: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch latest podcast shows: ${error.message}`);
  }
};