"use client";

import React, { useEffect, useState } from "react";

const SuccessNotification = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Animate  100% - 0%  2 sec
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 16);

    // Auto close  2 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed top-4 left-4 z-100 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg min-w-[300px]">
      <div className="text-lg font-semibold mb-2">{message}</div>
      <div className="w-full bg-green-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-300 h-2 rounded-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SuccessNotification;
