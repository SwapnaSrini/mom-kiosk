import { useState } from 'react'
import './ProductImageCarousel.css'
type ProductImageCarouselProps = {
  imageUrls: string[]
  productName: string
}
function ProductImageCarousel({
  imageUrls,
  productName,
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <div className="image-carousel">
      <img
        src={imageUrls[currentIndex]}
        alt={`${productName} image ${currentIndex + 1}`}
      />
      <div className="carousel-thumbnails">
        {imageUrls.map((imageUrl, index) => (
          <button
            key={imageUrl}
            onClick={() => setCurrentIndex(index)}
            className={
              index === currentIndex ? 'thumbnail active' : 'thumbnail'
            }
          >
            <img src={imageUrl} alt={`${productName} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductImageCarousel
