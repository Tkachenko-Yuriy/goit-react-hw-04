import Modal from "react-modal";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import css from "./ImageModal.module.css";
import defaultImage from "../../assets/default_img.jpg";

Modal.setAppElement("#root");

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

  const {
    alt_description,
    description,
    likes,
    urls: { regular },
    user: { name, profile_image, location },
  } = image;

  const sliceDescription = (description) => {
    const secondDotIndex = description.indexOf(
      ".",
      description.indexOf(".") + 1
    );

    if (secondDotIndex !== -1) {
      return description.slice(0, secondDotIndex + 1);
    } else {
      return description;
    }
  };

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
        {regular && (
          <p className={css.description}>
            {description ? sliceDescription(description) : alt_description}
          </p>
        )}
        <img src={regular ? regular : defaultImage} alt={alt_description} />
        {regular && (
          <div className={css.wrapher}>
            <div className={css.authorWrapher}>
              <div className={css.authorInfo}>
                <img
                  className={css.authorImage}
                  src={profile_image.small}
                  alt=""
                />
                {name && <p className={css.author}>{name}</p>}
              </div>
              {location && (
                <p className={css.location}>
                  <IoLocationOutline className={css.locationIcon} />
                  {location}
                </p>
              )}
            </div>
            <div className={css.likesWraper}>
              {likes && (
                <p className={css.likes}>
                  {likes}
                  <FcLikePlaceholder className={css.modalLikesIcon} />
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
