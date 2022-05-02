
# Swiperr
## How to run
1. Clone the repo and navigate into the folder
2. Make sure node and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is installed.
3. Install yarn with `npm i -g yarn`
4. Install expo-cli with `npm i -g expo-cli`
5. Run `yarn` to install package dependencies
6. Signup for [spotify developer](https://developer.spotify.com/dashboard/) and create a new project
7. Create a `.env` file next to the `.env.example` and place your client id and client secret into it (given from the spotify developer project)
8. Inside the project, add two redirect URIs by pressing the edit settings button. Paste `exp://localhost:19000/` and `http://localhost:19006/`
9. Run `yarn start` in the terminal to start the app
10. Press w, a, or i to run in web, android or ios (Note: When running in web, rightclick and inspect the site and switch to phone view and refresh the page to make it fit the screen)

## How to use
- When first starting the app it only contains mock data
- To login and fetch Spotify data one can press the top right button 
- The profile tab is now filled with you spotify profile information
- The explore tab now containst cards with recomendations from spotify. Theese are based on two of your top songs (2 out of top 10), two of your top artists (2 out of top 10) and one genre from your top songs.

Note: the [avlailible genres](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendation-genres) does not include all spotify genres. 

## Todo
See [Todo](Todo.md)

## Issues?
Feel free to post an issue