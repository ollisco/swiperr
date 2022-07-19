import React, { useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';


const snippetContext: React.Context<{
  addTrackAndPlay: (url: string) => Promise<void>,
  pause: () => Promise<void>,
  play: () => Promise<void>
}> = React.createContext({
  addTrackAndPlay: (url: string) => new Promise<void>(() => {}),
  pause: () => new Promise<void>(() => {}),
  play: () => new Promise<void>(() => {})
}); 

interface Props {
  children: React.ReactNode
}

export const SnippetProvider: React.ReactNode = ({ children }: Props) => {
  const [audio, setAudio] = useState<Audio.Sound | null>(null);

  const addTrackAndPlay = async (url: string) =>  {
    console.log('Loading Sound');
    
    if (audio) {
      await pause();
    }

    const { sound } = await Audio.Sound.createAsync(
      {uri: url}
    );
    setAudio(sound);
    console.log('Playing Sound');
    await sound.playAsync(); 
  }
  const play = async () => {
    if (audio) {
      await audio.playAsync();
    }
  }

  const pause = async () => {
    if (audio) {
      await audio.pauseAsync();
    }
  }

  useEffect(() => {
    return audio
      ? () => {
          console.log('Unloading audio');
          audio.unloadAsync(); }
      : undefined;
  }, [audio]);


  return (
    <snippetContext.Provider value={{
      addTrackAndPlay,
      pause,
      play,
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
