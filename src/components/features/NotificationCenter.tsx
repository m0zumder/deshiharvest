import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, Clock, Package, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  user_id: string;
  type: "order_received" | "order_confirmed" | "delivery_reminder" | "payment_received";
  title: string;
  message: string;
  sms_sent: boolean;
  read: boolean;
  created_at: string;
}

const typeIcons = {
  order_received: Package,
  order_confirmed: CheckCircle,
  delivery_reminder: Clock,
  payment_received: DollarSign,
};

const typeColors = {
  order_received: "bg-primary text-primary-foreground",
  order_confirmed: "bg-success text-success-foreground",
  delivery_reminder: "bg-warning text-warning-foreground",
  payment_received: "bg-accent text-accent-foreground",
};

export const NotificationCenter = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      
      // Subscribe to real-time notifications
      const channel = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('New notification:', payload);
            setNotifications(prev => [payload.new as Notification, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching notifications:', error);
        return;
      }

      setNotifications((data || []) as Notification[]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        return;
      }

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (error) {
        console.error('Error marking all as read:', error);
        return;
      }

      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      order_received: { en: "Order Received", bn: "অর্ডার প্রাপ্ত" },
      order_confirmed: { en: "Order Confirmed", bn: "অর্ডার নিশ্চিত" },
      delivery_reminder: { en: "Delivery Reminder", bn: "ডেলিভারি অনুস্মারক" },
      payment_received: { en: "Payment Received", bn: "পেমেন্ট প্রাপ্ত" },
    };
    return labels[type as keyof typeof labels]?.en || type;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">
            {t("Notifications", "বিজ্ঞপ্তি")}
          </h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            {t("Mark all as read", "সব পঠিত হিসেবে চিহ্নিত করুন")}
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="text-center p-8">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {t("No Notifications", "কোন বিজ্ঞপ্তি নেই")}
          </h3>
          <p className="text-muted-foreground">
            {t("You're all caught up! Notifications will appear here.", "আপনি সব আপডেট পেয়েছেন! বিজ্ঞপ্তিগুলি এখানে প্রদর্শিত হবে।")}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const TypeIcon = typeIcons[notification.type];
            
            return (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !notification.read ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${typeColors[notification.type]}`}>
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">
                            {notification.title}
                          </CardTitle>
                          {notification.sms_sent && (
                            <Badge variant="outline" className="text-xs">
                              📱 SMS
                            </Badge>
                          )}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <CardDescription>
                          {getTypeLabel(notification.type)} • {" "}
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};