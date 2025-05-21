import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    height: 60,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    height: 60,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    width: '48%',
  },

  halfInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 60,
  },
});

export default styles;
