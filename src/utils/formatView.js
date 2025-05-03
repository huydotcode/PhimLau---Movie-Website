export function formatView(number) {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(0) + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(0) + "N";
  } else {
    return number.toString();
  }
}
