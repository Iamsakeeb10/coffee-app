import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const fetchNetInfo = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);
      } catch (error) {
        console.log('Error fetching network info:', error);
      }
    };

    fetchNetInfo();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return {isConnected};
};

export default useNetInfo;
