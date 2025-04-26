export const convertTime = time => {
  const date = new Date(time);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};
