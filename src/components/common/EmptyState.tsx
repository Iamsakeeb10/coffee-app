import React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/emptyState.style';
import {EmptyStateProps} from '../../types/Common/EmptyState.type';

const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'alert-circle-outline',
  iconSize = 80,
  iconColor,
  title,
  subtitle,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.emptyContainer, containerStyle]}>
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor || colors.gray200}
      />
      <Text
        style={[
          styles.emptyTitle,
          titleStyle,
          {color: colors.emptyStateTitle},
        ]}>
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            styles.emptySubtitle,
            subtitleStyle,
            {color: colors.textMuted},
          ]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default EmptyState;
