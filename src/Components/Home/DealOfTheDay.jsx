import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components"; // Styled Components for Scoped CSS

// Styled Components
const DealContainer = styled(Container)`
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
 
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const DealHeading = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 3px;
    background: #007bff;
    margin: 8px auto;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SliderImage = styled.img`
  border-radius: 12px;
  
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease-in-out, box-shadow 0.3s ease-in-out;

  
`;

const DealOfTheDay = () => {
  // Dynamic Image URLs
  const dealImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHF1fGMsUYp9OCwequiF3TBwWZgLZYji3MBw&s",
    "https://www.creativehatti.com/wp-content/uploads/edd/2022/03/Happy-holi-sale-flat-cover-template-1-large.jpg",
   
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true
  };

  return (
    <DealContainer>
      <DealHeading>Deal of the Day</DealHeading>
      <Slider {...settings}>
        {dealImages.map((image, index) => (
          <div key={index}>
            <SliderImage className="d-block w-100" src={image} alt={`Deal ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </DealContainer>
  );
};

export default DealOfTheDay;
