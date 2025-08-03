import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBook from './AddBook';
import BookDetails from './BookDetails';
import NotFound from './NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddBook />} />
        <Route path="/book/:bookName" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
