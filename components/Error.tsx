import {Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../assets/styles';
import useError from '../hooks/useError';



const Error = () => {
  const { errorText, showComponent, setShowComponent, setErrorText } = useError();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (errorText) {
      const toRef = setTimeout(() => {
        setShowComponent(true);
        clearTimeout(toRef);
        // it is good practice to clear the timeout (but I am not sure why)
      }, 500);
    }
    else {
      console.log('Nope')
    }
  }, [errorText]);

  useEffect(() => {
    console.log(showComponent)
    if (showComponent) {
      const toRef = setTimeout(() => {
        setShowComponent(false);
        clearTimeout(toRef);
      }, 10000);
    }
  }, [showComponent]);

  const componentTwo = () => {
    return <Text style={styles.testText}>{errorText}</Text>;
  };

  return (
    <TouchableOpacity style={styles.errorContainer} 
      onPress={() => {console.log(showComponent); setShowComponent(!showComponent)}}>
      {showComponent ? componentTwo() : null}
    </TouchableOpacity>
  )
}

export default Error
