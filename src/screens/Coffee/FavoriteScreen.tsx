import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import CustomAlert from '../../components/Common/CustomAlert';
import {removeFavoriteFromFirestore} from '../../firebase/service/favoritesService';
import {useTheme} from '../../hooks/useTheme';
import {useTranslation} from '../../i18n/useTranslations';
import {toggleFavorite} from '../../redux/slices/favoritesSlice';
import {AppDispatch, RootState} from '../../redux/store/store';
import favoritesScreenStyles from '../../styles/favoriteScreenStyles';
import {CoffeeItem, RootStackParamList} from '../../types/types';
import {showSnack} from '../../utils/Snack';

const FavoritesScreen: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CoffeeItem | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const {colors, isDarkMode, themeMode} = useTheme();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRemoveFavorite = async () => {
    if (selectedItem) {
      dispatch(toggleFavorite(selectedItem));

      const userId = auth().currentUser?.uid;
      if (userId) {
        await removeFavoriteFromFirestore(userId, selectedItem.id);
      }

      setTimeout(() => {
        showSnack(`${selectedItem.name} ${t('product.removedFromFavorites')}`, {
          backgroundColor: colors.accentOrange,
          textColor: colors.white,
          actionText: t('common.okay'),
          actionColor: colors.white,
        });
      }, 100);

      setSelectedItem(null);
      setShowAlert(false);
    }
  };

  const navigateToDetail = (item: CoffeeItem) => {
    navigation.navigate('CoffeeDetailScreen', {
      item,
    });
  };

  const renderFavoriteItem = ({item}: {item: CoffeeItem}) => (
    <Pressable
      onPress={() => navigateToDetail(item)}
      style={favoritesScreenStyles.favoriteItemContainer}>
      <View style={favoritesScreenStyles.imageBackgroundWrapper}>
        <ImageBackground
          source={{uri: item.imageURL}}
          resizeMode="cover"
          fadeDuration={300}
          style={favoritesScreenStyles.imageBackground}>
          <View style={favoritesScreenStyles.topButtons}>
            <Pressable
              onPress={() => {
                setSelectedItem(item);
                setShowAlert(true);
              }}
              style={favoritesScreenStyles.removeButton}>
              <Ionicons name="heart" size={24} color={colors.accentFavorite} />
            </Pressable>
          </View>
          <View style={favoritesScreenStyles.overlay}>
            <View style={favoritesScreenStyles.infoContainer}>
              <Text style={favoritesScreenStyles.title}>{item.name}</Text>
              <Text style={favoritesScreenStyles.subtitle}>
                {item.subtitle}
              </Text>

              <View style={favoritesScreenStyles.ratingRow}>
                <View style={favoritesScreenStyles.starRating}>
                  <Ionicons name="star" size={18} color={colors.accentCircle} />
                  <Text style={favoritesScreenStyles.ratingText}>
                    {item.rating} ({item.ratingCount})
                  </Text>
                </View>
                {item.tags.map(tag => (
                  <View key={tag} style={favoritesScreenStyles.tag}>
                    <Text style={favoritesScreenStyles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={[favoritesScreenStyles.descriptionContainer]}>
        <Text style={[favoritesScreenStyles.descriptionTitle]}>
          {t('product.description')}
        </Text>
        <Text style={favoritesScreenStyles.descriptionText}>
          {item.description}
        </Text>
      </View>
    </Pressable>
  );

  const renderEmptyList = () => (
    <View style={favoritesScreenStyles.emptyContainer}>
      <Ionicons
        name="heart-outline"
        size={80}
        color={favoritesScreenStyles.emptyIcon.color}
      />
      <Text
        style={[
          favoritesScreenStyles.emptyTitle,
          {
            color: colors.emptyStateTitle,
          },
        ]}>
        {t('product.noFavorites')}
      </Text>
      <Text
        style={[
          favoritesScreenStyles.emptySubtitle,
          {
            color: colors.emptyFavSubTitle,
          },
        ]}>
        {t('product.favoriteMessage')}
      </Text>
    </View>
  );

  const showStatusbar = themeMode === 'light' && !isDarkMode && showAlert;

  const backgroundColor = showStatusbar
    ? colors.alertBackground
    : showAlert && !isDarkMode
    ? colors.alertBackground
    : colors.backgroundDefault;

  const barStyle = showAlert
    ? 'light-content'
    : isDarkMode
    ? 'light-content'
    : 'dark-content';

  return (
    <View
      style={[
        favoritesScreenStyles.container,
        {
          backgroundColor: colors.backgroundDefault,
        },
      ]}>
      <StatusBar
        backgroundColor={backgroundColor}
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        barStyle={barStyle}
      />

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={[
          favoritesScreenStyles.flatListContent,
          {flex: favorites.length === 0 ? 1 : 0},
        ]}
        ListEmptyComponent={renderEmptyList}
      />
      {selectedItem && (
        <CustomAlert
          visible={showAlert}
          title={t('favorites.removeFavorite')}
          message={`${t('favorites.removeFavoriteConfirmation')} "${
            selectedItem.name
          }" ${t('favorites.fromFavorites')}`}
          onCancel={() => {
            setShowAlert(false);
            setSelectedItem(null);
          }}
          onConfirm={handleRemoveFavorite}
          confirmBgColor={colors.accentOrange}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
