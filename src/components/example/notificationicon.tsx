// NotificationIcon.tsx
import React, { useState} from 'react';
import { FiBell } from 'react-icons/fi'; // Using react-icons for a bell icon

interface NotificationIconProps {
  outOfStockProducts: { id: string; name: string }[]; // Define structure inline
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ outOfStockProducts }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);




  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      {/* Bell icon with badge */}
      <button onClick={toggleDropdown} className="relative p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <FiBell className="text-gray-700" size={24} />
        {outOfStockProducts.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {outOfStockProducts.length}
          </span>
        )}
      </button>

      {/* Dropdown list of out-of-stock products */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 font-bold text-gray-700 border-b border-gray-200">
            Low Stock Products
          </div>
          {outOfStockProducts.length > 0 ? (
            <ul className="max-h-48 overflow-y-auto">
              {outOfStockProducts.map((product) => (
                <li key={product.id} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  {product.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">All products in stock</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
