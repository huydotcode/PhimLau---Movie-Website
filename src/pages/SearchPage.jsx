import React, { useEffect } from "react";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const [searchParams, _] = useSearchParams();
  const query = searchParams.get("q");

  return <div>SearchPage</div>;
};

export default SearchPage;
