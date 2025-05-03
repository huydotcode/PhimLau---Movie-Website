import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useCountMoviesByField,
  useCountMoviesByType,
  useCountMoviesByYearRange,
  useOverviewStats,
  useTopViewedCategories,
  useTopViewedMovies,
} from "../../hooks/useStatistics";
import { formatView } from "../../utils/formatView";

const COLORS = [
  "#f87171",
  "#34d399",
  "#60a5fa",
  "#facc15",
  "#a78bfa",
  "#f472b6",
  "#10b981",
  "#6366f1",
];

const CHART_HEIGHT = 450;

const formatDataForChart = (dataObj) => {
  return Object.entries(dataObj).map(([name, value]) => ({ name, value }));
};

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Tổng quan */}
      <OverviewStats />

      {/* Biểu đồ */}
      <TopMoviesChart />

      {/* Thống kê phim theo năm và ngôn ngữ */}
      <div className="bg-foreground p-4 rounded-lg shadow text-white">
        <h2 className="text-lg font-semibold mb-4">📊 Thống kê phim</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          <MovieByCategoryStats />
          <CountryStats />
          <MovieYearStats />
          <MovieTypeStats />
        </div>
      </div>
    </div>
  );
};

// Tổng quan
const OverviewStats = () => {
  const { data: overviewStats, isLoading } = useOverviewStats();

  if (isLoading)
    return <p className="text-center text-gray-400">Đang tải...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {overviewStats &&
        overviewStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-foreground text-white p-4 rounded-lg shadow flex flex-col items-start"
          >
            <p className="text-sm text-gray-400">{item.title}</p>
            <p className="text-2xl font-bold mt-1">{formatView(item.value)}</p>
          </div>
        ))}
    </div>
  );
};

// Biểu đồ phim xem nhiều nhất và thể loại phim được xem nhiều nhất
const TopMoviesChart = () => {
  const { data: topMovies } = useTopViewedMovies(5);
  const { data: moviesByCategory } = useTopViewedCategories(10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-foreground p-4 rounded-lg shadow text-white">
        <h2 className="text-lg font-semibold mb-4">
          🔥 Top phim xem nhiều nhất
        </h2>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <BarChart data={topMovies}>
            <XAxis
              dataKey="name"
              stroke="#ddd"
              tickFormatter={(value) => {
                if (value.length > 10) {
                  return value.slice(0, 5) + "...";
                }
                return value;
              }}
            />
            <YAxis stroke="#ddd" tickFormatter={(value) => formatView(value)} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                color: "#fff",
              }}
              formatter={(value) => [formatView(value), "Lượt xem"]}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Bar dataKey="view" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-foreground p-4 rounded-lg shadow text-white">
        <h2 className="text-lg font-semibold mb-4">
          📚 Thể loại phim được xem nhiều nhất
        </h2>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <PieChart>
            <Pie
              data={moviesByCategory}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {moviesByCategory &&
                moviesByCategory.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none",
                color: "#ffffff",
              }}
              formatter={(value) => [value, "Lượt xem"]}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MovieByCategoryStats = () => {
  const { data: stats, isLoading } = useCountMoviesByField("category");

  if (isLoading)
    return <p className="text-center text-gray-400">Đang tải thống kê...</p>;

  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">
        Số lượng phim theo thể loại
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <PieChart>
          <Pie
            data={stats}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {stats.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const CountryStats = () => {
  const { data: stats, isLoading } = useCountMoviesByField("country");

  if (isLoading)
    return <p className="text-center text-gray-400">Đang tải thống kê...</p>;

  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">
        Số lượng phim theo quốc gia
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <PieChart>
          <Pie
            data={stats}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {stats.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const MovieYearStats = () => {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2025);
  const { data: yearStats, isLoading } = useCountMoviesByYearRange(
    startYear,
    endYear,
  );

  if (isLoading)
    return <p className="text-center text-gray-400">Đang tải thống kê...</p>;

  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">
        Phim theo năm phát hành
      </h3>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="text-white block mb-1">Từ năm</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="px-3 py-1 rounded border w-24"
          />
        </div>
        <div>
          <label className="text-white block mb-1">Đến năm</label>
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="px-3 py-1 rounded border w-24"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={yearStats}>
          <XAxis dataKey="year" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip />
          <Bar dataKey="count" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// getCountMoviesByType
const MovieTypeStats = () => {
  const { data: stats, isLoading } = useCountMoviesByType();

  if (isLoading)
    return <p className="text-center text-gray-400">Đang tải thống kê...</p>;

  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">
        Số lượng phim theo loại
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <PieChart>
          <Pie
            data={stats}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {stats.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
