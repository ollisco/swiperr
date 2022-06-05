import { DataProfile } from '../../types';
import IMAGE_01 from '../images/img01.jpeg';
import IMAGE_02 from '../images/img01.jpeg';
import IMAGE_03 from '../images/img01.jpeg';
import IMAGE_04 from '../images/img01.jpeg';
import IMAGE_05 from '../images/img01.jpeg';
import IMAGE_06 from '../images/img01.jpeg';
import IMAGE_07 from '../images/img01.jpeg';
import IMAGE_08 from '../images/img01.jpeg';
import IMAGE_09 from '../images/img01.jpeg';
import IMAGE_10 from '../images/img01.jpeg';

const data: DataProfile[] = [
  {
    id: 1,
    name: 'Fredrik Juvet',
    isOnline: true,
    match: '78',
    description: 'Indek Grindset',
    message: 'Forza Ferrari, Grande Machina, The Witcher 3, Bella Ciao',
    age: '19',
    image: IMAGE_01,
  },
  {
    id: 2,
    name: 'Tom Rehnström',
    match: '93',
    description: 'I am a Huge F1 fan',
    isOnline: true,
    message: "Wassup, I'm Fredrik, I'm a software developer, and I'm looking for a job.",
    image: IMAGE_02,
  },
  {
    id: 3,
    name: 'Isac Hassle',
    match: '45',
    description: 'Part time Singer/Dancer.',
    isOnline: false,
    message: 'Oh, hee-hee, aha. Ha, ooh, hee, ha-ha, ha-ha. And I thought my jokes were bad.',
    image: IMAGE_03,
  },
  {
    id: 4,
    name: 'Alexander Holmberg',
    match: '88',
    description: 'Crypto Guru and HV71 fan',
    isOnline: true,
    message: 'Crypto is up Today! Did you see Alice in Wonderland?, At least I think I did.',
    image: IMAGE_04,
  },
  {
    id: 5,
    name: 'Marcus Bardvall',
    match: '76',
    description: "It's not who I am underneath but what I do that defines me.",
    isOnline: false,
    message: 'Buy my stupid NFTs',
    image: IMAGE_05,
  },
  {
    id: 6,
    name: 'Max Claesson',
    match: '95',
    description: 'Guitar player, Hair like a Golden Retriever',
    isOnline: true,
    message: "I just ate two entire pizzas. I'm not sure if I'm hungry or if I'm just really, really hungry.",
    image: IMAGE_06,
  },
  {
    id: 7,
    name: 'Lisa Kvist',
    match: '67',
    description:
      'Fulvinia, a.k.a. The Queen of the Night, a Swedish-American singer, songwriter, and actress.',
    isOnline: true,
    message:
      "Coffee, tea, and cake. I'm not sure what else to put here.",
    image: IMAGE_07,
  },
  {
    id: 8,
    name: 'Olle Jernström',
    match: '85',
    description: 'Music lover. Globe Trotter. Occasional Photographer.',
    age: '19',
    location: 'Stockholm, Sweden',
    infoPersonal: 'Loves programming',
    infoMusic: 'Loves Rock, Pop and Hiphop/Rap',
    lastSeen: 'Last seen: 23h ago',
    isOnline: true,
    topTracks: 'Track 1, Track 2, Track 3, Track 4, Track 5',
    topArtists: 'Artist 1, Artist 2, Artist 3, Artist 4, Artist 5',
    topGenres: 'Genre 1, Genre 2, Genre 3, Genre 4, Genre 5',
    message:
      "And as for the television's so-called plan, Batman has no jurisdiction.",
    image: IMAGE_08,
  },
  {
    id: 9,
    name: 'Marina Bremmander',
    match: '74',
    description:
      'Swedish Rapper with the artist name MarreB',
    isOnline: true,
    message: 'Rap music is love',
    image: IMAGE_09,
  },
  {
    id: 10,
    name: 'Pepsi Man',
    match: '98',
    description:
      'Pepsi da number one',
    isOnline: false,
    message:
      'You want order in Gotham. Batman must stop drinking coke.',
    image: IMAGE_10,
  },
];

export default data;
