export type PaymentFormData = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
  paymentMethod: string;
};

export type PaymentFormProps = {
  onSubmit: (data: PaymentFormData) => void;
  goBack: () => void;
  setIsDirty: any;
  currentStep: number;
};
