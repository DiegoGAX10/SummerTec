
import Card from './Card.jsx';


const MateriasGrid = ({ materias, esMiGrupo = false, onBaja = () => {} }) => {


    return (
        <div className="flex flex-wrap justify-center mt-10">
            {materias.map((curso, index) => (
                <Card
                    key={index}
                    nombre={curso.nombre_materia || "MISSING VALUE"}
                    aula={curso.aula || "SIN ASIGNAR"}
                    estado={curso.status || "MISSING VALUE"}
                    horas_semanales={curso.horas_semana || "MISSING VALUE"}
                    creditos={curso.creditos || "MISSING VALUE"}
                    horario={curso.turno || "MISSING VALUE"}
                    profesor={curso.profesor || "MISSING VALUE"}
                    cupo={curso.cupo || "MISSING VALUE"}
                    id_materia={curso.id_materia}
                    esMiGrupo={esMiGrupo}
                    onBaja={onBaja}
                />
            ))}
        </div>
    );
};

export default MateriasGrid;