
import React, { createContext, useContext, useState } from 'react';

const ErrorContext: React.Context<{
    errorTexts: string[];
    addErrorText: (errorText: string) => void;
    popErrorText: () => string | undefined;
    setErrorTexts: any;
    showComponent: boolean | null,
    setShowComponent: any;
}> = createContext({
    errorTexts: [],
    addErrorText: () => {},
    popErrorText: () => {},
    setErrorTexts: () => {},
    showComponent: null,
    setShowComponent: () => {},

});

interface Props {
    children: React.ReactNode
  }

export const ErrorProvider: React.ReactNode = ({ children }: Props) => {
    const [errorTexts, setErrorTexts] = useState<string[]>([]);
    const [showComponent, setShowComponent] = useState(false);

    function addErrorText(text: string) {
        const newArray = errorTexts.concat(text);
        setErrorTexts(newArray);
    }

    function popErrorText() {
        // pop item from array
        if (errorTexts.length > 0) {
            const item = errorTexts[0]
            const newArray = errorTexts.slice(1)
            setErrorTexts(newArray);
            return item
        }
        console.log('Fatal: no items')
    }

    return (
        <ErrorContext.Provider value={{ 
            errorTexts, 
            addErrorText,
            popErrorText,
            showComponent, 
            setShowComponent,
            setErrorTexts,
        }}>
            {children}
        </ErrorContext.Provider>
    );
}


export default function useError() {
    return useContext(ErrorContext);
}