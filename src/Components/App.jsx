import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-modal";
import fetchImagesFromUnsplash from "./services/fetchApi";
import SearchBar from "./SearchBar/SearchBar";
import ImageGalleryList from "./ImageGallery/ImageGalleryList/ImageGalleryList";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import FilteredList from "./FillterList/FilteredList";
import categories from "./data/categories.json";
import ImageModal from "./ImageModal/ImageModal";
import "../Components/App.css";

Modal.setAppElement("#root");

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await fetchImagesFromUnsplash(query, page);
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (query && page === 1) {
      setImages([]);
      fetchImages();
    } else if (query && page > 1) {
      fetchImages();
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleFiltered = (filter) => {
    setQuery((prevQuery) => (prevQuery !== filter ? filter : ""));
    setPage(1);
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const openModal = (image) => {
    setIsOpen(true);
    setModalImage(image);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalImage(null);
  };

  const shouldRenderGallery = images.length > 0 && !loading && !error;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <FilteredList filter={categories} onClick={handleFiltered} />
      {loading && (
        <div className="loader">
          <ThreeDots
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
      {error && <p className="error-message">Error: {error}</p>}
      {shouldRenderGallery && (
        <ImageGalleryList items={images} onClick={openModal} />
      )}
      {shouldRenderGallery && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
      )}
      {modalImage && modalIsOpen && (
        <ImageModal
          image={modalImage}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      )}
    </>
  );
}

export default App;
