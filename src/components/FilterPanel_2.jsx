import { useEffect, useState } from "react";
import { useAllCountries } from "../hooks/useCountry";
import { useAllCategories } from "../hooks/useCategory";
import { useNavigate } from "react-router";
import { moviesSort } from "../data/movies_sort";
import { moviesType } from "../data/movies_type";

const FilterPanel_2 = ({
  filters,
  setShowFilters,
  handleApplyFilters,
  hasTypeFilter = true,
  hasCategoryFilter = true,
  hasCountryFilter = true,
}) => {
  const [currentFilters, setCurrentFilters] = useState(filters);
  const { data: countries } = useAllCountries({ enable: true });
  const { data: categories } = useAllCategories({ enable: true });
  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    if (key === "sort") {
      setCurrentFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else {
      setCurrentFilters((prev) => ({
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter((item) => item !== value)
          : [...prev[key], value],
      }));
    }
  };

  const handleClearFilter = (key) => {
    setCurrentFilters((prev) => ({
      ...prev,
      [key]: key === "sort" ? "Mới nhất" : [],
    }));
  };

  const handleClearAllFilters = () => {
    setCurrentFilters({
      type: [],
      country: [],
      category: [],
      year: [],
      lang: [],
      sort: "Mới nhất",
    });
  };

  useEffect(() => {
    console.log("FILTERPANEL_2: ", {
      currentFilters,
    });
  }, [currentFilters]);

  const handleFilter = () => {
    handleApplyFilters(currentFilters);
    const params = new URLSearchParams();
    console.log({ currentFilters });
    Object.keys(currentFilters).forEach((key) => {
      if (
        Array.isArray(currentFilters[key]) &&
        currentFilters[key].length > 0
      ) {
        params.set(key, currentFilters[key].join(","));
      } else if (key === "sort") {
        params.set(key, currentFilters[key]);
      }
    });
    navigate(`?${params.toString()}`);

    setShowFilters(false);
  };

  return (
    <div className="mb-6 p-4 bg-background rounded-md">
      <div className="gap-4">
        {/* Quốc gia */}
        {hasCountryFilter && (
          <div className="flex items-start mb-3">
            <h3 className="text-white font-semibold mb-1 min-w-[120px]">
              Quốc gia:
            </h3>
            <div className="flex flex-wrap gap-2">
              {countries?.map((country) => (
                <button
                  key={country.id}
                  className={`px-4 ${
                    currentFilters.country.includes(country?.slug)
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  onClick={() => handleFilterChange("country", country?.slug)}
                >
                  {country?.name}
                </button>
              ))}
              <button
                className="bg-gray-500 rounded-full px-4 text-secondary"
                onClick={() => handleClearFilter("country")}
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        {/* Thể loại */}
        {hasCategoryFilter && (
          <div className="flex items-start mb-3">
            <h3 className="text-white font-semibold mb-1 min-w-[120px]">
              Thể loại:
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 ${
                    currentFilters.category.includes(category?.slug)
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  onClick={() => handleFilterChange("category", category?.slug)}
                >
                  {category?.name}
                </button>
              ))}
              <button
                className="bg-gray-500 rounded-full px-4 text-secondary"
                onClick={() => handleClearFilter("category")}
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        {/* Năm */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">Năm:</h3>
          <div className="flex flex-wrap gap-2">
            {["2025", "2024", "2023", "2022", "2021", "2020", "Cũ hơn"].map(
              (year) => (
                <button
                  key={year}
                  className={`px-4 rounded-md ${
                    currentFilters.year.includes(year)
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  onClick={() => handleFilterChange("year", year)}
                >
                  {year}
                </button>
              ),
            )}
            <button
              className="bg-gray-500 rounded-full px-4 text-secondary"
              onClick={() => handleClearFilter("year")}
            >
              Xóa
            </button>
          </div>
        </div>

        {/* Ngôn ngữ */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">
            Ngôn ngữ:
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Vietsub", "Thuyết Minh"].map((lang) => (
              <button
                key={lang}
                className={`px-4 ${
                  currentFilters.lang.includes(lang)
                    ? "text-yellow-500"
                    : "text-white"
                }`}
                onClick={() => handleFilterChange("lang", lang)}
              >
                {lang}
              </button>
            ))}
            <button
              className="bg-gray-500 rounded-full px-4 text-secondary"
              onClick={() => handleClearFilter("lang")}
            >
              Xóa
            </button>
          </div>
        </div>

        {/* Loại phim */}
        {hasTypeFilter && (
          <div className="flex items-start mb-3">
            <h3 className="text-white font-semibold mb-1 min-w-[120px]">
              Loại phim:
            </h3>
            <div className="flex flex-wrap gap-2">
              {moviesType.map((type) => (
                <button
                  key={type.slug}
                  className={`px-4 ${
                    currentFilters.type.includes(type.slug)
                      ? "text-yellow-500"
                      : "text-white"
                  }`}
                  onClick={() => handleFilterChange("type", type.slug)}
                >
                  {type.name}
                </button>
              ))}
              <button
                className="bg-gray-500 rounded-full px-4 text-secondary"
                onClick={() => handleClearFilter("type")}
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        {/* Sắp xếp */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">
            Sắp xếp:
          </h3>
          <div className="flex flex-wrap gap-2">
            {moviesSort.map((sort) => (
              <button
                key={sort.slug}
                className={`px-4 ${
                  currentFilters.sort === sort.slug
                    ? "text-yellow-500"
                    : "text-white"
                }`}
                onClick={() => handleFilterChange("sort", sort.slug)}
              >
                {sort.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-black rounded-md"
          onClick={handleFilter}
        >
          Lọc kết quả
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleClearAllFilters}
        >
          Xóa tất cả
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          onClick={() => setShowFilters(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default FilterPanel_2;
