import { createContext, FC, useState } from 'react';
import { SwipedCardContextT } from '../types';

export const SwipeCardContext = createContext<SwipedCardContextT | null>(null);

const SwipeCardProvider: FC<React.ReactNode> = ({ children }) => {
  const [volume, setVolume] = useState<number>(50);
  // const [swipedDistance, setSwipedDistance] = useState<number>(0);
  const [rgb, setRGB] = useState<string>('rgb(54, 54, 54)');
  const [pressedTrack, setPressedTrack] = useState<string>('');
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);

  const updateVolume = (value: number) => {
    setVolume(value);
  };

  return (
    <SwipeCardContext.Provider value={{
      volume,
      updateVolume,
      rgb,
      setRGB,
      pressedTrack,
      setPressedTrack,
      showPlaylists,
      setShowPlaylists,
    }}
    >
      {children}
    </SwipeCardContext.Provider>
  );
};

export default SwipeCardProvider;
