import { createContext, FC, useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import useSpotifyContext from '../../hooks/useSpotifyAuth';
import { DataSong, SwipedCardContextT } from '../../types';

export const SwipeCardContext = createContext<SwipedCardContextT | null>(null);

const SwipeCardProvider: FC<React.ReactNode> = ({ children }) => {
  const { recommendedTracks: userRecommendedTracks } = useSpotifyContext();
  const [volume, setVolume] = useState<number>(50);
  // const [swipedDistance, setSwipedDistance] = useState<number>(0);
  const [rgb, setRGB] = useState<string>('rgb(54, 54, 54)');
  const [pressedTrack, setPressedTrack] = useState<any>(userRecommendedTracks ? userRecommendedTracks[0] : null);
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<Swiper<DataSong> | null>(null);

  const [showType, setShowType] = useState<string>('mock');
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [newReleasesIndex, setNewReleasesIndex] = useState(0);

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
      swiper,
      setSwiper,
      showType,
      setShowType,
      recommendedIndex,
      setRecommendedIndex,
      newReleasesIndex,
      setNewReleasesIndex,
    }}
    >
      {children}
    </SwipeCardContext.Provider>
  );
};

export default SwipeCardProvider;
