import css from "./ImageCard.module.css";
export default function ImageGallery({ image, onClick }) {
  return (
    <div className={css.photoCard}>
      <img className={css.photoCardImg} src={image} alt="" onClick={onClick} />
    </div>
  );
}
