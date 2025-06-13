"use client";

import { useState, useEffect } from 'react';
import { 
  BellIcon, 
  XMarkIcon, 
  TagIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Sample notifications data - in a real app, this would come from an API or context
const sampleNotifications = [
  {
    id: 1,
    type: 'price_drop',
    title: 'Price Drop: Tesla Model 3',
    message: 'The price has dropped by $2,500',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    isRead: false,
    link: '/car/1',
    image: '/cars/tesla-model-3-white.jpg'
  },
  {
    id: 2,
    type: 'saved_search',
    title: 'New Match Found',
    message: '3 new cars match your "Electric SUV" search',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false,
    link: '/cars?fuel=Electric&body=SUV'
  },
  {
    id: 3,
    type: 'listing_expiry',
    title: 'Listing Expiring Soon',
    message: 'Your BMW M3 listing expires in 2 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    link: '/profile'
  },
  {
    id: 4,
    type: 'system',
    title: 'Welcome to CarHub',
    message: 'Thank you for joining our platform!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isRead: true
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // In a real app, fetch notifications from an API
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(notification => !notification.isRead).length);

    // Set up polling for new notifications (in a real app)
    const interval = setInterval(() => {
      // Simulate receiving a new notification occasionally
      if (Math.random() > 0.9) {
        const newNotification = {
          id: Date.now(),
          type: 'price_watch',
          title: 'Price Watch Alert',
          message: 'A car on your watchlist has changed price',
          timestamp: new Date().toISOString(),
          isRead: false,
          link: '/saved-cars'
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
    setUnreadCount(prev => prev - 1);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    setShowNotifications(false);
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'price_drop':
      case 'price_watch':
        return <TagIcon className="h-5 w-5 text-green-400" />;
      case 'saved_search':
        return <CheckCircleIcon className="h-5 w-5 text-blue-400" />;
      case 'listing_expiry':
        return <ClockIcon className="h-5 w-5 text-yellow-400" />;
      case 'system':
        return <ExclamationCircleIcon className="h-5 w-5 text-accent" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        className="relative p-1 rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <>
            <BellIconSolid className="h-6 w-6" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </>
        ) : (
          <BellIcon className="h-6 w-6" />
        )}
      </button>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-secondary rounded-md shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Notifications</h3>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-accent hover:text-accent/80"
                >
                  Mark all as read
                </button>
              )}
              <button 
                onClick={closeNotifications}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 hover:bg-primary/30 ${notification.isRead ? '' : 'bg-primary/20'}`}
                  >
                    <Link 
                      href={notification.link || '#'} 
                      className="block"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <p className="text-sm text-gray-400">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.timestamp)}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <p>No notifications</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-2 border-t border-gray-700">
              <button 
                onClick={clearAllNotifications}
                className="w-full py-2 px-4 text-sm text-center text-gray-400 hover:text-white hover:bg-primary/20 rounded-md"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 