import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useDispatch } from "react-redux";
import { createProject } from "../redux/actions";

const Projects = () => {
  const [projectData, setProjectData] = useState({
    project_id: null, // Inicializar como null o 0 para manejarlo como un entero
    name: "",
    description: "",
    company_id: null, // Campo adicional para company_id
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Instanciar useNavigate
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProjectData({
      ...projectData,
      [name]: name === "project_id" || name === "company_id" ? parseInt(value, 10) : value, // Convertir project_id y company_id a enteros
    });
  };

  const generateUniqueId = () => Math.floor(Math.random() * 10000); // Genera un número aleatorio único

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectDataWithId = { ...projectData, project_id: projectData.project_id || generateUniqueId() }; // Genera project_id si no se proporcionó
    dispatch(createProject(projectDataWithId));
    setProjectData({ project_id: null, name: "", description: "", company_id: null }); // Reiniciar formulario
    navigate("/home"); // Navegar al home después de crear el proyecto
  };

  return (
    <div>
      <h2>Crear Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Proyecto (opcional):</label>
          <input
            type="number"
            name="project_id"
            value={projectData.project_id || ""}
            onChange={handleChange}
            placeholder="ID del Proyecto"
          />
        </div>
        <div>
          <label>Nombre del Proyecto:</label>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>ID de la Compañía:</label>
          <input
            type="number"
            name="company_id"
            value={projectData.company_id || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default Projects;


