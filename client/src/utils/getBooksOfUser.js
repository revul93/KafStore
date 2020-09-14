import axios from 'axios';
const fetchBooks = async (userId) => {
  try {
    const response = await axios.get(`/api/book/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

export default fetchBooks;
