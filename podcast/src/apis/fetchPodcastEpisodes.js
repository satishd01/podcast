import { fetchToken } from "./fetchToken";

export const fetchPodcastEpisodes = async (id, setEpisodes) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `http://localhost:8081/api/podcasts/${id}/episodes`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      console.log("Failed to fetch");
    }

    const data = await res.json();
    if (data?.length > 0) {
      setEpisodes(data);
    }
  } catch (error) {
    console.log("Failed to fetch creator by Id");
  }
};
