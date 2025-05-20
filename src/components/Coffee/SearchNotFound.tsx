import React from 'react';
import {StyleSheet, View} from 'react-native';
import {spacing} from '../../constants/spacing';
import {useTheme} from '../../hooks/useTheme';
import {NoSearchResultFoundProps} from '../../types/Common/NoSearchResultFoundProps.type';
import {heightPercent} from '../../utils/dimensions';
import EmptyState from '../Common/EmptyState'; // Adjust the import path as needed

const NoSearchResultFound: React.FC<NoSearchResultFoundProps> = ({
  message = 'No coffee found',
  iconName = 'bag-handle-outline',
  iconSize = 80,
  iconColor,
  containerStyle,
  messageStyle,
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <EmptyState
        iconName={iconName}
        iconSize={iconSize}
        iconColor={iconColor || colors.gray200}
        title={message}
        containerStyle={containerStyle}
        titleStyle={messageStyle}
      />
    </View>
  );
};

export default NoSearchResultFound;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: heightPercent(10),
    paddingHorizontal: spacing.spacing20,
  },
});
