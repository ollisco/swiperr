import React, { useContext } from 'react';
import TrackPlayer from 'react-native-track-player';



const snippetContext: React.Context<{
  addTrackAndPlay: (url: string) => Promise<void>
  addTrack: (url: string) => Promise<void>
  playTrack: () => Promise<void>
  pauseTrack: () => Promise<void>
  stopTrack: () => Promise<void>
  skipToNextTrack : () => Promise<void>
  clearQueue: () => Promise<void>
}> = React.createContext({

});

interface Props {
  children: React.ReactNode
}

export const SnippetHandler: React.ReactNode = ({ children }: Props) => {
  

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true
  });
  }
  // add track
  const addTrack = async (url: string) => {
    const track = { url };
    await TrackPlayer.add(track);
  }
  // play track
  const playTrack = async () => {
    await TrackPlayer.play();
  }
  // pause track
  const pauseTrack = async () => {
    await TrackPlayer.pause();
  }
  // stop track
  const stopTrack = async () => {
    await TrackPlayer.stop();
  }
  // skip to next track
  const skipToNextTrack = async () => {
    await TrackPlayer.skipToNext();
  }
  // clear  queue
  const clearQueue = async () => {
    await TrackPlayer.removeUpcomingTracks();
  }

  const addTrackAndPlay = async (url: string) => {
    await clearQueue();
    await addTrack(url);
    await playTrack();
  }


  setupPlayer();
  return (
      <snippetContext.Provider value={{
        addTrackAndPlay,
        addTrack,
        playTrack,
        pauseTrack,
        stopTrack,
        skipToNextTrack,
        clearQueue,
      }}>
      {children}
      </snippetContext.Provider>
  );
}

export default function useSnippetContext() {
  console.log("Using Native snippets");
  return useContext(snippetContext);
}