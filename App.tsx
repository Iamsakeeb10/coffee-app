import {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import store, {persistor} from './src/redux/store/store';

import {configureGoogleSignIn, initApp} from './src/utils/initialize';

const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
    initApp();
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
