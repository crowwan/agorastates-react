import React, { useEffect, useState } from "react";
import DiscussionsSection from "../components/DiscussionsSection";
import Aside from "./Aside";
import { fetchData } from "../utils/fetchData";

export default function Main({ user }) {
  const [discussions, setDiscussions] = useState([]);
  const [pages, setPages] = useState(0);
  const [queryObj, setQueryObj] = useState({ page: 1 });

  useEffect(() => {
    (async () => {
      console.log("fetching...");
      const res = await fetchData("discussions", { ...queryObj });
      setDiscussions(res.discussion);
      setPages(res.pages);
    })();
  }, [queryObj]);

  return (
    <main>
      <Aside
        disabled={!user ? true : false}
        query={queryObj}
        setQueryObj={setQueryObj}
      />
      <DiscussionsSection
        discussions={discussions}
        pages={pages}
        page={queryObj.page}
        setQueryObj={setQueryObj}
      />
    </main>
  );
}
