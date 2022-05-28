import { useState } from "react";
import { Carousel } from "react-bootstrap";

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../img1.jpg"
            alt="First slide"
            width={400}
            height={500}
            
          />
          <Carousel.Caption>
            <h3>Playas de Mexico</h3>
            <p>Ingresa acá y disfruta de los alojamientos mejor valorados de la temporada</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../img2.jpg"
            alt="Second slide"
            width={400}
            height={500}
          />
  
          <Carousel.Caption>
            <h3>New York</h3>
            <p>Reserva en la ciudad que nunca duerme</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../img3.jpg"
            alt="Third slide"
            width="400"
            height="500"
          />
  
          <Carousel.Caption>
            <h3>Europa low Cost</h3>
            <p>
             Conoce Suiza en Invierno !
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  