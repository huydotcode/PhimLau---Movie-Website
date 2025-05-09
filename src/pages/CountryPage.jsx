import React from "react";
import { useParams } from "react-router-dom";

import MovieListPage from "../components/MovieListPage";
import { useAllCountries } from "../hooks/useCountry";

const CountryPage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL
  const { data: countries } = useAllCountries({ enable: true });

  const defaultFilters = {
    type: [],
    country: [slug],
    category: [],
    year: [],
    lang: [],
    sort: "Mới nhất",
  };

  return (
    <MovieListPage
      title={`Danh sách phim theo thể loại: ${
        countries && countries?.find((category) => category.slug === slug).name
      }`}
      defaultFilters={defaultFilters}
      hasCountryFilter={false}
    />
  );
};

export default CountryPage;
