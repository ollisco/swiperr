import { StyleSheet, Dimensions } from "react-native";

export const PRIMARY_COLOR = "#7444C0";
export const SECONDARY_COLOR = "#5636B8";
export const WHITE = "#FFFFFF";
export const GRAY = "#757E90";
export const DARK_GRAY = "#363636"; // rgb(54, 54, 54)
export const BLACK = "#000000";
export const DARKER_GRAY = "#303030";
export const SPOTIFY_GREEN = "#1DB954";

export const ONLINE_STATUS = "#46A575";
export const OFFLINE_STATUS = "#D04949";

export const STAR_ACTIONS = "#FFA200";
export const LIKE_ACTIONS = "#B644B2";
export const DISLIKE_ACTIONS = "#363636";
export const FLASH_ACTIONS = "#5028D7";

export const ERROR = "#770707";

export const DIMENSION_WIDTH = Dimensions.get("window").width; // window not screen
export const DIMENSION_HEIGHT = Dimensions.get("window").height;


export const CARD_HEIGHT = (DIMENSION_HEIGHT - 50) * 0.8;

export default StyleSheet.create({
  // COMPONENT - CARD ITEM
  containerCardItem: {
    backgroundColor: DARK_GRAY,
    borderRadius: 20,
    borderWidth: 1,
    //borderColor: SPOTIFY_GREEN,
    height: CARD_HEIGHT,
    alignItems: "center",
    margin: 5,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
    // center children
    justifyContent: "center",
    marginTop: -30,
    marginLeft: -20,

  },

  imageStyle: {
    borderRadius: 8,
    width:  DIMENSION_WIDTH - 80,
    height: CARD_HEIGHT / 2,
    margin: 20,
  },

  containerCardItemWeb: {
    width: DIMENSION_WIDTH - 40,
    height: CARD_HEIGHT,
    padding: 0,

  },

  containerCardItemSmall: {
    backgroundColor: DARK_GRAY,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
    width: (DIMENSION_WIDTH / 2) - 30,
    // center children
    justifyContent: "center",
  },

  containerCardItemRow: {
    backgroundColor: DARK_GRAY,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
    width: DIMENSION_WIDTH - 30,
  },
  playlistText: {
    fontSize: 30,
    color: WHITE,
    marginLeft: "5%"
  },

  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    color: WHITE,
  },

  exploreTopCenter: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
   },

  exploreTopCenterText: {
    color: GRAY,
    fontSize: 15,
    marginHorizontal: 10,
  },

  exploreTopCenterTextActive: {
    color: WHITE,
  },

  volumeSlider: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: "center",
  },
  artist: {
    alignItems: "center",
    textAlign: "center",
  },
  artistText: {
    color: GRAY,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  releaseDate: {
    color: GRAY,
    fontSize: 15,
    textAlign: "center",
  },

  reminderText: {
    color: GRAY,
    fontSize: 15,
    textAlign: "center",
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  miniButton: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: WHITE,
    marginHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowColor: DARK_GRAY,
    shadowOffset: { height: 10, width: 0 },
  },
  // SMALL CARD (CARDITEMSMALL)
  smallImageStyle: {
      borderRadius: 8,
      width: DIMENSION_WIDTH / 2 - 40 ,
      height: 170 ,
      margin: 0,
      flexDirection: "column",
  },
  playlistImage: {
    borderRadius: 2,
    height:  120,
    width: 120,
    margin: 0,
  },

  smallNameStyle: {
      color: WHITE,
      fontSize: 15,
      textAlign: "center",
    },
  // LARGE CARD (CARDITEM)
  

  trackStyle: {
      color: WHITE,
      width: "100%",
      textAlign: "center",
      flexWrap: 'wrap',
      flexShrink: 1,
      fontSize: 25,
      fontWeight: "bold",
  },

  // COMPONENT - SETTINGS
  settings: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 40,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  settingsText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 40,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
    alignItems: "center",
  },

  login: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 80,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },

  loginText: {
    color: DARK_GRAY,
    fontSize: 13,
    textAlign: "center",
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5,
  },

  // COMPONENT - PROFILE ITEM
  containerProfileItem: {
    backgroundColor: "#232323",
    paddingHorizontal: 10,
    paddingBottom: 25,
    margin: 20,
    borderRadius: 8,
    marginTop: -65,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: { height: 0, width: 0 },
  },
  matchesProfileItem: {
    width: 135,
    marginTop: -15,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  matchesTextProfileItem: {
    color: WHITE,
    textAlign: "center",
  },
  name: {
    paddingTop: 25,
    paddingBottom: 5,
    color: WHITE,
    fontSize: 15,
    textAlign: "center",
  },
  messageName: {
    paddingTop: 25,
    paddingBottom: 5,
    color: WHITE,
    fontSize: 15,
    textAlign: "left",
  },
  descriptionProfileItem: {
    color: GRAY,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 13,
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  iconProfile: {
    fontSize: 12,
    color: DARK_GRAY,
    paddingHorizontal: 10,
  },
  infoContent: {
    color: GRAY,
    fontSize: 13,
  },

  playlistsTopRow: {
    flexDirection: 'row', 
    width: '90%', 
    marginLeft: '5%', 
    marginRight: '5%', 
    // vertically align items center
    alignItems: 'center',
  },

  // CONTAINER - GENERAL
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
    position: "absolute",
  },
  top: {
    paddingTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { 
    paddingBottom: 10, 
    fontSize: 22, 
    color: WHITE,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },

  // CONTAINER - HOME
  containerHome: {
    marginHorizontal: 10,
    zIndex: 1,
    elevation: 1,
    //display: "none",
  },

  containerPlaylists: { 
    flex: 1, 
    backgroundColor: WHITE, 
    marginTop: 200 - CARD_HEIGHT, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    borderRadius: 6,
    zIndex: 3,
    elevation: 3,
    },

  // CONTAINER - MATCHES
  containerLiked: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: { marginHorizontal: 0 },
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
  },
  topIconLeft: {
    paddingLeft: 20,
  },
  topIconRight: {
    paddingRight: 20,
  },
  actionsProfile: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButtonText: {
    textTransform: "uppercase",
  },
  iconMenu: {
    alignItems: "center",
  },
  errorContainer: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    zIndex: 1,
    elevation: 1,
    height: 100,
    position: "absolute",
    backgroundColor: ERROR,
    borderBottomWidth: 1,
    borderColor: 'red',
    width: '100%'
  },
  
  testText: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    width: '100%'
  },


});
