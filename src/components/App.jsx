import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import API from './GetApi/GetApi';
import Button from './Button';
import Loader from './Loader';

function App() {
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    findByApi();
  }, [textSearch, page]);

  const findByApi = () => {
    if (textSearch.trim()) {
      setLoading(true);
      setShowMore(false);
      API.getApi(textSearch, page).then(findImages => {
        setItems([...items, ...findImages.data.hits]);

        if (
          items.length >= findImages.data.totalHits ||
          findImages.data.hits.length === 0
        ) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }

        setLoading(false);
      });
    } else {
      setShowMore(false);
    }
  };

  const onSearch = search => {
    setPage(1);
    setItems([]);
    setTextSearch(search);
  };

  const onShowMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="container">
        <Searchbar onSearch={onSearch} />
      </div>
      <div className="main-container">
        {!textSearch.trim() && (
          <h3 className="noSearch">Enter data to search...</h3>
        )}
        {textSearch && <ImageGallery items={items} />}
        {loading && <Loader />}
        {showMore && <Button onShowMore={onShowMore} />}
      </div>
    </>
  );
}

export default App;
