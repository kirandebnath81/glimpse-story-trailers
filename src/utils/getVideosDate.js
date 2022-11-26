const getVideosDate = (listDate) => {
  const today = new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
  });

  const date = new Date();
  const milliSec = date.setDate(date.getDate() - 1);
  const yesterday = new Date(milliSec).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
  });

  if (listDate === today) {
    return "Today";
  } else if (listDate === yesterday) {
    return "Yesterday";
  } else {
    return listDate;
  }
};

export default getVideosDate;
