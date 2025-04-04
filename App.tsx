import {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import store, {persistor} from './src/redux/store/store';

const App = () => {
  useEffect(() => {
    const init = async () => {
      await BootSplash.hide({fade: true});
    };

    init();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
