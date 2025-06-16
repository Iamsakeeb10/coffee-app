import notifee, {
  AndroidImportance,
  AndroidStyle,
  TriggerType,
} from '@notifee/react-native';
import {Platform} from 'react-native';

export class NotificationService {
  static async createOrderChannel() {
    // Create a channel for order notifications (Android)
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'orders',
        name: 'Order Updates',
        description: 'Notifications for order confirmations and updates',
        importance: AndroidImportance.HIGH,
        sound: 'notify',
        vibration: true,
        vibrationPattern: [300, 500, 300, 500], // Must be even number of values (off, on, off, on)
      });
    }
  }

  static async showOrderConfirmationNotification(orderData) {
    try {
      // Ensure channel exists
      await this.createOrderChannel();

      const {orderNumber, customerInfo, orderSummary, estimatedDelivery} =
        orderData;

      // Create beautiful notification
      await notifee.displayNotification({
        title: '🎉 Order Confirmed!',
        body: `Order #${orderNumber} has been placed successfully. Expected delivery: ${estimatedDelivery}`,
        data: {
          orderNumber,
          type: 'order_confirmation',
        },
        android: {
          channelId: 'orders',
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          sound: 'notify',
          vibrationPattern: [300, 500, 300, 500], // Must be even number of values
          color: '#4F46E5', // Beautiful indigo color
          largeIcon: 'https://cdn-icons-png.flaticon.com/512/3514/3514447.png', // Shopping bag icon
          style: {
            type: AndroidStyle.BIGTEXT,
            text: `🛍️ Order Details:\n\n📦 Order Number: #${orderNumber}\n👤 Customer: ${customerInfo.name}\n📍 Address: ${customerInfo.address}\n💰 Total: $${orderSummary.totalAmount}\n📅 Expected Delivery: ${estimatedDelivery}\n\nThank you for your order! We'll notify you when it's on the way.`,
          },
          actions: [
            {
              title: '📋 View Order',
              pressAction: {id: 'view_order'},
              icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
            },
            // {
            //   title: '📞 Contact Support',
            //   pressAction: {id: 'contact_support'},
            //   icon: 'https://cdn-icons-png.flaticon.com/512/3514/3514363.png',
            // },
          ],
        },
        ios: {
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
          sound: 'default',
          badge: 1,
          categoryId: 'order_confirmation',
          attachments: [
            {
              id: 'order_image',
              url: 'https://cdn-icons-png.flaticon.com/512/3514/3514447.png',
              typeHint: 'public.png',
            },
          ],
        },
      });

      console.log('Order confirmation notification sent successfully');
    } catch (error) {
      console.error('Failed to send order confirmation notification:', error);
    }
  }

  static async scheduleDeliveryReminder(orderData, deliveryDate) {
    try {
      const {orderNumber} = orderData;

      // Schedule notification for delivery day
      const deliveryTime = new Date(deliveryDate);
      deliveryTime.setHours(9, 0, 0, 0); // 9 AM on delivery day

      // Create a trigger for the scheduled notification
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: deliveryTime.getTime(),
      };

      await notifee.createTriggerNotification(
        {
          title: '📦 Delivery Today!',
          body: `Your order #${orderNumber} is expected to arrive today. Be ready to receive it!`,
          data: {
            orderNumber,
            type: 'delivery_reminder',
          },
          android: {
            channelId: 'orders',
            importance: AndroidImportance.HIGH,
            color: '#10B981', // Green color for delivery
            largeIcon:
              'https://cdn-icons-png.flaticon.com/512/2769/2769339.png', // Delivery truck icon
          },
          ios: {
            sound: 'default',
            badge: 1,
          },
        },
        trigger,
      );

      console.log('Delivery reminder scheduled successfully');
    } catch (error) {
      console.error('Failed to schedule delivery reminder:', error);
    }
  }

  static async setupNotificationActions() {
    // iOS notification categories
    if (Platform.OS === 'ios') {
      await notifee.setNotificationCategories([
        {
          id: 'order_confirmation',
          actions: [
            {
              id: 'view_order',
              title: 'View Order',
              foreground: true,
            },
            {
              id: 'contact_support',
              title: 'Contact Support',
              foreground: true,
            },
          ],
        },
      ]);
    }
  }

  static async handleNotificationPress(notification) {
    const {data} = notification;

    switch (data?.type) {
      case 'order_confirmation':
        // Navigate to order details or order history
        console.log('Navigate to order details:', data.orderNumber);
        break;
      case 'delivery_reminder':
        // Navigate to order tracking
        console.log('Navigate to order tracking:', data.orderNumber);
        break;
      default:
        console.log('Unknown notification type');
    }
  }
}
