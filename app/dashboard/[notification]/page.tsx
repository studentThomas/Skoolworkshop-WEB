import React from "react";
import Link from "next/link";


function NotificationItem({ notification }: { notification: any }) {

  return (
    <div className="fixed-notification top-right-corner">
      <div className="info info--warning bg-white flex-row p-4 mb-3 shadow d-flex justify-content-between align-items-center">
        <div className="d-block">
          <h4>{Notification.name}: Voorraad Alert!</h4>
          <p className="text-muted mb-0">
          Let op: de voorraad van {Notification.name} is bijna op. Bestel nu om vertragingen te voorkomen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
