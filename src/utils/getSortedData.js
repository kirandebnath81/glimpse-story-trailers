import { v4 } from "uuid";

const getSortedData = (data, type) => {
  const comments = [
    { user: "Shani Roy", comment: "Trailer is amazing", id: v4() },

    {
      user: "Palak Singh",
      comment: "When will the movie release?",
      id: v4(),
    },

    {
      user: "Md Imran ",
      comment: "Kya khatarnak trailer hai..",
      id: v4(),
    },
  ];
  const likes = Math.floor(Math.random() * 10) + 90;
  const isDropdown = false;
  const isLiked = false;

  if (type === "videoDetails") {
    return { ...data, comments, likes, isLiked, isDropdown };
  } else {
    const newData = data.results?.map((video) => ({
      ...video,
      comments,
      likes,
      isLiked,
      isDropdown,
    }));

    return newData;
  }
};

export default getSortedData;
