/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
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

  function findByApi() {
    if (textSearch.trim()) {
      setLoading(true);
      setShowMore(false);
      API.getApi(textSearch, page).then(findImages => {
        setItems([...items, ...findImages.data.hits]);
        if (findImages.data.hits.length === 0) {
          Notiflix.Notify.info('There are no results');
        }
        if (page < Math.ceil(findImages.data.totalHits / 12)) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }

        setLoading(false);
      });
    } else {
      setShowMore(false);
    }
  }

  const onSearch = search => {
    if (textSearch === search) {
      return;
    }
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
