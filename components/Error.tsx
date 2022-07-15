import { Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../assets/styles';
import useError from '../hooks/useError';

function Error() {
  const {
    errorTexts, showComponent, setShowComponent, setErrorTexts, popErrorText,
  } = useError();
  const [currentError, setCurrentError] = useState<string[] | null>(null);

  // const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    if (errorTexts.length > 0) {
      const toRef = setTimeout(() => {
        setShowComponent(true);
        clearTimeout(toRef);
        // it is good practice to clear the timeout (but I am not sure why)
      }, 250);
    }
  }, [errorTexts]);

  useEffect(() => {
    if (showComponent) {
      const toRef = setTimeout(() => {
        setShowComponent(false);
        clearTimeout(toRef);
        setErrorTexts([]);
      }, 4000);
    }
  }, [showComponent]);

  const componentTwo = () => (
    <TouchableOpacity
      style={styles.errorContainer}
      onPress={() => { setShowComponent(!showComponent); }}
    >

      <Text style={styles.testText}>{errorTexts}</Text>

    </TouchableOpacity>
  );

  return (

    showComponent ? componentTwo() : null
  );
}

export default Error;
