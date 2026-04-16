import { useEffect, useState } from "react";
import { getNotificationsApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export function useNotifications() {
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await getNotificationsApi();
      setNotifications(res.data);
    } catch (err: any) {
      console.error(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!user || loading) return;
    fetchNotifications();
  }, [user, loading]);

  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    refresh: fetchNotifications,
  };
}
