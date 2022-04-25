import React, { useContext, useState } from 'react';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import DATA from '../assets/data/dummy_data_songs';
import { DARK_GRAY } from '../assets/styles';
import useSpotifyAuth from '../hooks/useAuth';
import { SwipedCardContextT } from '../types';
import CardItem from './CardItem';
import { SwipeCardContext } from './SwipeCardProvider';

function CardStackHandler() {
  const { userTopItems } = useSpotifyAuth();

  const [_swiper, setSwiper] = useState<CardStack | null>(null);
  const { rgb, setRGB } = useContext(SwipeCardContext) as SwipedCardContextT;

  const swipeColorLimit = 100;

  function convertRGBgreen(d: number) {
    const m = d > 125 ? 125 : d;
    return `rgb(${54 - (54 * d / 300) + 20}, ${m}, ${54 - (54 * d / 300) + 20})`;
  }

  function convertRGBred(d: number) {
    const m = d < 125 ? 125 : -d;
    return `rgb(${m}, ${54 - (54 * -d / 300) + 20}, ${54 - (54 * -d / 300) + 20})`;
  }

  // React use effect block
  React.useEffect(() => {
    if (userTopItems) {
      console.log('U', userTopItems);
    }
  }, [userTopItems]);

  return (
    <CardStack
      loop
      verticalSwipe={false}
      renderNoMoreCards={() => null}
      ref={(newSwiper): void => setSwiper(newSwiper)}
      onSwipe={(x, _y) => {
        if (x > swipeColorLimit) {
          setRGB(convertRGBgreen(x));
        } else if (x < -swipeColorLimit) {
          setRGB(convertRGBred(x));
        } else {
          setRGB(DARK_GRAY);
        }
      }}
      onSwiped={(_) => {
        setRGB(DARK_GRAY);
      }}
      onSwipeEnd={() => {
        setRGB(DARK_GRAY);
      }}
    >
      {/* userTopItems ? console.log(0) : console.log(-1) */}
      {userTopItems ? userTopItems?.map((item: any) => (
        
        <Card key={item.id}>
          <CardItem
            hasActions
            image={item.album.images[0].url}
            track={item.name}
            description={item.artists[0].name}
            matches={item.popularity}
            artist={item.artists[0].name}
          />
        </Card>
      )) : (DATA.map((item) => (
        <Card key={item.id}>
          <CardItem
            hasActions
            image={item.image}
            track={item.track}
            description={item.artist}
            matches={item.match}
            artist={item.artist}
          />
        </Card>
      )))}
    </CardStack>
  );
}

export default CardStackHandler;
