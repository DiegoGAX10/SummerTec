import { Clock } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const typeConfig = {
    NUEVO_GRUPO: {
        label: "Nuevo grupo",
        bg: "bg-green-100",
        text: "text-green-600",
        message: (user, role, group) =>
            `${user} (${role}) ha solicitado un nuevo grupo de verano`,
        description: (group) =>
            `${group} ha sido añadido al registro`,
    },
    GRUPO_CANCELADO: {
        label: "Grupo cancelado",
        bg: "bg-red-100",
        text: "text-red-600",
        message: (user, role, group) =>
            `${user} (${role}) ha cancelado un grupo de verano`,
        description: (group) =>
            `${group} ha sido eliminado del registro`,
    },
    // Puedes seguir agregando más tipos aquí
};

export default function NotificationTile({ user, userType, type, time, group }) {
    const [showModal, setShowModal] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 }); // Tailwind's md breakpoint is 768px
    const config = typeConfig[type];

    if (!config) return null;

    const handleVerMasClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4">
                {/* Etiqueta */}
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
                    {config.label}
                </span>

                {/* Contenido del mensaje - different based on screen size */}
                {!isMobile ? (
                    <div className="flex-1 mx-4">
                        <p className="text-sm font-semibold">
                            {config.message(user, userType, group)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {config.description(group)}
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 mx-4">
                        <p className="text-sm font-semibold line-clamp-1">
                            {config.message(user, userType, group)}
                        </p>
                        <button
                            onClick={handleVerMasClick}
                            className="text-xs text-blue-500 hover:text-blue-700 mt-1"
                        >
                            Ver más
                        </button>
                    </div>
                )}

                {/* Hora */}
                <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                    <Clock className="w-4 h-4 mr-1" />
                    {time}
                </div>
            </div>

            {/* Modal for mobile */}
            {showModal && isMobile && (
                <div className="fixed inset-0 backdrop-brightness-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-sm px-3 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
                                {config.label}
                            </span>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">
                                {config.message(user, userType, group)}
                            </p>
                            <p className="text-xs text-gray-500">
                                {config.description(group)}
                            </p>
                        </div>

                        <div className={`flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                            <Clock className="w-4 h-4 mr-1" />
                            {time}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}