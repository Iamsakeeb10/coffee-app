import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../constants/colors';
import {saveCartItemToFirestore} from '../../firebase/service/cartService';
import {
  removeFavoriteFromFirestore,
  saveFavoriteToFirestore,
} from '../../firebase/service/favoritesService';
import {useTranslation} from '../../i18n/useTranslations';
import {addToCart} from '../../redux/slices/cartSlice';
import {toggleFavorite} from '../../redux/slices/favoritesSlice';
import {AppDispatch, RootState} from '../../redux/store/store';
import styles from '../../styles/coffeeDetailScreenStyle';
import {RootStackParamList} from '../../types/types';
import {showSnack} from '../../utils/Snack';
import {triggerScaleAnimation} from '../../utils/animations';
import {getFullSize} from '../../utils/helpers';

type Props = NativeStackScreenProps<RootStackParamList, 'CoffeeDetailScreen'>;

const CoffeeDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const {item} = route.params;

  const top = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const {t} = useTranslation();

  const isFavorite = favorites.some(favItem => favItem.id === item?.id);

  const selectedSizeHandler = (i: number) => {
    setSelectedSize(i);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = () => {
    if (!item) return;

    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const isCurrentlyFavorite = favorites.some(fav => fav.id === item.id);

    dispatch(toggleFavorite(item));

    if (isCurrentlyFavorite) {
      removeFavoriteFromFirestore(userId, item.id);
    } else {
      saveFavoriteToFirestore(userId, item);
    }

    console.log('Saving favorite to Firestore:', item);

    showSnack(
      isFavorite
        ? `${item.name} ${t('product.removedFromFavorites')}`
        : `${item.name} ${t('product.addedToFavorites')}`,
      {
        backgroundColor: colors.background,
        textColor: colors.white,
        actionText: t('common.okay'),
        actionColor: colors.circle,
        duration: 1200,
      },
    );
  };

  const handleAddToCart = () => {
    const selectedSizeLabel = item.sizes[0];
    const price = item.priceBySize[selectedSizeLabel];
    const userId = auth().currentUser?.uid;

    if (!userId) return;

    triggerScaleAnimation(scaleValue);

    const cartItem = {
      id: '', // will be generated inside slice
      coffeeId: item.id,
      name: item.name,
      subtitle: item.subtitle,
      imageURL: item.imageURL,
      size: selectedSizeLabel,
      price: price,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));

    // Sync to Firestore
    const cartItemId = `${item.id}_${selectedSizeLabel}`;
    saveCartItemToFirestore(userId, {
      ...cartItem,
      id: cartItemId,
    });

    const fullSize = getFullSize(selectedSizeLabel);
    const sizeLabel = fullSize.charAt(0).toUpperCase() + fullSize.slice(1);

    showSnack(`${sizeLabel} ${item.name} ${t('product.addedToCart')}`, {
      backgroundColor: colors.background,
      textColor: 'white',
      actionText: t('common.okay'),
      actionColor: colors.circle,
    });
  };

  const animatedStyle = {
    transform: [{scale: scaleValue}],
  };

  return (
    <View style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={{uri: item?.imageURL}}
        resizeMode="cover"
        fadeDuration={300}
        style={styles.backgroundImage}>
        <View
          style={[
            styles.topButtons,
            {
              paddingTop: top.top + 20,
            },
          ]}>
          <Pressable onPress={goBack} style={styles.iconButtonStyle}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={colors.white}
            />
          </Pressable>
          <Pressable
            onPress={handleToggleFavorite}
            style={styles.iconButtonStyle}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.favorite : colors.white}
            />
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
        <Text style={styles.descriptionTitle}>{t('product.description')}</Text>
        <Text style={styles.description}>{item?.description}</Text>

        <Text style={styles.descriptionTitle}>{t('product.size')}</Text>
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
              {t('product.price')}
            </Text>
            <View style={styles.row}>
              <Text style={styles.dollarSign}>$</Text>
              <Text style={styles.price}>
                {item?.priceBySize?.[item.sizes[selectedSize]].toFixed(2)}
              </Text>
            </View>
          </View>
          <Animated.View style={[styles.cartButton, animatedStyle]}>
            <Pressable
              onPress={handleAddToCart}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.cartText}>{t('product.addToCart')}</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default CoffeeDetailScreen;
