import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
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
import {colors} from '../../constants/colors';
import {toggleFavorite} from '../../redux/slices/favoritesSlice';
import {AppDispatch, RootState} from '../../redux/store/store';
import favoritesScreenStyles from '../../styles/favoriteScreenStyles';
import {CoffeeItem, RootStackParamList} from '../../types/types';
import {showSnack} from '../../utils/Snack';

const FavoritesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRemoveFavorite = (item: CoffeeItem) => {
    dispatch(toggleFavorite(item));
    showSnack(`${item.name} removed from favorites`, {
      backgroundColor: colors.background,
      textColor: colors.white,
      actionText: 'Okay',
      actionColor: colors.circle,
      duration: 1200,
    });
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
              onPress={() => handleRemoveFavorite(item)}
              style={favoritesScreenStyles.removeButton}>
              <Ionicons name="heart" size={24} color={colors.favorite} />
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
                  <Ionicons name="star" size={18} color={colors.circle} />
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

      <View style={favoritesScreenStyles.descriptionContainer}>
        <Text style={favoritesScreenStyles.descriptionTitle}>Description</Text>
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
      <Text style={favoritesScreenStyles.emptyTitle}>No favorites yet</Text>
      <Text style={favoritesScreenStyles.emptySubtitle}>
        Your favorite coffee items will appear here
      </Text>
    </View>
  );

  return (
    <View style={favoritesScreenStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
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
    </View>
  );
};

export default FavoritesScreen;
