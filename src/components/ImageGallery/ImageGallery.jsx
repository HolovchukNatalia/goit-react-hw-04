import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGalery.module.css";

const ImageGallery = ({ gallery, openModal }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map((image) => (
        <li key={image.id} className={css.card}>
          <ImageCard image={image} openModal={() => openModal(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
