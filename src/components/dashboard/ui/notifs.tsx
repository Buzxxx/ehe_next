"use client";
import { useState } from "react";

import DropDownMenu from "./dropDown";
import NotifIcon from "@/components/ui/icons/notifIcon";
import Group from "@/components/ui/icons/group";

const Notifs = () => {
  const notifs: string[] = []; // Assuming notifs is an array of strings

  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const renderNotifications = () => {
    const displayedNotifs = showAllNotifications ? notifs : notifs.slice(0, 5);

    if (displayedNotifs.length > 0) {
      return displayedNotifs.map((notif, index) => (
        <li className="text-sm" key={index}>
          {notif}
        </li>
      ));
    } else {
      return (
        <>
          <li className=" mb-2">You have no new notifications for now</li>
          <li className="flex gap-2 items-center justify-start mb-2">
            <Group />
            <p>Notifications coming soon</p>
          </li>
          <li className="mb-2 text-center mt-4">
            <button className="mx-auto text-center border-0 w-1/2">
              View All
            </button>
          </li>
        </>
      );
    }
  };
  return (
    <div className="flex justify-around gap-4 items-center">
      <DropDownMenu
        triggerEl={<NotifIcon />}
        contentEl={
          <ul className="text-sm">
            {renderNotifications()}
            {!showAllNotifications && notifs.length > 5 && (
              <li
                className="text-blue-500 cursor-pointer"
                onClick={() => setShowAllNotifications(true)}
              >
                View More
              </li>
            )}
          </ul>
        }
      />
    </div>
  );
};

export default Notifs;
