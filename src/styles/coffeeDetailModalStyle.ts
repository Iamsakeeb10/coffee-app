import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: width,
    height: height * 0.45,
    resizeMode: 'cover',
  },
  topButtons: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    // backgroundColor: 'white',
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

export default styles;
