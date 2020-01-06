import React, {useState,useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import './index.css';
const HomeCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return(
    <div>
      <Carousel className="carousel-size" activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fit-carousel"
            src={require('./images/cycle1.jpg')}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="font-white">Trimm</h3>
            <p>Trimm과 함께 여행을 떠나보세요</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fit-carousel"
            src={require('./images/cycle2.jpg')}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="font-white">Trimm</h3>
            <p>당신의 여정을 함께 합니다</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fit-carousel"
            src={require('./images/cycle3.jpg')}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3 className="font-white">Trimm</h3>
            <p>
              김철기 교수님 짱짱맨
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default HomeCarousel;
