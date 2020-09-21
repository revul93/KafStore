import axios from 'axios';

const incrementBookViewCounter = async (book_id) => {
  await axios.put(
    '/api/book/increment_view',
    { book_id },
    { headers: { 'Content-Type': 'application/json' } }
  );
};

export default incrementBookViewCounter;
