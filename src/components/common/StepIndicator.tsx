import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {staticColors} from '../../constants/colors';
import {useTheme} from '../../hooks/useTheme';
import styles from '../../styles/StepIndicator.style';

type StepIndicatorProps = {
  currentStep: number;
  slideToStep: (targetStep: number) => void;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  slideToStep,
}) => {
  const steps = [
    {label: 'Shipping', number: 1},
    {label: 'Payment', number: 2},
    {label: 'Review', number: 3},
  ];

  const {colors} = useTheme();

  return (
    <View style={styles.stepIndicatorContainer}>
      <View style={styles.stepsWrapper}>
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={styles.stepItem}
                onPress={() => slideToStep(step.number)}>
                <View
                  style={[
                    styles.stepCircle,
                    {
                      backgroundColor:
                        isCompleted || isActive
                          ? colors.accentBadge
                          : colors.backgroundCard,
                      borderColor:
                        isCompleted || isActive
                          ? colors.gray300
                          : colors.accentCircle,
                    },
                  ]}>
                  {isCompleted ? (
                    <Text style={[styles.checkmark, {color: '#FFFFFF'}]}>
                      ✓
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        {
                          color: isActive ? '#FFFFFF' : colors.white,
                        },
                      ]}>
                      {step.number}
                    </Text>
                  )}
                </View>

                {/* Step Label */}
                <Text
                  style={[
                    styles.stepLabel,
                    {
                      color:
                        isActive || isCompleted
                          ? colors.textPrimary
                          : colors.textSecondary,
                      fontWeight: isActive ? '600' : '400',
                    },
                  ]}>
                  {step.label}
                </Text>
              </TouchableOpacity>

              {/* Progress Line between steps */}
              {index < steps.length - 1 && (
                <View style={styles.lineContainer}>
                  <View
                    style={[
                      styles.progressLine,
                      {backgroundColor: staticColors.borderColor},
                    ]}
                  />
                  <View
                    style={[
                      styles.progressLineFilled,
                      {
                        backgroundColor: colors.backgroundInput,
                        width: isCompleted ? '100%' : '0%',
                      },
                    ]}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

export default StepIndicator;
