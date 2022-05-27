
# Swiperr
## Showcase
### Spotify Data
<img src="assets/images/readme-images/crop//crop1/showcase8.png" alt="drawing" width="200"/>
<img src="assets/images/readme-images/crop//crop1/showcase5.png" alt="drawing" width="200"/>
<img src="assets/images/readme-images/crop//crop1/showcase6.png" alt="drawing" width="200"/>
<img src="assets/images/readme-images/crop//crop1/showcase7.png" alt="drawing" width="200"/>

### Mock Data
The app can also be used without logging in


<img src="assets/images/readme-images/crop//crop1/showcase1.png" alt="drawing" width="200"/>
<img src="assets/images/readme-images/crop//crop1/showcase2.png" alt="drawing" width="200"/>
<img src="assets/images/readme-images/crop//crop1/showcase3.png" alt="drawing" width="200"/>
<img src="assets/images/readme-images/crop//crop1/showcase4.png" alt="drawing" width="200"/>



## How to run
1. Clone the repo and navigate into the folder
2. Make sure node and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is installed.
3. Install yarn with `npm i -g yarn`
4. Install expo-cli with `npm i -g expo-cli`
5. Run `yarn` to install package dependencies
6. Signup for [spotify developer](https://developer.spotify.com/dashboard/) and create a new project
7. Create a `.env` file next to the `.env.example` and place your client id and client secret into it (given from the spotify developer project)
8. Make sure your redirect URIs match the ones in .env file. Theese redirect URIs may vary (tested on MacOS; known issues with WSL 2). To find theese uris you can run `yarn start` in the project root showing the the URI to the phone. By pressing `w` you can view the web URI. The example URIs are most common and standard for MacOS. ![metro](assets/images/readme-images/metro.png)
9.  Inside the project, add two redirect URIs by pressing edit settings followed by add redirect URI. Paste `exp://localhost:19000/` (Phone) and `http://localhost:19006/` (Web). Or the corresponding URI found in step 7. 
10. Run `yarn start` in the terminal to start the app
11. Press `w`, `a`, or `i` to run in web, android or ios (Note: When running in web, rightclick and inspect the site and switch to phone view and refresh the page to make it fit the screen)

## How to use
- When first starting the app it only contains mock data
- To login and fetch Spotify data one can press the login button
- The profile tab is now filled with you spotify profile information
- The explore tab now containst cards with recomendations from spotify. Theese are based on two of your top songs (2 out of top 10), two of your top artists (2 out of top 10) and one genre from your top songs.
- By swiping right on an image you like it and it will appear in your spotify liked songs folder.
- Swiping left currently does nothing
- The Liked and Chat page currently only includes mock data

Note: the [avlailible genres](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendation-genres) does not include all spotify genres. 

## Todo
See [Todo](Todo.md)

## Issues?
Feel free to post an issue