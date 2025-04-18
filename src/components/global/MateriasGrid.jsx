
import Card from './Card.jsx';


const MateriasGrid = ({materias}) => {

    return (
        <div className="flex flex-wrap justify-center mt-10">
            {materias.map((curso, index) => (
                <Card
                    key={index}
                    nombre={curso.nombre_materia || "MISSING VALUE"} // Correct field for the name
                    aula={curso.aula || "SIN ASIGNAR"}
                    estado={curso.status || "MISSING VALUE"}
                    horas_semanales={curso.horas_semana || "MISSING VALUE"} // Correct field
                    creditos={curso.creditos || "MISSING VALUE"} // Correct field
                    horario={curso.turno || "MISSING VALUE"} // Assuming 'horario' is not part of the data structure
                    profesor={curso.profesor || "MISSING VALUE"} // Correct field
                    cupo={curso.cupo || "MISSING VALUE"} // Correct field
                    id_materia={curso.id_materia}
                />
            ))}
        </div>
    );
};

export default MateriasGrid;