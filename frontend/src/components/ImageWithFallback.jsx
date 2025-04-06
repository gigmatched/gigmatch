import React from "react";

const ImageWithFallback = ({ webp, fallback, alt, className, loading = "lazy" }) => (
  <picture>
    <source srcSet={webp} type="image/webp" />
    <img src={fallback} alt={alt} className={className} loading={loading} />
  </picture>
);

export default ImageWithFallback;