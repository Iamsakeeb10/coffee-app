import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ImageBackground, Pressable, StatusBar, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import styles from '../../styles/coffeeDetailScreenStyle';
import {RootStackParamList} from '../../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeDetailScreen'>;

const CoffeeDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const {item} = route.params;

  const top = useSafeAreaInsets();

  const selectedSizeHandler = (i: number) => {
    setSelectedSize(i);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={{uri: item?.imageURL}}
        resizeMode="cover"
        fadeDuration={300}
        style={[styles.backgroundImage]}>
        <View style={[styles.topButtons, {paddingTop: top.top + 10}]}>
          <Pressable onPress={goBack} style={styles.iconButtonStyle}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={colors.white}
            />
          </Pressable>
          <Pressable style={styles.iconButtonStyle}>
            <Ionicons name="heart-outline" size={24} color={colors.white} />
          </Pressable>
        </View>
        <View style={styles.descTransStyle}>
          <View style={styles.horzCenter}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.subTitle}>{item?.subtitle}</Text>

            <View style={styles.tagsRow}>
              <View style={styles.row}>
                <Ionicons name="star" size={18} color={colors.circle} />
                <Text style={styles.rating}>
                  {item?.rating} ({item?.ratingCount})
                </Text>
              </View>
              {item?.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{item?.description}</Text>

        <Text style={styles.descriptionTitle}>Size</Text>
        <View style={styles.sizeRow}>
          {item?.sizes.map((size, i) => (
            <Pressable
              onPress={() => selectedSizeHandler(i)}
              key={size}
              style={[
                styles.sizeButton,
                {
                  borderColor:
                    selectedSize === i ? colors.circle : 'transparent',
                  borderWidth: 1.5,
                },
              ]}>
              <Text
                style={[
                  styles.sizeText,
                  {
                    color: selectedSize === i ? colors.circle : colors.white,
                  },
                ]}>
                {size}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={[styles.descriptionTitle, styles.priceText]}>
              Price
            </Text>
            <View style={styles.row}>
              <Text style={styles.dollarSign}>$</Text>
              <Text style={styles.price}>{item?.price}</Text>
            </View>
          </View>
          <Pressable style={styles.cartButton}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CoffeeDetailScreen;
