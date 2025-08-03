import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  name: string;
  author: string;
  pages: number;
}

const AddBook = () => {
  const [formData, setFormData] = useState<Book>({ name: '', author: '', pages: 0 });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'pages' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      navigate(`/book/${encodeURIComponent(formData.name)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="name" type="text" value={formData.name} onChange={handleChange} />
      <input id="author" type="text" value={formData.author} onChange={handleChange} />
      <input id="pages" type="number" value={formData.pages} onChange={handleChange} />
      <input id="submit" type="submit" value="Submit Book" />
    </form>
  );
};

export default AddBook;
