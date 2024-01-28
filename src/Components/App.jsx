import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchImagesFromUnsplash from "./services/fetchApi";
import SearchBar from "./SearchBar/SearchBar";
import ImageGalleryList from "./ImageGallery/ImageGalleryList/ImageGalleryList";
import FilteredList from "./FillterList/FilteredList";
import categories from "./data/categories.json";

import "../Components/App.css";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await fetchImagesFromUnsplash(query, page);
        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleFiltered = (filter) => {
    setQuery(filter)
    setPage(1);
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const shouldRenderGallery = images.length > 0 && !error;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <FilteredList filter={categories} onClick={handleFiltered} />
      {error && <p className="error-message">Error: {error}</p>}
      <InfiniteScroll
        dataLength={images.length}
        next={()=>setPage((prevPage) => prevPage + 1)}
        hasMore={page < totalPages}
        loader={
          loading && (
            <div className="loader">
              <ThreeDots
                height={80}
                width={80}
                radius={9}
                color="green"
                ariaLabel="three-dots-loading"
              />
            </div>
          )
        }
      >
        {shouldRenderGallery && (
          <ImageGalleryList items={images}  />
        )}
      </InfiniteScroll>
      {shouldRenderGallery && page === totalPages && (
        <p style={{ textAlign: "center" }}>
          <b>You have seen all images</b>
        </p>
      )}
    </>
  );
}

export default App;
