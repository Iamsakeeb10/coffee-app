import notifee, {EventType} from '@notifee/react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import store, {persistor} from './src/redux/store/store';
import {NotificationService} from './src/services/notificationService';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {configureGoogleSignIn, initApp} from './src/utils/initialize';

const App = () => {
  useEffect(() => {
    configureGoogleSignIn();
    initApp();

    const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          NotificationService.handleNotificationPress(detail.notification);
          break;
        case EventType.ACTION_PRESS:
          console.log('User pressed action', detail.pressAction?.id);
          if (detail.pressAction?.id === 'view_order') {
            console.log('Navigate to order details');
          } else if (detail.pressAction?.id === 'contact_support') {
            console.log('Contact support');
          }
          break;
      }
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;

      if (type === EventType.ACTION_PRESS && pressAction?.id === 'view_order') {
        console.log('Background action: view order');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
