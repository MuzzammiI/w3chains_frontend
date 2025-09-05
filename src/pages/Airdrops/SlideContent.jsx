import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample slide data (you can replace these with your own images/content)
const slides = [
  {
    id: 1,
    image: 'https://img.freepik.com/free-vector/modern-dotted-particles-digital-technology-background_1055-7816.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
    title: 'Global Crypto Trading Cup 2025',
    description: 'Become a World-Class Trader!',
    buttonText: 'Join',
    buttonColor: 'bg-green-500'
  },
  {
    id: 2,
    image: 'https://img.freepik.com/free-photo/fantasy-style-half-whale-half-robot_23-2151603021.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
    title: 'Cheap, Fast and Secure',
    description: 'Join Now $18.750',
    buttonText: 'Join Now',
    buttonColor: 'bg-white'
  },
  {
    id: 3,
    image: 'https://img.freepik.com/free-vector/sales-funnel-isometric-web-template_107791-479.jpg?ga=GA1.1.1272655499.1724846198&semt=ais_hybrid',
    title: 'Blood Event',
    description: 'Available Now',
    buttonText: 'Join Event',
    buttonColor: 'bg-white'
  }
];

const SlideContent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-48 bg-cover bg-center flex items-center justify-between p-24"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Left Side - Text Content */}
            <div className="text-white">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
            {/* Right Side - Button */}
            <button
            
              className={`${slide.buttonColor} text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
            >
              {slide.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideContent;