import CardStack from "react-native-card-stack-swiper";

export type CardItemT = {
  description?: string;
  hasActions?: boolean;
  hasVariant?: boolean;
  image: any;
  artist: string;
  popularity?: string;
  track: string;
  previousVolume?: number;
  setVolume?: (val: number) => void;
  color?: string;
  id: number,
  releaseDate?: string;
};

export type CardItemRowT = {
  name: string;
  image: any;
}

export type SwipedCardContextT = {
  volume: number;
  updateVolume: (value: number) => void;
  rgb: string;
  setRGB: (value: string) => void;
  pressedTrack: string;
  setPressedTrack: (value: string) => void;
  showPlaylists: boolean;
  setShowPlaylists: (value: boolean) => void;
  swiper: CardStack | null;
  setSwiper: (value: CardStack | null) => void;
  showType: string;
  setShowType: (value: string) => void;
  recommendedIndex: number;
  setRecommendedIndex: (value: number) => void;
  newReleasesIndex: number;
  setNewReleasesIndex: (value: number) => void;
}


export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
  onPress?: (e: any) => void;
  useFontAwesome?: boolean;
};

export type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

export type ProfileItemT = {
  followerCount?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
  matches: string;
  name: string;
};

export type TabBarIconT = {
  focused: boolean;
  iconName: any;
  text: string;
};

export type DataSong = {
  id: number;
  track: string;
  match: string;
  artist: string;
  album: string;
  image: any;
  location?: string;  
};


export type DataProfile = {
  id: number;
  name: string;
  isOnline: boolean;
  match: string; // . How similiar is this person to you musically?
  description: string;
  message: string;
  image: any;
  age?: string;
  infoPersonal?: string;
  infoMusic?: string;
  lastSeen?: string;
  location?: string;
};

