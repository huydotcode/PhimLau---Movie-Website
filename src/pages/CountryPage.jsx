import { useParams, useSearchParams } from "react-router-dom";

import MovieListPage from "../components/MovieListPage";
import { moviesSort } from "../data/movies_sort";
import { useAllCountries } from "../hooks/useCountry";

const CountryPage = () => {
  const { slug } = useParams(); // Lấy slug thể loại từ URL
  const searchParams = useSearchParams();
  const getQueryArray = (key) =>
    searchParams[0].get(key) ? searchParams[0].get(key).split(",") : [];
  const { data: countries } = useAllCountries({ enable: true });

  const defaultFilters = {
    type: getQueryArray("type"),
    country: [slug],
    category: getQueryArray("category"),
    year: getQueryArray("year"),
    lang: getQueryArray("lang"),
    sort: searchParams[0].get("sort") || moviesSort[0].slug,
  };

  return (
    <MovieListPage
      title={`Danh sách phim theo quốc gia: ${
        (countries &&
          countries?.find((country) => country.slug === slug)?.name) ||
        "Không tìm thấy"
      }`}
      defaultFilters={defaultFilters}
      hasCountryFilter={false}
    />
  );
};

export default CountryPage;
