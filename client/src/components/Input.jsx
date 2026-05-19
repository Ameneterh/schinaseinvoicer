import { Eye } from "lucide-react";

export const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-4 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white rounded-lg border focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200 font-normal text-sm"
      />
    </div>
  );
};

export const PasswordInput = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-4 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-3 bg-white rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 text-green-800 placeholder-green-800 transition duration-200 font-normal text-sm"
      />
      <div className="absolute right-2 items-center cursor-pointer inset-y-0">
        <Eye />
      </div>
    </div>
  );
};

export const InvInput = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-4 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 text-gray-600 placeholder-gray-400 transition duration-200 text-sm"
      />
    </div>
  );
};
