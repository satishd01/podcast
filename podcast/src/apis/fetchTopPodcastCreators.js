import { setTopCreators } from "../app/slices/topCreatorsSlice";
import { fetchToken } from "./fetchToken";

export const fetchTopPodcastCreators = async (dispatch) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "http://localhost:8081/api/creators/top-podcast-creators",
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
    if (data?.creators?.length > 0) {
      dispatch(setTopCreators(data.creators));
    }
  } catch (error) {
    console.log(`failed to fetch top creators`);
  }
};
