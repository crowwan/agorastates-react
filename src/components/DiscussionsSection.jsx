import React from "react";

function DiscussionsSection({ discussions = [], setQueryObj }) {
  console.log(discussions);
  return (
    <div>
      {discussions.map((a) => (
        <>{a.id}</>
      ))}
    </div>
  );
}

export default DiscussionsSection;
