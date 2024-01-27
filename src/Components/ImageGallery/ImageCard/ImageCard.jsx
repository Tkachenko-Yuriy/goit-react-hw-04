import css from "./ImageCard.module.css";
import defaultImg from "../../../assets/default_img.jpg";

export default function ImageCard({ image, onClick }) {
  const imageUrl = image || defaultImg;
  return (
    <div className={css.photoCard}>
      <img
        className={css.photoCardImg}
        src={imageUrl}
        alt=""
        onClick={onClick}
        loading="lazy"
      />
    </div>
  );
}
