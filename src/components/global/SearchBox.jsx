import React, { useState, useEffect } from 'react';

export default function SearchBox({ onSearch, value = '', placeholder = 'Buscar...' }) {
    const [searchTerm, setSearchTerm] = useState(value);

    // Update local state when prop value changes
    useEffect(() => {
        setSearchTerm(value);
    }, [value]);

    const handleSearchChange = (e) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        onSearch(newValue); // Pass the search term to the parent component
    };

    return (
        <div className="relative mb-6 w-full max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
            />
        </div>
    );
}