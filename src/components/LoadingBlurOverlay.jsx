// import  { useEffect } from 'react';

// const LoadingBlurOverlay = () => {
//   useEffect(() => {
//     // Lock scrolling
//     const originalStyle = window.getComputedStyle(document.body).overflow;
//     document.body.style.overflow = 'hidden';

//     return () => {
//       // Restore original scroll behavior
//       document.body.style.overflow = originalStyle;
//     };
//   }, []);

//   return (
//     <div
//       className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white"
//       aria-busy="true"
//       aria-live="polite"
//     >
//       <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4" />
      
//       <p className="text-lg font-medium">Hang tight, we’re getting things ready for you…</p>
//       <p className="text-sm text-gray-300 mt-1">Great things take a moment. 🚀</p>
//     </div>
//   );
// };

// export default LoadingBlurOverlay;



import { useEffect, useRef } from 'react';

const LoadingBlurOverlay = () => {
  // Track mount count to handle multiple instances
  const mountCountRef = useRef(0);

  useEffect(() => {
    // Increment mount count
    mountCountRef.current += 1;

    // Only apply scroll lock if this is the first instance
    if (mountCountRef.current === 1) {
      const originalOverflow = document.body.style.overflow || 'auto';
      document.body.style.overflow = 'hidden';
      // Store original style in a data attribute to avoid conflicts
      document.body.dataset.originalOverflow = originalOverflow;
    }

    return () => {
      // Decrement mount count
      mountCountRef.current -= 1;

      // Only restore scroll if no other overlays are active
      if (mountCountRef.current === 0) {
        const originalOverflow = document.body.dataset.originalOverflow || 'auto';
        document.body.style.overflow = originalOverflow;
        // Clean up data attribute
        delete document.body.dataset.originalOverflow;
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin mb-4" />
      <p className="text-lg font-medium">Hang tight, we’re getting things ready for you…</p>
      <p className="text-sm text-gray-300 mt-1">Great things take a moment. 🚀</p>
    </div>
  );
};

export default LoadingBlurOverlay;
