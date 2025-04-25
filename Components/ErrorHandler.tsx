import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorNotification } from '@/types';
const ErrorHandler: React.FC = () => {
  const [notifications, setNotifications] = useState<ErrorNotification[]>([]);

  useEffect(() => {
    // Store the original console.error
    const originalConsoleError = console.error;

    // Override console.error
    console.error = (...args: any[]) => {
      // Call the original console.error
      originalConsoleError.apply(console, args);

      // Create error message from arguments
      const errorMessage = args
        .map(arg => {
          if (typeof arg === 'object') {
            return JSON.stringify(arg);
          }
          return String(arg);
        })
        .join(' ');

      // Add new notification
      const newNotification = {
        id: Date.now(),
        message: errorMessage,
      };

      setNotifications(prev => [...prev, newNotification]);

      // Remove notification after 10 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 10000);
    };

    // Cleanup function to restore original console.error
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg mb-2 max-w-md"
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ErrorHandler; 