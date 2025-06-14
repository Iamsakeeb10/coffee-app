// firebase/orderHistory.ts
import firestore from '@react-native-firebase/firestore';
import {OrderHistory} from '../../redux/slices/orderHistorySlice';

export const saveOrderHistoryToFirestore = async (
  userId: string,
  order: Omit<OrderHistory, 'id'>,
) => {
  try {
    const docRef = await firestore()
      .collection('users')
      .doc(userId)
      .collection('orderHistory')
      .add({
        ...order,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    return docRef.id; // optional: if you want to save this ID locally too
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    throw error;
  }
};

// export const fetchOrderHistoryFromFirestore = async (userId: string) => {
//   try {
//     const snapshot = await firestore()
//       .collection('users')
//       .doc(userId)
//       .collection('orderHistory')
//       .orderBy('createdAt', 'desc')
//       .get();

//     const orders: OrderHistory[] = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...(doc.data() as Omit<OrderHistory, 'id'>),
//     }));

//     return orders;
//   } catch (error) {
//     console.error('Failed to fetch orders from Firestore:', error);
//     return [];
//   }
// };

export const fetchOrderHistoryFromFirestore = async (userId: string) => {
  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('orderHistory')
      .orderBy('createdAt', 'desc')
      .get();

    const orders: OrderHistory[] = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        orderNumber: data.orderNumber,
        orderDate: data.orderDate,
        estimatedDelivery: data.estimatedDelivery,
        actualDelivery: data.actualDelivery,
        status: data.status,
        customerInfo: data.customerInfo,
        items: data.items,
        totalItems: data.totalItems,
        totalAmount: data.totalAmount,
        paymentMethod: data.paymentMethod,
        // Convert Firestore timestamp to ISO string for consistent sorting
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.orderDate,
      } as OrderHistory;
    });

    // Sort by createdAt if available, fallback to orderDate
    return orders.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || a.orderDate).getTime();
      const dateB = new Date(b.createdAt || b.orderDate).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    console.error('Failed to fetch orders from Firestore:', error);
    return [];
  }
};
