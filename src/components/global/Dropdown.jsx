import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function Dropdown({ buttonLabel, items, onSelect, buttonIcon: ButtonIcon }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-[var(--neutral-gray)] hover:bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset">
                    {ButtonIcon && <ButtonIcon className="h-5 w-5 text-white" />} {/* Render the button icon if provided */}
                    {buttonLabel}
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    {items.map((item, index) => (
                        <MenuItem key={index}>
                            <button
                                type="button"
                                onClick={() => onSelect(item)}
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                {item.label}
                            </button>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );
}