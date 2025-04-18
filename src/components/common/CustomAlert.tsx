import React, {useEffect, useRef} from 'react';
import {Animated, Modal, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../constants/colors';
import styles from '../../styles/customAlertStyle';
import {AlertProps} from '../../types/types';

const CustomAlert: React.FC<AlertProps> = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  confirmBgColor = colors.btnRed,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[styles.container, {transform: [{scale: scaleAnim}]}]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText || 'Cancel'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, {backgroundColor: confirmBgColor}]}
              onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText || 'Remove'}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
