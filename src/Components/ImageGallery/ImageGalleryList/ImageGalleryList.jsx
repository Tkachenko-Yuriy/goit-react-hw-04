import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGalleryList.module.css";
export default function ImageGallery({ items}) {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard imageSm={item.urls.small} imageData={item} />
        </li>
      ))}
    </ul>
  );
}
