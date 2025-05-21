export type ShippingFormData = {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
};

export type ShippingFormProps = {
  onSubmit: (data: ShippingFormData) => void;
};
