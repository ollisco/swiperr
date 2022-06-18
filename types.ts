import CardStack from "react-native-card-stack-swiper";
import Swiper from "react-native-deck-swiper";

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
  pressedTrack: any;
  setPressedTrack: (value: any) => void;
  showPlaylists: boolean;
  setShowPlaylists: (value: boolean) => void;
  swiperMock: Swiper<DataSong> | null;
  setSwiperMock: (value: Swiper<DataSong> | null) => void;
  swiperRec: Swiper<DataSong> | null;
  setSwiperRec: (value: Swiper<DataSong> | null) => void;
  swiperNew: Swiper<DataSong> | null;
  setSwiperNew: (value: Swiper<DataSong> | null) => void;
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
  topTracks?: string;
  topArtists?: string;
  topGenres?: string;
  location?: string;
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
  topTracks?: string;
  topArtists?: string;
  topGenres?: string;
};

export type SettingItemSwitchT = {
  text: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
  icon?: any;
};

export type SettingItemDropdownT = {
  header: string;
  explanation?: string;
  options: string[];
  defaultValue?: string;
  onSelect?: (value: any) => void;
}
