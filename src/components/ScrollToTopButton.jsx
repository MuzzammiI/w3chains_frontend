import { useState, useEffect } from 'react';
import ButtonCard from './ButtonCard';
import { CircleArrowUp } from 'lucide-react';
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    

      <ButtonCard
      onClick={scrollToTop}
      background={`fixed bottom-5 right-5 px-5 py-2 text-base bg-purple-500 text-white rounded cursor-pointer z-[1000] ${isVisible ? 'block' : 'hidden'}`}
      icon={CircleArrowUp}
      size='small'
      animationType='fade'
      iconPosition='right'
      
      >
      Top
        
      </ButtonCard>



  );
};

export default ScrollToTopButton;
