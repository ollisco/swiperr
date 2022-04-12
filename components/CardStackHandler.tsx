import React, { createContext, useContext, useEffect, useState } from "react";
import CardStack, { Card } from "react-native-card-stack-swiper";
import DATA from "../assets/data/dummy_data_songs";
import { BLACK, WHITE, DARK_GRAY } from "../assets/styles";
import { SwipedCardContextT } from "../types";
import CardItem from "./CardItem";
import SwipeCardProvider, { SwipeCardContext } from "./VolumeContext";

const CardStackHandler = () => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const {rgb, setRGB} = useContext(SwipeCardContext) as SwipedCardContextT;
    

    function convertRGBgreen(d: number) {
      const m = d > 125 ? 125 : d;
      return `rgb(${54-(54*d/300)+20}, ${m}, ${54-(54*d/300)+20})`
    }    

    function convertRGBred(d: number) {
      const m = d < 125 ? 125 : -d;
      return `rgb(${m}, ${54-(54*-d/300)+20}, ${54-(54*-d/300)+20})`
    }  


    return (
        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
          onSwipe={(x, _y) => {
              console.log(x)
              if (x > 10) {
                setRGB(convertRGBgreen(x)); 
              } else if (x < -10) {
                setRGB(convertRGBred(x))
              } else {
                setRGB(DARK_GRAY);
              }
           }
          }
          onSwiped={(_) => {
            setRGB(DARK_GRAY)
          }
        }
        >
          {DATA.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                image={item.image}
                name={item.track}
                description={item.artist}
                matches={item.match}
                artist={item.artist}
              />
            </Card>
          ))}
        </CardStack>
    );
}

export default CardStackHandler;