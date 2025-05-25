import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  stepIndicatorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  stepsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 6,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 16,
  },
  lineContainer: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
    marginTop: 16,
    position: 'relative',
  },
  progressLine: {
    height: 2,
    width: '100%',
  },
  progressLineFilled: {
    height: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default styles;
