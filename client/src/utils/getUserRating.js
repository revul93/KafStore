const getUserRating = (user) => {
  if (!user.review || user.review === 0) {
    return 'لم يتم تقييم هذا البائع';
  }

  const reviewLength = user.review.length;
  if (!reviewLength) {
    return 'لم يتم تقييم هذا البائع';
  }
  const ratingAverage =
    user.review.reduce((acc, elem) => acc + elem.rating, 0) / reviewLength;

  return `${ratingAverage}/5 من ${reviewLength} ${
    reviewLength === 1 ? 'تقييم' : reviewLength === 2 ? 'تقييمين' : 'تقييمات'
  }`;
};

export default getUserRating;
