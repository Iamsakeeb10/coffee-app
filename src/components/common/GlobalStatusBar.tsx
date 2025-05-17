import React from 'react';
import {StatusBar} from 'react-native';
// import {colors} from '../../constants/colors';

const GlobalStatusBar = () => {
  return (
    <StatusBar
      barStyle="light-content"
      // backgroundColor={colors.backgroundDefault}
      backgroundColor="#0C0F14"
      translucent={true}
    />
  );
};

export default GlobalStatusBar;

// import React from 'react';
// import {StatusBar} from 'react-native';
// import {useTheme} from '../../hooks/useTheme';

// const GlobalStatusBar: React.FC = () => {
//   const {isDarkMode, colors} = useTheme();

//   return (
//     <StatusBar
//       translucent={true}
//       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//       backgroundColor={
//         isDarkMode ? colors.backgroundDefault : colors.backgroundDefault
//       }
//     />
//   );
// };

// export default GlobalStatusBar;
