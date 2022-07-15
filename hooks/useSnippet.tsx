import React, { useContext, useEffect, useState } from 'react';

const snippetContext: React.Context<{
  addTrackAndPlay: any
}> = React.createContext({

});

interface Props {
  children: React.ReactNode
}

export const SnippetProvider: React.ReactNode = ({ children }: Props) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);

  const toggle = () => setPlaying(!playing);

  const fadeDuration = 4000;
  const ticks = 20;
  const volumeIncrement = ticks / fadeDuration;

  const snippetLength = 30000;


  const play = () => {
    if (audio) {
      return new Promise(res=>{
        audio.play()
        audio.onended = res
      })
    }
  }
  const pause = () => {
    if (audio) {
      return new Promise(res=>{
        audio.play()
        audio.onended = res
      })
    }
  }
  
  const fadeInTick = () => {
    if (audio) {
      if (audio.volume + volumeIncrement > 1) {
        audio.volume = 1;
      } else {
        audio.volume += volumeIncrement;
      }
    }
  }
      
  const fadeOutTick = () => {
    if (audio) {
      if (audio.volume - volumeIncrement < 0) {
        audio.volume = 0;
      } else {
        audio.volume -= volumeIncrement;
      }
    }
  }

  const attachFadeIn = () => {
    audio!.volume = 0
    const fadeInInterval = setInterval(fadeInTick, fadeDuration/ticks);
    setTimeout(() => {
      clearInterval(fadeInInterval);
    }, fadeDuration);
  }

  const attachFadeOut = () => {
    const fadeOutInterval = setInterval(fadeOutTick, fadeDuration/ticks);
    setTimeout(() => {
      clearInterval(fadeOutInterval);
    }, fadeDuration);
  }

  useEffect(() => {
    if (audio) {
      attachFadeIn();
      setTimeout(() => {
        attachFadeOut();
      }, snippetLength-fadeDuration); 
      audio.play();
    }
  }, [audio]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }
  }, []);

  const addTrackAndPlay = async (url: string) => {
    // async
    if (audio) {
      audio.pause();
    }
    setAudio(new Audio(url));
  };

  return (
    <snippetContext.Provider value={{
      addTrackAndPlay,
    }}
    >
      {children}
    </snippetContext.Provider>
  );
};

export default function useSnippetContext() {
  // console.log('Using Web snippets');
  return useContext(snippetContext);
}
