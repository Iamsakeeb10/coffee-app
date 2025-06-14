export type RootStackParamList = {
  OrderSuccessScreen: {
    orderNumber: string;
    estimatedDelivery: string;
    customerInfo: {
      name: string;
      phone: string;
      address: string;
      email: string;
    };
    orderSummary: {
      totalItems: number;
      totalAmount: number;
      items: {
        name: string;
        quantity: number;
        price: number;
      }[];
    };
    orderDate: string;
  };
  OrderDetailsScreen: {orderId: string};
  // other screens...
};
