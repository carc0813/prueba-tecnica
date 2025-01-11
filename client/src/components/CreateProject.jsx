import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../redux/actions";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = { name, description };
    dispatch(createProject(projectData));
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h2>Crear Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Proyecto:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateProject;
