import React, { useContext } from 'react';
import { View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import DATA from '../../assets/data/dummy_data_songs';
import { DARK_GRAY } from '../../assets/styles';
import useSpotifyContext from '../../hooks/useSpotifyAuth';
import { SwipedCardContextT } from '../../types';
import CardItem from './CardItem';
import { SwipeCardContext } from './CardProvider';

function CardStackHandler(style: any) {
  const {
    userRecommendedTracks: userTopItems,
    getUserRecommendedTracks: getTopUserItems,
    token,
    likeSong,
    queueAndSkip,
    newReleases,
  } = useSpotifyContext();
  const {
    setRGB,
    setSwiper,
    showType,
    recommendedIndex,
    setRecommendedIndex,
    newReleasesIndex,
    setNewReleasesIndex,
  } = useContext(SwipeCardContext) as SwipedCardContextT;

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
  return (
    <View style={{ borderColor: '#000000', borderWidth: 3 }}>

      {userTopItems && showType === 'recommended'
        ? (
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
              if (token) {
                queueAndSkip(userTopItems[recommendedIndex + 1].uri);
                setRecommendedIndex(recommendedIndex + 1);
                setNewReleasesIndex(newReleasesIndex + 1);
              }
            }}
            onSwipeEnd={() => {
              setRGB(DARK_GRAY);
            }}

            onSwipedAll={() => {
              if (token) {
                getTopUserItems();
              }
            }}
            onSwipedRight={(index: number) => {
              if (token) {
                likeSong(userTopItems[index].id);
              }
            }}
          >
            {userTopItems?.map((item: any, index: number) => (
              <Card key={item.id}>
                <CardItem
                  hasActions
                  image={{ uri: item.album.images[0].url }}
                  popularity={item.popularity}
                  artist={item.artists.map((artist: any) => artist.name).join(', ')}
                  track={item.name}
                  id={index}
                />
              </Card>
            ))}
          </CardStack>
        )
        : newReleases && showType === 'new'
          ? (
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
                if (token) {
                  queueAndSkip(newReleases[newReleasesIndex + 1].uri);
                  setNewReleasesIndex(newReleasesIndex + 1);
                  setRecommendedIndex(recommendedIndex + 1);
                }
              }}
              onSwipeEnd={() => {
                setRGB(DARK_GRAY);
              }}

              onSwipedAll={() => {
                if (token) {
                  getTopUserItems();
                }
              }}
              onSwipedRight={(index: number) => {
                if (token) {
                  likeSong(userTopItems[index].id);
                }
              }}
            >
              {
            newReleases?.map((item: any, index: number) => (
              <Card key={item.id}>
                <CardItem
                  hasActions
                  image={{ uri: item.images[0].url }}
                  popularity={item.popularity}
                  artist={item.artists.map((artist: any) => artist.name).join(', ')}
                  track={item.name}
                  id={index}
                  releaseDate={item.releaseDate}
                />
              </Card>
            ))
          }
            </CardStack>
          )
          : null}

      {!newReleases && !userTopItems ? (
        <CardStack
          loop
          verticalSwipe={false}
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
          onSwipeEnd={() => {
            setRGB(DARK_GRAY);
          }}
          onSwiped={() => {
            setRGB(DARK_GRAY);
          }}
        >
          {DATA.map((item, index) => (
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
          ))}
        </CardStack>
      ) : null}

    </View>
  );
}

export default CardStackHandler;
function queueAndSkip(accessToken: any, arg1: number) {
  throw new Error('Function not implemented.');
}
