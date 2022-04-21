import React from 'react';

function useMounted() {
  const isMounted = React.useRef(true);
  React.useEffect(() => () => {
    isMounted.current = false;
  }, []);
  return isMounted;
}

export default useMounted;
