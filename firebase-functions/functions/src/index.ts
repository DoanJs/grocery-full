import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

initializeApp();

export const sendPushNotification = onCall(
  { region: "asia-southeast1" }, // ✅ Đặt region ở đây theo chuẩn v2
  async (request) => {
    const { token, ...extraData } = request.data;

    if (!token) {
      throw new Error("Missing FCM token");
    }

    const message = {
      token,
      data: extraData
    };

    try {
      const response = await getMessaging().send(message);
      console.log("✅ Notification sent:", response);
      return { success: true, response };
    } catch (error: any) {
      console.error("❌ Error sending notification:", error);
      throw new Error(error.message);
    }
  }
);
