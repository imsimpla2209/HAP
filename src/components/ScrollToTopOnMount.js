import React, { useEffect } from 'react';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return null; // No need to render anything for this component
}

export default ScrollToTopOnMount;
