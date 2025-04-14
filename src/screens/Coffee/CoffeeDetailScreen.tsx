import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from '../../styles/coffeeDetailScreenStyle';
import {RootStackParamList} from '../../types/types';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeDetailScreen'>;

const CoffeeDetailScreen: React.FC<Props> = ({route}) => {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      {/* Add transparent status bar */}
      <StatusBar translucent backgroundColor="transparent" />

      <View style={[{width, height, flex: 1}]}>
        <ImageBackground
          source={{uri: item.imageURL}}
          resizeMode="cover"
          fadeDuration={300}
          style={styles.backgroundImage}>
          {/* Content can go here if needed */}
        </ImageBackground>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>With Steamed Milk</Text>

        {/* Rating and Tags */}
        <View style={styles.tagsRow}>
          <Text style={styles.rating}>⭐ 4.5 (6.8k)</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Coffee</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Milk</Text>
          </View>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Sizes */}
        <Text style={styles.descriptionTitle}>Size</Text>
        <View style={styles.sizeRow}>
          {['S', 'M', 'L'].map(size => (
            <Pressable key={size} style={styles.sizeButton}>
              <Text style={styles.sizeText}>{size}</Text>
            </Pressable>
          ))}
        </View>

        {/* Price + Button */}
        <View style={styles.footer}>
          <Text style={styles.price}>$ {item.price}</Text>
          <Pressable style={styles.cartButton}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CoffeeDetailScreen;
