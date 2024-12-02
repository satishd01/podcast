import { fetchToken } from "./fetchToken";

export const fetchPodcastsByCreatorId = async (id, setPodcasts) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `http://localhost:8081/api/creators/podcasts/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    if (data?.length > 0) {
      setPodcasts(data);
    }
  } catch (error) {
    console.log(`Failed to fetch podcasts by id`);
  }
};
