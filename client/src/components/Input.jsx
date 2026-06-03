import { Eye } from "lucide-react";

export const Input = ({ icon: Icon, label, color, ...props }) => {
  return (
    <div className="flex flex-col relative w-full">
      <p
        className={`text-sm absolute -top-1 left-2 px-1 z-50 bg-white ${color && "text-red-600"}`}
      >
        {label}
      </p>
      <div className="relative w-full mt-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="size-4 text-green-500" />
        </div>
        <input
          {...props}
          className="w-full pl-10 pr-3 py-2 bg-white rounded-lg text-green-800 placeholder-green-800 transition duration-200 font-normal text-sm"
        />
      </div>
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

export const InvInput = ({ icon: Icon, label, color, ...props }) => {
  return (
    <div className="flex flex-col relative w-full">
      <p
        className={`text-sm absolute -top-1 left-2 px-1 z-50 bg-white ${color && "text-red-600"}`}
      >
        {label}
      </p>
      <div className="relative w-full mt-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="size-4 text-green-500" />
        </div>
        <input
          {...props}
          className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 text-gray-600 placeholder-gray-400 transition duration-200 text-sm"
        />
      </div>
    </div>
  );
};
