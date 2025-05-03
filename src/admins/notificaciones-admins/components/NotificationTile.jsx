import { Clock } from "lucide-react";

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
    const config = typeConfig[type];

    if (!config) return null;

    return (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 ">
            {/* Etiqueta */}
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>

            {/* Contenido del mensaje */}
            <div className="flex-1 mx-4">
                <p className="text-sm font-semibold">
                    {config.message(user, userType, group)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    {config.description(group)}
                </p>
            </div>

            {/* Hora */}
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                <Clock className="w-4 h-4 mr-1" />
                {time}
            </div>
        </div>
    );
}
