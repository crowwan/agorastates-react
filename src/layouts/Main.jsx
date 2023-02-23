import React, { useCallback, useEffect, useState } from "react";
import DiscussionsSection from "../components/DiscussionsSection";
import Aside from "./Aside";
import { fetchDataWithQuery } from "../utils/fetchData";

export default function Main({ user }) {
  const [discussions, setDiscussions] = useState([]);
  const [pages, setPages] = useState(0);
  const [queryObj, setQueryObj] = useState({ page: 1 });

  const initFetch = useCallback(() => {
    setQueryObj({ page: 1 });
  }, []);
  //TODO: fetch 요청 에러 처리
  useEffect(() => {
    (async () => {
      console.log("fetching...");
      const res = await fetchDataWithQuery("discussions", { ...queryObj });
      setDiscussions(res.discussion);
      setPages(res.pages);
    })();
  }, [queryObj]);

  return (
    <main>
      <Aside
        user={user}
        disabled={!user ? true : false}
        query={queryObj}
        setQueryObj={setQueryObj}
        initFetch={initFetch}
      />
      <DiscussionsSection
        user={user}
        discussions={discussions}
        pages={pages}
        page={queryObj.page}
        initFetch={initFetch}
        setQueryObj={setQueryObj}
      />
    </main>
  );
}
