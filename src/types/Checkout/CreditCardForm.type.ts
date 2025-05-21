import {PaymentFormData} from './PaymentForm.type';

export interface CreditCardFormProps {
  form: {
    cardholderName: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
  cardType?: 'Visa' | 'MasterCard' | 'Amex' | 'Discover' | string;
  onChange: (field: keyof PaymentFormData, value: string) => void;
  saveCard: boolean;
  onToggleSaveCard: () => void;
  errors?: {
    cardholderName?: string;
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
    cardType?: string;
  };
}
