import React from 'react';
import {Dimensions, ImageBackground, Text, View} from 'react-native';
import {styles} from '../../styles/introScreenStyles';

const {width, height} = Dimensions.get('screen');

interface IntroItemProps {
  item: {
    id: number;
    image: any;
    title: string;
    description: string;
  };
}

const IntroItem: React.FC<IntroItemProps> = ({item}) => {
  return (
    <View style={[styles.pageContainer, {width, height}]}>
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        fadeDuration={300}
        style={styles.imageBackground}>
        <View style={styles.contentWrapper}>
          <Text style={[styles.title]}>{item.title}</Text>
          <Text style={[styles.description, {maxWidth: width * 0.7}]}>
            {item.description}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default IntroItem;
