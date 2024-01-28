import { useState } from "react";
import ImageModal from "../../ImageModal/ImageModal";
import css from "./ImageCard.module.css";
import defaultImg from "../../../assets/default_img.jpg";

export default function ImageCard({ imageSm, imageData }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const imageUrl = imageSm || defaultImg;

  const openModal = (data) => {
    setIsOpen(true);
    setModalImage(data);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalImage(null);
  };
  return (
    <div className={css.photoCard}>
      <img
        className={css.photoCardImg}
        src={imageUrl}
        alt=""
        onClick={() => openModal(imageData)}
        loading="lazy"
      />
      {modalImage && modalIsOpen && (
        <ImageModal
          image={modalImage}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
}
