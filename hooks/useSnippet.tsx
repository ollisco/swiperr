import React, { useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const snippetContext: React.Context<{
  addTrackAndPlay: (url: string) => Promise<void>,
  pause: () => Promise<void>,
  play: () => Promise<void>,
  replay: () => Promise<void>
}> = React.createContext({
  addTrackAndPlay: (url: string) => new Promise<void>(() => {}),
  pause: () => new Promise<void>(() => {}),
  play: () => new Promise<void>(() => {}),
  replay: () => new Promise<void>(() => {}),
});

interface Props {
  children: React.ReactNode
}

export const SnippetProvider: React.ReactNode = ({ children }: Props) => {
  const [audio, setAudio] = useState<Audio.Sound | null>(null);

  const addTrackAndPlay = async (url: string) => {
    // console.log('Loading Sound');

    // wait for pause then play
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
      {
        shouldPlay: true,
        isLooping: false,
        isMuted: false,
        volume: 1,
      },
    );
    setAudio(sound);  
  };
  const play = async () => {
    if (audio) {
      await audio.playAsync();
    }
  };

  const pause = async () => {
    if (audio) {
      await audio.pauseAsync();
    }
  };

  const replay = async () => {
    if (audio) {
      await audio.stopAsync();
      await audio.playAsync();
    } 
  }

  useEffect(() => (audio
    ? () => {
      // console.log('Unloading audio');
      audio.unloadAsync();
    }
    : undefined), [audio]);

  return (
    <snippetContext.Provider value={{
      addTrackAndPlay,
      pause,
      play,
      replay,
    }}
    >
      {children}
    </snippetContext.Provider>
  );
};

export default function useSnippetContext() {
  // console.log('Using Native snippets');
  return useContext(snippetContext);
}
