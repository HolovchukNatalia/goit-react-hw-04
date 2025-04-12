import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../Api/Api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setNoResults(false);
    setTotalPages(1);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const { results, totalPage } = await api(query, page);
        if (results.length === 0) {
          setNoResults(true);
        } else {
          setImages((prev) => [...prev, ...results]);
          setNoResults(false);
        }
        setTotalPages(totalPage);
      } catch {
        setError("Failed to load images");
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    } else {
      toast.info("You've reached the end of the pages.");
    }
  };
  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedImage(null);
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error} />}
      {noResults && !loading && <div>No images found for this query.</div>}
      {images.length > 0 && (
        <>
          <ImageGallery gallery={images} openModal={openModal} />
          {loading ? <Loader /> : <LoadMoreBtn onClick={loadMore} />}
        </>
      )}
      {loading && images.length === 0 && <Loader />}
      <ImageModal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
