export type CardItemT = {
  description?: string;
  hasActions?: boolean;
  hasVariant?: boolean;
  image: any;
  artist: string;
  matches?: string;
  name: string;
};

export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

export type ProfileItemT = {
  age?: string;
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

