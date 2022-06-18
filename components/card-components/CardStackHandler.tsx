import React, { useContext, useState } from 'react';
import {
  View, StyleSheet, Platform,
} from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Swiper from 'react-native-deck-swiper';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import DATA from '../../assets/data/dummy_data_songs';
import { CARD_HEIGHT, DARK_GRAY, DIMENSION_HEIGHT } from '../../assets/styles';
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
  const [what, setWhat] = useState(true);
  const cardIndex = showType === 'recommended' ? recommendedIndex : newReleasesIndex;

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
    if (userTopItems.length > 0) {
      console.log('Hello', userTopItems.length, userTopItems[0].name,  showType);
      setWhat(!what);
      swiper?.jumpToCardIndex(0);
      
    }
  }, [userTopItems]);

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
            <GestureHandlerRootView>
              <Swipeable>
                <CardItem
                  hasActions
                  image={{ uri: card.album.images[0].url }}
                  track={card.name}
                  releaseDate={card.releaseDate}
                  popularity={card.popularity}
                  artist={card.artists.map((artist: any) => artist.name).join(', ')}
                  id={index}
                />
              </Swipeable>
            </GestureHandlerRootView>
          )}
          useViewOverflow={Platform.OS === 'ios'}
          onSwiped={(cardIndex) => {
            console.log(cardIndex)
            setRGB(DARK_GRAY);
            //console.log(token && userTopItems[recommendedIndex + 1].uri);
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
            swiper?.jumpToCardIndex(0);
          }}
          onSwipedRight={(index) => {
            console.log(index)
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
                index: number
                ) => (
                <GestureHandlerRootView>
                  <Swipeable>
                    <CardItem
                      hasActions
                      image={{ uri: card.images[0].url }}
                      track={card.name}
                      releaseDate={card.releaseDate}
                      popularity={card.popularity}
                      artist={card.artists.map((artist: any) => artist.name).join(', ')}
                      id={index}
                    />
                  </Swipeable>
                </GestureHandlerRootView>
              )}
              useViewOverflow={Platform.OS === 'ios'}
              onSwiped={(cardIndex) => {
                console.log(cardIndex)
                setRGB(DARK_GRAY);
                if (token && newReleases[newReleasesIndex + 1].uri) {
                    queueAndSkip(newReleases[newReleasesIndex + 1].uri);
                    setRecommendedIndex(recommendedIndex + 1);
                    setNewReleasesIndex(newReleasesIndex + 1);
                  }
                }
              }
              onSwipedAborted={() => {
                setRGB(DARK_GRAY);
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
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
            <GestureHandlerRootView>
              <Swipeable>
                <CardItem
                  hasActions
                  image={card.image}
                  track={card.track}
                  description={card.artist}
                  matches={card.match}
                  artist={card.artist}
                />
              </Swipeable>
            </GestureHandlerRootView>
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
function queueAndSkip(_accessToken: any, _arg1: number) {
  throw new Error('Function not implemented.');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginHorizontal: 40,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
});
