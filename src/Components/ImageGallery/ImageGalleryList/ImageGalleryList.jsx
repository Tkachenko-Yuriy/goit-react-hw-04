import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGalleryList.module.css";
export default function ImageGallery({ items, onClick }) {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard image={item.urls.small} onClick={() => onClick(item)} />
        </li>
      ))}
    </ul>
  );
}
