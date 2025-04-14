import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    // Removed paddingTop to allow image to go behind status bar
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    color: colors.white,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: colors.gray,
    marginVertical: 5,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  rating: {
    color: 'yellow',
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    color: colors.white,
    fontSize: 12,
  },
  descriptionTitle: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  description: {
    color: colors.gray,
    marginBottom: 16,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  sizeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
  sizeText: {
    color: colors.white,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  cartButton: {
    backgroundColor: 'coral',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  cartText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
