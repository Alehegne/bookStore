import { formatDistanceToNow } from "date-fns";
import React from "react";

const RecentActivity = () => {
  // Dummy data for recent activity
  const recentActivity = [
    {
      action: "Added a new book",
      date: "2025-10-01",
      who: "Admin",
    },
    {
      action: "Updated author information",
      date: "2025-3-30",
      who: "Alex",
    },
    {
      action: "Deleted a category",
      date: "2025-09-29",
      who: "John",
    },
    {
      action: "Published a new book",
      date: "2025-09-28",
      who: "Sarah",
    },
  ];

  return (
    <div className="flex flex-col h-full  w-full md:w-flex-1 px-2 py-4 ring-1 ring-gray-500/5 rounded-2xl shadow-sm">
      <h1 className="h1 pt-0">Recent Activity</h1>
      <p className="opacity-75">Latest actions in the system</p>
      <div
        className="w-full flex flex-col gap-2 mt-4 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="w-9 h-9 rounded-full bg-gray-600" />
            <div className="flex flex-col gap-1">
              <h1 className="text-[16px]">{activity.action}</h1>
              <p className="text-[14px] text-gray-500">
                {formatDistanceToNow(new Date(activity.date))} ago by{" "}
                <span className="text-gray-800 font-semibold">
                  {activity.who}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
