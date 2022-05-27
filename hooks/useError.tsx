
import React, { createContext, useContext, useState } from 'react';

const ErrorContext: React.Context<{
    errorText: string | null;
    setErrorText: (errorText: string | null) => void;
    showComponent: boolean | null,
    setShowComponent: any;
}> = createContext({
    errorText: '',
    setErrorText: () => {},
    showComponent: null,
    setShowComponent: () => {},
});

interface Props {
    children: React.ReactNode
  }

export const ErrorProvider: React.ReactNode = ({ children }: Props) => {
    const [errorText, setErrorText] = useState<string | null>('');
    const [showComponent, setShowComponent] = useState(false);
    return (
        <ErrorContext.Provider value={{ 
            errorText, 
            setErrorText,
            showComponent, 
            setShowComponent,
        }}>
            {children}
        </ErrorContext.Provider>
    );
}


export default function useError() {
    return useContext(ErrorContext);
}