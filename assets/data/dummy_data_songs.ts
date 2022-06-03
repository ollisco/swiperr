import { DataSong } from "../../types";
import IMAGE_LOGIC from "../images/logic.jpg";
import IMAGE_XXX from "../images/xxx.jpg";
import IMAGE_SKEPTA from "../images/skepta.jpg";
import IMAGE_ODZ from "../images/odz.jpg";
import IMAGE_DIO from "../images/dio.jpg";
import IMAGE_POST from "../images/post.jpg";
import IMAGE_METALLICA from "../images/metallica.jpg";
//import IMAGE_TYLER from  ".../images/tyler.jpg";
import IMAGE_TRAVIS from "../images/travis.jpg";
import IMAGE_BANGER from "../images/banger.jpg";


const data: DataSong[] = [
  {
    id: 1,
    track: "The Return",
    match: "78",
    artist: "Logic",
    album: "The Return",
    image: IMAGE_LOGIC,

  },
  {
    id: 2,
    track: "SAD!",
    match: "93",
    artist: "XXXTentacion",
    album: "?",
    image: IMAGE_XXX,
  },
  {
    id: 3,
    track: "Bullet From A Gun",
    match: "45",
    artist: "skepta",
    album: "Ignorance is bliss",
    image: IMAGE_SKEPTA,
  },
  {
    id: 4,
    track: "Summer of Our Lives",
    match: "88",
    artist: "waykap, Emmi",
    album: "Summer of Our Lives",
    image: IMAGE_BANGER,
  },
  {
    id: 5,
    track: "Ostron",
    match: "76",
    artist: "Frej Larsson, ODZ, Canto",
    album: "Bland streckgubbar och linjemän",
    image: IMAGE_ODZ,
  },
  {
    id: 6,
    track: "SICKO MODE",
    match: "95",
    artist: "Travis Scott",
    album: "ASTROWORLD",
    image: IMAGE_TRAVIS,
  },
  {
    id: 7,
    track: "ONE",
    match: "67",
    artist: "Metallica",
    album: "...And Justice for None",
    image: IMAGE_METALLICA,
  },
  {
    id: 8,
    track: "Holy Diver",
    match: "85",
    artist: "Dio",
    location: "Irvine, CA",
    album: "Holy Diver",
    image: IMAGE_DIO,
  },
  {
    id: 9,
    track: "EARFQUACK",
    match: "74",
    artist: "Tyler, The Creator",
    album: "IGOR",
    image: IMAGE_DIO,
  },
  {
    id: 10,
    track: "Congratulations",
    match: "98",
    artist: "Post Malone",
    album: "Stoney",
    image: IMAGE_POST,
  },
];

export default data;
