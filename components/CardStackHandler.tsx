import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import DATA from '../assets/data/dummy_data_songs';
import { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useAuth';
import { SwipedCardContextT } from '../types';
import CardItem from './CardItem';
import { SwipeCardContext } from './SwipeCardProvider';

function CardStackHandler(style: any) {
  const {
    userRecommendedTracks: userTopItems, getUserRecommendedTracks: getTopUserItems, token, likeSong,
    playNextCard, isPlaying, switchPlayingState,
  } = useSpotifyContext();

  const { setRGB, setSwiper } = useContext(SwipeCardContext) as SwipedCardContextT;

  const swipeColorLimit = 100;

  function convertRGBgreen(d: number) {
    const m = d > 125 ? 125 : d;
    return `rgb(${54 - ((54 * d) / 300) + 20}, ${m}, ${54 - ((54 * d) / 300) + 20})`;
  }

  function convertRGBred(d: number) {
    const m = d < 125 ? 125 : -d;
    return `rgb(${m}, ${54 - ((54 * -d) / 300) + 20}, ${54 - ((54 * -d) / 300) + 20})`;
  }

  return (
    <View>
      <CardStack
        loop
        verticalSwipe={false}
        renderNoMoreCards={() => null}
        ref={(swiper) => setSwiper(swiper)}
        onSwipe={(x, _y) => {
          if (x > swipeColorLimit) {
            setRGB(convertRGBgreen(x));
          } else if (x < -swipeColorLimit) {
            setRGB(convertRGBred(x));
          } else {
            setRGB(DARK_GRAY);
          }
        }}
        onSwiped={(index: number) => {
          setRGB(DARK_GRAY);
          playNextCard(token.accessToken, index + 1);
        }}
        onSwipeEnd={() => {
          setRGB(DARK_GRAY);
        }}

        onSwipedAll={() => {
          getTopUserItems(token.accessToken);
        }}
        onSwipedRight={(index: number) => {
          likeSong(token.accessToken, userTopItems[index].id);
        }}
      >

        {userTopItems ? userTopItems?.map((item: any, index: number) => (
          <Card key={item.id}>
            <CardItem
              hasActions
              image={item.album.images[0].url}
              track={item.name}
              description={item.artists[0].name}
              matches={item.popularity}
              artist={item.artists[0].name}
              id={index}
            />
          </Card>
        )) : (DATA.map((item, index) => (
          <Card key={item.id}>
            <CardItem
              hasActions
              image={item.image}
              track={item.track}
              description={item.artist}
              matches={item.match}
              artist={item.artist}
              id={index}
            />
          </Card>
        )))}
      </CardStack>
    </View>
  );
}

export default CardStackHandler;
