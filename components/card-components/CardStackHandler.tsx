import React, { useContext } from 'react';
import { View, Platform } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import DATA from '../../assets/data/dummy_data_songs';
import { DARK_GRAY } from '../../assets/styles';
import useSpotifyContext from '../../hooks/useSpotifyAuth';
import { SwipedCardContextT } from '../../types';
import CardItem from './CardItem';
import { SwipeCardContext } from './CardProvider';

function CardStackHandler(_style: any) {
  const {
    recommendedTracks: userTopItems,
    getUserRecommendedTracks: getTopUserItems,
    token,
    likeSong,
    queueAndSkip,
    newReleases,
    getNewReleases,
  } = useSpotifyContext();
  const {
    setRGB,
    swiper,
    setSwiper,
    showType,
    recommendedIndex,
    setRecommendedIndex,
    newReleasesIndex,
    setNewReleasesIndex,
  } = useContext(SwipeCardContext) as SwipedCardContextT;

  const swipeColorLimit = 50;
  function convertRGBgreen(d: number) {
    const m = d > 110 ? 100 : d;
    return `rgb(${54 - ((54 * d) / 300) + 20}, ${m}, ${54 - ((54 * d) / 300) + 20})`;
  }
  function convertRGBred(d: number) {
    const m = d < 110 ? 110 : -d;
    return `rgb(${m}, ${54 - ((54 * -d) / 300) + 20}, ${54 - ((54 * -d) / 300) + 20})`;
  }

  React.useEffect(() => {
    if (userTopItems.length > 0 && newReleases.length > 0) {
      swiper?.jumpToCardIndex(0);
    }
  }, [userTopItems, newReleases]);

  return (
    <View style={{ borderColor: '#000000', borderWidth: 3 }}>
      {userTopItems.length > 0 && showType === 'recommended'
        ? (
          <Swiper
            cards={userTopItems}
            renderCard={(
              card:
              {album: any, popularity: number, artists: string[], releaseDate: string, name: string},
              index: number,
            ) => (
              <CardItem
                hasActions
                image={{ uri: card.album.images[0].url }}
                track={card.name}
                releaseDate={card.releaseDate}
                popularity={card.popularity}
                artist={card.artists.map((artist: any) => artist.name).join(', ')}
                id={index}
              />
            )}
            useViewOverflow={Platform.OS === 'ios'}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
              setRGB(DARK_GRAY);
              // console.log(token && userTopItems[recommendedIndex + 1].uri);
              if (token && userTopItems[recommendedIndex + 1] !== undefined) {
                queueAndSkip(userTopItems[recommendedIndex + 1].uri);
                setRecommendedIndex(recommendedIndex + 1);
                setNewReleasesIndex(newReleasesIndex + 1);
              }
            }}
            onSwipedAborted={() => {
              setRGB(DARK_GRAY);
            }}
            onSwipedAll={() => {
              console.log('swiped all');
              getTopUserItems();
              getNewReleases();
              setNewReleasesIndex(0);
              setRecommendedIndex(0);
            }}
            onSwipedRight={(index) => {
              console.log(index);
              if (token) {
                likeSong(userTopItems[index].id);
              }
            }}
            onSwiping={(x, _y) => {
              if (x > swipeColorLimit) {
                setRGB(convertRGBgreen(x));
              } else if (x < -swipeColorLimit) {
                setRGB(convertRGBred(x));
              } else {
                setRGB(DARK_GRAY);
              }
            }}
            ref={(swiper) => setSwiper(swiper)}
            cardIndex={0}
            verticalSwipe={false}
            backgroundColor="#4FD0E9"
            stackSize={3}
          />
        )
        : newReleases && showType === 'new'
          ? (
            <Swiper
              cards={newReleases}
              renderCard={(
                card: {images: {url: string}[], name: string, artists: any, popularity: string, releaseDate: string},
                index: number,
              ) => (
                <CardItem
                  hasActions
                  image={{ uri: card.images[0].url }}
                  track={card.name}
                  releaseDate={card.releaseDate}
                  popularity={card.popularity}
                  artist={card.artists.map((artist: any) => artist.name).join(', ')}
                  id={index}
                />
              )}
              useViewOverflow={Platform.OS === 'ios'}
              onSwiped={(cardIndex) => {
                console.log(cardIndex);
                setRGB(DARK_GRAY);
                if (token && newReleases[newReleasesIndex + 1] !== undefined) {
                  queueAndSkip(newReleases[newReleasesIndex + 1].uri);
                  setRecommendedIndex(recommendedIndex + 1);
                  setNewReleasesIndex(newReleasesIndex + 1);
                }
              }}
              onSwipedAborted={() => {
                setRGB(DARK_GRAY);
              }}
              onSwipedAll={() => {
                getTopUserItems();
                getNewReleases();
                setNewReleasesIndex(0);
                setRecommendedIndex(0);
              }}
              onSwipedRight={(index) => {
                if (token) {
                  likeSong(newReleases[index].id);
                }
              }}
              onSwiping={(x, _y) => {
                if (x > swipeColorLimit) {
                  setRGB(convertRGBgreen(x));
                } else if (x < -swipeColorLimit) {
                  setRGB(convertRGBred(x));
                } else {
                  setRGB(DARK_GRAY);
                }
              }}
              ref={(swiper) => setSwiper(swiper)}
              cardIndex={0}
              verticalSwipe={false}
              backgroundColor="#4FD0E9"
              stackSize={3}
              infinite
            />

          )

          : null}

      {!newReleases && userTopItems.length === 0 ? (
        <Swiper
          cards={DATA}
          renderCard={(card) => (
            <CardItem
              hasActions
              image={card.image}
              track={card.track}
              description={card.artist}
              matches={card.match}
              artist={card.artist}
            />
          )}
          useViewOverflow={Platform.OS === 'ios'}
          onSwiped={(_cardIndex) => {
            setRGB(DARK_GRAY);
          }}
          onSwipedAborted={() => {
            setRGB(DARK_GRAY);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          onSwiping={(x, _y) => {
            if (x > swipeColorLimit) {
              setRGB(convertRGBgreen(x));
            } else if (x < -swipeColorLimit) {
              setRGB(convertRGBred(x));
            } else {
              setRGB(DARK_GRAY);
            }
          }}
          ref={(swiper) => setSwiper(swiper)}
          cardIndex={0}
          verticalSwipe={false}
          backgroundColor="#4FD0E9"
          stackSize={3}
          infinite
        />
      ) : null}

    </View>
  );
}

export default CardStackHandler;
