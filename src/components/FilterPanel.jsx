// import React from "react";

// const FilterPanel = ({ filters, setFilters, handleFilter, handleClearFilter }) => {
//     const handleFilterChange = (key, value) => {
//         if (key === "sort") {
//             // Chỉ cho phép chọn một tiêu chí sắp xếp
//             setFilters(prev => ({
//                 ...prev,
//                 [key]: value,
//             }));
//         } else {
//             // Cho phép chọn nhiều tiêu chí lọc
//             setFilters(prev => ({
//                 ...prev,
//                 [key]: prev[key].includes(value)
//                     ? prev[key].filter(item => item !== value) // Bỏ nếu đã chọn
//                     : [...prev[key], value], // Thêm nếu chưa chọn
//             }));
//         }
//     };

//     return (
//         <div className="mb-6 p-4 bg-gray-900 rounded-md">
//             <div className="gap-4">
//                 {/* Quốc gia */}
//                 <div className="flex items-start mb-3">
//                     <h3 className="text-white font-semibold mb-1 min-w-[120px]">Quốc gia:</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {["Việt Nam", "Mỹ", "Hàn Quốc", "Nhật Bản", "Âu Mỹ", "Trung Quốc", "Anh", "Pháp", "Thái Lan", "Tây Ban Nha", "Ấn Độ"].map(country => (
//                             <button
//                                 key={country}
//                                 className={`px-4 ${filters.country.includes(country) ? "text-yellow-500" : "text-white"}`}
//                                 onClick={() => handleFilterChange("country", country)}
//                             >
//                                 {country}
//                             </button>
//                         ))}
//                         <button
//                             className="bg-gray-500 rounded-full px-4 text-secondary"
//                             onClick={() => handleClearFilter("country")}
//                         >
//                             Xóa
//                         </button>
//                     </div>
//                 </div>

//                 {/* Thể loại */}
//                 <div className="flex items-start mb-3">
//                     <h3 className="text-white font-semibold mb-1 min-w-[120px]">Thể loại:</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {["Bí ẩn", "Chiến Tranh", "Chính kịch", "Cổ Trang", "Gia Đình", "Hài Hước", "Hành Động", "Hình Sự", "Học Đường", "Khoa Học", "Kinh Dị", "Phim 18+", "Phiêu Lưu", "Thể Thao", "Tài Liệu", "Tâm Lý", "Tình Cảm", "Viễn Tưởng", "Võ Thuật", "Âm Nhạc"].map(category => (
//                             <button
//                                 key={category}
//                                 className={`px-4 ${filters.category.includes(category) ? "text-yellow-500" : "text-white"}`}
//                                 onClick={() => handleFilterChange("category", category)}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                         <button
//                             className="bg-gray-500 rounded-full px-4 text-secondary"
//                             onClick={() => handleClearFilter("category")}
//                         >
//                             Xóa
//                         </button>
//                     </div>
//                 </div>

//                 {/* Năm */}
//                 <div className="flex items-start mb-3">
//                     <h3 className="text-white font-semibold mb-1 min-w-[120px]">Năm:</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {["2025", "2024", "2023", "2022", "2021", "2020", "Cũ hơn"].map(year => (
//                             <button
//                                 key={year}
//                                 className={`px-4 rounded-md ${filters.year.includes(year) ? "text-yellow-500" : "text-white"}`}
//                                 onClick={() => handleFilterChange("year", year)}
//                             >
//                                 {year}
//                             </button>
//                         ))}
//                         <button
//                             className="bg-gray-500 rounded-full px-4 text-secondary"
//                             onClick={() => handleClearFilter("year")}
//                         >
//                             Xóa
//                         </button>
//                     </div>
//                 </div>

//                 {/* Ngôn ngữ */}
//                 <div className="flex items-start mb-3">
//                     <h3 className="text-white font-semibold mb-1 min-w-[120px]">Ngôn ngữ:</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {["Vietsub", "Thuyết Minh"].map(lang => (
//                             <button
//                                 key={lang}
//                                 className={`px-4 ${filters.lang.includes(lang) ? "text-yellow-500" : "text-white"}`}
//                                 onClick={() => handleFilterChange("lang", lang)}
//                             >
//                                 {lang}
//                             </button>
//                         ))}
//                         <button
//                             className="bg-gray-500 rounded-full px-4 text-secondary"
//                             onClick={() => handleClearFilter("lang")}
//                         >
//                             Xóa
//                         </button>
//                     </div>
//                 </div>

//                 {/* Sắp xếp */}
//                 <div className="flex items-start mb-3">
//                     <h3 className="text-white font-semibold mb-1 min-w-[120px]">Sắp xếp:</h3>
//                     <div className="flex flex-wrap gap-2">
//                         {["Mới nhất", "IMDB", "Lượt xem"].map(sort => (
//                             <button
//                                 key={sort}
//                                 className={`px-4 ${filters.sort === sort ? "text-yellow-500" : "text-white"}`}
//                                 onClick={() => handleFilterChange("sort", sort)}
//                             >
//                                 {sort}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className="flex gap-4 mt-4">
//                 <button
//                     className="px-4 py-2 bg-yellow-500 text-black rounded-md"
//                     onClick={handleFilter}
//                 >
//                     Lọc kết quả
//                 </button>
//                 <button
//                     className="px-4 py-2 bg-gray-700 text-white rounded-md"
//                     onClick={() => setFilters({ country: [], category: [], year: [], lang: [], type: [], sort: "Mới nhất" })}
//                 >
//                     Đặt lại
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default FilterPanel;

import React from "react";

const FilterPanel = ({ filters, setFilters, handleFilter, setShowFilters }) => {
  const handleFilterChange = (key, value) => {
    if (key === "sort") {
      setFilters(prev => ({
        ...prev,
        [key]: value,
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter(item => item !== value)
          : [...prev[key], value],
      }));
    }
  };

  const handleClearFilter = key => {
    setFilters(prev => ({
      ...prev,
      [key]: key === "sort" ? "Mới nhất" : [], // Đặt lại mặc định cho sắp xếp hoặc xóa tất cả tiêu chí
    }));
  };

  return (
    <div className="mb-6 p-4 bg-gray-900 rounded-md">
      <div className="gap-4">
        {/* Quốc gia */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">
            Quốc gia:
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Việt Nam",
              "Hàn Quốc",
              "Nhật Bản",
              "Âu Mỹ",
              "Trung Quốc",
              "Anh",
              "Pháp",
              "Thái Lan",
              "Ấn Độ",
            ].map(country => (
              <button
                key={country}
                className={`px-4 ${filters.country.includes(country) ? "text-yellow-500" : "text-white"}`}
                onClick={() => handleFilterChange("country", country)}
              >
                {country}
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

        {/* Thể loại */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">
            Thể loại:
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Bí ẩn",
              "Chiến Tranh",
              "Chính kịch",
              "Cổ Trang",
              "Gia Đình",
              "Hài Hước",
              "Hành Động",
              "Hình Sự",
              "Học Đường",
              "Khoa Học",
              "Kinh Dị",
              "Phim 18+",
              "Phiêu Lưu",
              "Thể Thao",
              "Tài Liệu",
              "Tâm Lý",
              "Tình Cảm",
              "Viễn Tưởng",
              "Võ Thuật",
              "Âm Nhạc",
            ].map(category => (
              <button
                key={category}
                className={`px-4 ${filters.category.includes(category) ? "text-yellow-500" : "text-white"}`}
                onClick={() => handleFilterChange("category", category)}
              >
                {category}
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

        {/* Năm */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">Năm:</h3>
          <div className="flex flex-wrap gap-2">
            {["2025", "2024", "2023", "2022", "2021", "2020", "Cũ hơn"].map(
              year => (
                <button
                  key={year}
                  className={`px-4 rounded-md ${filters.year.includes(year) ? "text-yellow-500" : "text-white"}`}
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
            {["Vietsub", "Thuyết Minh"].map(lang => (
              <button
                key={lang}
                className={`px-4 ${filters.lang.includes(lang) ? "text-yellow-500" : "text-white"}`}
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
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">
            Loại phim:
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Phim lẻ", "Phim bộ"].map(type => (
              <button
                key={type}
                className={`px-4 ${filters.type.includes(type) ? "text-yellow-500" : "text-white"}`}
                onClick={() => handleFilterChange("type", type)}
              >
                {type}
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

        {/* Sắp xếp */}
        <div className="flex items-start mb-3">
          <h3 className="text-white font-semibold mb-1 min-w-[120px]">
            Sắp xếp:
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Mới nhất", "IMDB", "Lượt xem"].map(sort => (
              <button
                key={sort}
                className={`px-4 ${filters.sort === sort ? "text-yellow-500" : "text-white"}`}
                onClick={() => handleFilterChange("sort", sort)}
              >
                {sort}
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
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          onClick={() => setShowFilters(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
