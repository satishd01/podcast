import { fetchToken } from "./fetchToken";

export const fetchPodcasts = async (setPodcasts) => {
  try {
    const token = await fetchToken();

    const res = await fetch("http://localhost:8081/api/podcasts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Failed to fetch");
    }

    const data = await res.json();
    if (data?.length > 0) {
      setPodcasts(data);
    }
  } catch (error) {
    console.log(`failed to fetch top creators`);
  }
};
