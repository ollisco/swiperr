import {createContext, FC, useState} from 'react';
import { VolumeContextT } from '../types';

export const VolumeContext = createContext<VolumeContextT | null>(null);

const VolumeProvider: FC<React.ReactNode> = ({ children }) => {
  const [volume, setVolume] = useState<number>(0);

  const updateVolume = (value: number) => {
    setVolume(value);
  }

  return (
    <VolumeContext.Provider value={{ volume, updateVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};



export default  VolumeProvider;