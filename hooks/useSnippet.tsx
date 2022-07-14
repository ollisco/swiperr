import React, { useContext, useEffect, useState } from 'react';



const snippetContext: React.Context<{
  addTrackAndPlay: (url: string) => Promise<void>
}> = React.createContext({

});

interface Props {
  children: React.ReactNode
}


export const SnippetHandler: React.ReactNode = ({ children }: Props) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState<boolean>(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        if (audio) {
            playing ? audio.play() : audio.pause();
        }
      }, [playing]
    );
  
    useEffect(() => {
			if (audio) {
				audio.addEventListener('ended', () => setPlaying(false));
				return () => {
					audio.removeEventListener('ended', () => setPlaying(false));
				};
			}
    }, []);

    const addTrackAndPlay = async (url: string) => {
			await setAudio(new Audio(url));
			await setPlaying(true);
    }

   return (
      <snippetContext.Provider value={{
        addTrackAndPlay,
    
      }}>
      {children}
      </snippetContext.Provider>
  );
}

export default function useSnippetContext() {
  console.log("Using Web snippets");
  return useContext(snippetContext);
}