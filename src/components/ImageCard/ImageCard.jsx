import React from "react";

const ImageCard = ({ image, openModal }) => {
  if (!image?.urls?.small) {
    return null;
  }

  const { urls, alt_description, description, user } = image;
  const { first_name, last_name, location, portfolio_url } = user || {};

  const info = {
    url: urls?.full,
    alt: alt_description,
    description,
    name: `${first_name || ""} ${last_name || ""}`.trim(),
    location,
    portfolio: portfolio_url,
  };

  return (
    <div>
      <img
        width="300"
        onClick={() => openModal(info)}
        src={urls.small}
        alt={alt_description || "Image"}
      />
    </div>
  );
};

export default ImageCard;
