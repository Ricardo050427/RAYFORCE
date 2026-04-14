'use client';

import { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export default function ProductGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery">
        <div className="product-gallery-main" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '6rem',
          color: 'var(--color-text-light)',
        }}>
          📦
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="product-gallery-thumbs">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`product-gallery-thumb ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={img.src} alt={`${name} - ${i + 1}`} />
            </div>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="product-gallery-main">
        <img
          src={images[activeIndex]?.src}
          alt={images[activeIndex]?.alt || name}
        />
      </div>
    </div>
  );
}
