import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Book {
  name: string;
  author: string;
  pages: number;
}

const BookDetails = () => {
  const { bookName } = useParams<{ bookName: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (bookName) {
      fetch(`/api/book/${bookName}`)
        .then(res => res.json())
        .then((data: Book) => setBook(data))
        .catch(() => setBook(null));
    }
  }, [bookName]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.name}</h2>
      <p>Author: {book.author}</p>
      <p>Pages: {book.pages}</p>
    </div>
  );
};

export default BookDetails;
