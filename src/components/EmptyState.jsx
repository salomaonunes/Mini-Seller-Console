import React from "react";
import { Users } from "lucide-react";

const EmptyState = ({
  title = "No leads found",
  description = "Try adjusting your search or filter criteria.",
  icon: Icon = Users,
  action = null,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-sm mb-6">{description}</p>
      {action && action}
    </div>
  );
};

export default EmptyState;
