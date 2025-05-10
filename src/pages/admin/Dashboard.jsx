import React, { useState } from "react";
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
import Loading from "../../components/Loading";
import { useStatistics } from "../../hooks/useStatistics";
import { formatView } from "../../utils/formatView";
import { useFeedback } from "../../hooks/useFeedback";
import { convertTime } from "../../utils/convertTime";

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

const Dashboard = () => {
  const { data: statistics, isLoading } = useStatistics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loading isLoading={isLoading} />
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-white">Không có dữ liệu</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Tổng quan */}
      {statistics?.overviewStats && (
        <OverviewStats data={statistics?.overviewStats} />
      )}

      {/* Biểu đồ */}
      <TopMoviesChart
        data={{
          topMovies: statistics?.topMovies || [],
          moviesByCategory: statistics?.topCategories || [],
        }}
      />

      {/* Thống kê phim theo năm và ngôn ngữ */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Thống kê phim</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          {statistics?.topCategories && (
            <MovieByCategoryStats data={statistics?.topCategories} />
          )}
          {statistics?.countries && (
            <CountryStats data={statistics?.countries} />
          )}
          {statistics?.years && <MovieYearStats data={statistics?.years} />}
          {statistics?.types && <MovieTypeStats data={statistics?.types} />}
        </div>
      </div>

      {/* Phản hồi */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Phản hồi</h2>
        <FeedBackSection />
      </div>
    </div>
  );
};

// Tổng quan
const OverviewStats = ({ data: overviewStats }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">Tổng quan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewStats &&
          overviewStats.map((item, idx) => (
            <div
              key={idx}
              className="bg-foreground text-white p-4 rounded-lg shadow flex flex-col items-start"
            >
              <p className="text-sm text-gray-400">{item.title}</p>
              <p className="text-2xl font-bold mt-1">
                {formatView(item.value)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

// Biểu đồ phim xem nhiều nhất và thể loại phim được xem nhiều nhất
const TopMoviesChart = ({ data: { topMovies, moviesByCategory } }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white">
        Thống kê xu hướng xem
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-foreground p-4 rounded-lg shadow text-white">
          <h2 className="text-lg font-semibold mb-4">
            Top phim xem nhiều nhất
          </h2>
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <BarChart data={topMovies}>
              <XAxis
                dataKey="name"
                stroke="#ddd"
                tickFormatter={(value) => {
                  if (value.length > 10) {
                    return value.slice(0, 3) + "...";
                  }
                  return value;
                }}
              />
              <YAxis
                stroke="#ddd"
                tickFormatter={(value) => formatView(value)}
              />
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
            Thể loại phim được xem nhiều nhất
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
    </div>
  );
};

const MovieByCategoryStats = ({ data: stats }) => {
  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">
        Phim theo thể loại
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

const CountryStats = ({ data: stats }) => {
  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">
        Phim theo quốc gia
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

const MovieYearStats = ({ data: statsByYear }) => {
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2025);

  const filteredStats = statsByYear
    .map((item) => ({
      name: parseInt(item.name),
      count: item.count || 0,
    }))
    .filter((item) => {
      const year = parseInt(item.name);
      return year >= startYear && year <= endYear;
    });

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
        <BarChart data={filteredStats}>
          <XAxis dataKey="name" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip />
          <Bar dataKey="count" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// getCountMoviesByType
const MovieTypeStats = ({ data: stats }) => {
  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">Phim theo loại</h3>
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

const FeedBackSection = () => {
  const { data: feedbacks, isLoading } = useFeedback();

  return (
    <div className="bg-foreground p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold text-white mb-4">Phản hồi</h3>

      {feedbacks && feedbacks.length > 0 ? (
        <ul className="space-y-4">
          {feedbacks.map((feedback) => (
            <li
              key={feedback.id}
              className="bg-background p-4 rounded-lg shadow"
            >
              <h1 className="font-bold">
                {feedback?.name} - Tên phản hồi: {feedback?.feedback}
              </h1>
              <p className="text-white text-sm">
                Mô tả: {feedback?.errorDescription}
              </p>
              <p className="text-gray-400 text-sm">
                {convertTime(feedback?.createdAt?.toDate().toLocaleString())}
              </p>

              {feedback?.images && (
                <div className="mt-2">
                  {feedback?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Feedback image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg mr-2"
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Không có phản hồi nào</p>
      )}
    </div>
  );
};

export default Dashboard;
