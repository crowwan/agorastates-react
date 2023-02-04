import React, { useEffect, useState } from "react";
import DiscussionsSection from "../components/DiscussionsSection";
import Aside from "./Aside";
import { fetchData } from "../utils/fetchData";

export default function Main() {
  const [discussions, setDiscussions] = useState([]);
  const [queryObj, setQueryObj] = useState({ page: 1 });

  useEffect(() => {
    (async () => {
      console.log("fetching...");
      const res = await fetchData("discussions", { ...queryObj });
      setDiscussions(res.discussion);
    })();
  }, [queryObj]);

  return (
    <main>
      <Aside disabled={true} query={queryObj} setQueryObj={setQueryObj} />
      <DiscussionsSection discussions={discussions} setQueryObj={setQueryObj} />
    </main>
  );
}
