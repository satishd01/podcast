import React from "react";
import { scrollToTop } from "../../utils/constants";

const ListeningHistory = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return <div></div>;
};

export default ListeningHistory;
