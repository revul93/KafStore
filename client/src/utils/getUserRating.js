const getUserRating = (user) => {
  const reviewLength = user.review.length;
  if (!reviewLength) {
    return NaN;
  }
  const ratingAverage =
    user.review.reduce((acc, elem) => acc + elem.rating, 0) / reviewLength;

  return `${ratingAverage}/5 من ${reviewLength} ${
    reviewLength === 1 ? 'تقييم' : reviewLength === 2 ? 'تقييمين' : 'تقييمات'
  }`;
};

export default getUserRating;
