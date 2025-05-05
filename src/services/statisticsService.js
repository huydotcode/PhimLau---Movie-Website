import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../app/firebase";
import { moviesType } from "../data/movies_type";

export async function countMoviesByField(field) {
  const snapshot = await getDocs(collection(db, "movies"));
  const counts = {};

  snapshot.forEach((doc) => {
    const values = doc.data()[field] || [];
    values.forEach((val) => {
      const name = val.name || val; // handle both string or object
      counts[name] = (counts[name] || 0) + 1;
    });
  });

  const limit = 10; // Giới hạn số lượng kết quả trả về
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const limitedCounts = sortedCounts.slice(0, limit);
  const othersCount = sortedCounts
    .slice(limit)
    .reduce((acc, [_, count]) => acc + count, 0);
  const limitedCountsObj = Object.fromEntries(limitedCounts);
  limitedCountsObj["Khác"] = othersCount; // Thêm mục "Khác" với tổng số lượng còn lại

  const result = Object.entries(limitedCountsObj).map(([name, count]) => ({
    name,
    count,
  }));

  return result;
}

export async function getMovieDistribution() {
  const snapshot = await getDocs(collection(db, "movies"));

  const byYear = {};
  const byCategory = {};
  const byLang = {};

  snapshot.forEach((doc) => {
    const data = doc.data();

    // Năm
    const year = data.year;
    if (year) byYear[year] = (byYear[year] || 0) + 1;

    // Thể loại
    const categories = data.category || [];
    categories.forEach((c) => {
      const name = c.name || c;
      byCategory[name] = (byCategory[name] || 0) + 1;
    });

    // Ngôn ngữ
    const lang = data.lang;
    if (lang) byLang[lang] = (byLang[lang] || 0) + 1;
  });

  return {
    byYear,
    byCategory,
    byLang,
  };
}

export async function getTopViewedMovies(topN = 10) {
  const q = query(
    collection(db, "movies"),
    orderBy("view", "desc"),
    limit(topN),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    view: doc.data().view || 0,
  }));
}

export async function countMoviesByYearRange(start, end) {
  const snapshot = await getDocs(collection(db, "movies"));
  const counts = {};

  snapshot.forEach((doc) => {
    const year = doc.data().year;
    if (year >= start && year <= end) {
      counts[year] = (counts[year] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => a[0] - b[0])
    .map(([year, count]) => ({ year: Number(year), count }));
}

export const getOverviewStats = async () => {
  const moviesSnapshot = await getDocs(collection(db, "movies"));
  const usersSnapshot = await getDocs(collection(db, "users"));
  const newMoviesSnapshot = await getDocs(
    query(collection(db, "movies"), orderBy("year", "desc"), limit(7)),
  );

  const totalMovies = moviesSnapshot.size;
  const totalUsers = usersSnapshot.size;
  const totalViews = moviesSnapshot.docs.reduce(
    (acc, doc) => acc + (doc.data().view || 0),
    0,
  );
  const newMoviesCount = newMoviesSnapshot.size;

  return [
    { title: "Tổng số phim", value: totalMovies },
    { title: "Tổng người dùng", value: totalUsers },
    { title: "Lượt xem", value: totalViews },
    { title: "Phim mới tuần qua", value: newMoviesCount },
  ];
};

// Thống kê các thể loại phim được xem nhiều nhất
export const getTopViewedCategories = async (topN) => {
  const snapshot = await getDocs(collection(db, "movies"));
  const counts = {};

  snapshot.forEach((doc) => {
    const categories = doc.data().category || [];
    categories.forEach((c) => {
      const name = c.name || c;
      counts[name] = (counts[name] || 0) + (doc.data().view || 0);
    });
  });

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const limitedCounts = sortedCounts.slice(0, topN);
  const othersCount = sortedCounts
    .slice(topN)
    .reduce((acc, [_, count]) => acc + count, 0);

  const limitedCountsObj = Object.fromEntries(limitedCounts);
  limitedCountsObj["Khác"] = othersCount; // Thêm mục "Khác" với tổng số lượng còn lại

  return Object.entries(limitedCountsObj).map(([name, count]) => ({
    name,
    count,
  }));
};

// Thống kê số phim theo loại phim movie.type: ["hoathinh", "series", "single", "tvshows"]
export const getCountMoviesByType = async () => {
  const snapshot = await getDocs(collection(db, "movies"));
  const counts = {};

  snapshot.forEach((doc) => {
    const type = doc.data().type || "Khác"; // Nếu không có loại, gán là "Khác"
    const typeName = moviesType.find((t) => t.slug === type)?.name || type; // Tìm tên loại phim từ moviesType
    counts[typeName] = (counts[typeName] || 0) + 1;
  });

  return Object.entries(counts).map(([name, count]) => ({ name, count }));
};
