import React, { useState, useEffect, useRef } from 'react';

export default function Dropdown({ buttonLabel, items, onSelect, buttonIcon: Icon, selectedItem = null }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleItemClick = (item) => {
        onSelect(item);
        setIsOpen(false);
    };

    // Determine display label
    const displayLabel = selectedItem ? (selectedItem.label || selectedItem.value) : buttonLabel;

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                  ${selectedItem ? 'bg-indigo-100 text-indigo-800' : 'bg-white text-gray-700'}`}
            >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {displayLabel}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1 max-h-60 overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 
                                  ${selectedItem && (selectedItem.label === item.label || selectedItem.value === item.value)
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-700'}`}
                                role="menuitem"
                            >
                                {item.label || item.value}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}