import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import bottomSheetStyles from '../../styles/bottomsheetStyle';

const {height} = Dimensions.get('window');

const BottomSheet = ({visible, onClose, children, heightRatio = 0.23}: any) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: height * (1 - heightRatio),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, slideAnim, height, heightRatio]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={bottomSheetStyles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[bottomSheetStyles.sheetContainer, {top: slideAnim}]}>
        <View style={bottomSheetStyles.sheet}>
          <Pressable onPress={handleClose} />
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
