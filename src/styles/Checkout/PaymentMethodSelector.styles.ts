import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paymentMethodsContainer: {
    paddingVertical: 12,
  },
  paymentMethodCard: {
    width: 80,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 8,
    // padding: 8,
  },
  paymentIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconText: {
    fontSize: 24,
    marginBottom: 4,
    fontWeight: 'bold',
  },
});

export default styles;
