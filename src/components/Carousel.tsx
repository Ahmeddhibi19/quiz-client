import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";

interface CarrouselProps {
  cards: any[];
  width: string;
  height: string;
  margin: string;
  offset: number;
  showArrows: boolean;
}

const Carrousel: React.FC<CarrouselProps> = ({ cards, width, height, margin, offset, showArrows }) => {
  const table = cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(offset);
  const [showNavigation, setShowNavigation] = useState(showArrows);
  const [goToSlide, setGoToSlide] = useState<number | undefined>();

  useEffect(() => {
    setOffsetRadius(offset);
    setShowNavigation(showArrows);
  }, [offset, showArrows]);

  return (
    <div
      style={{ width, height, margin }}
    >
      <Carousel
        slides={table}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showNavigation}
        animationConfig={config.gentle}
      />
    </div>
  );
};

export default Carrousel;
