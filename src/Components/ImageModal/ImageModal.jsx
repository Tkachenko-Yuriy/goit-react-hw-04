import Modal from "react-modal";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoIosCloseCircleOutline } from "react-icons/io";
import css from "./ImageModal.module.css";
import defaultImage from "../../assets/default_img.jpg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ImageModal({ image, isOpen, onRequestClose }) {
  if (!image || !isOpen) {
    return null;
  }

  const { alt_description, description, likes, urls, user } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <div className={css.container}>
        <button className={css.modalButton} onClick={onRequestClose}>
          <IoIosCloseCircleOutline className={css.modalCloseIcon} />
        </button>
        <p className={css.description}>
          {description ? description : alt_description}
        </p>
        <img
          src={urls.regular ? urls.regular : defaultImage}
          alt={alt_description}
        />
        <p className={css.author}>{user.name}</p>
        <p className={css.location}>{user.location}</p>
        <p className={css.likes}>
          {likes}
          <FcLikePlaceholder className={css.modalLikesIcon} />
        </p>
      </div>
    </Modal>
  );
}
