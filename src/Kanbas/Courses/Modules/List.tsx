import { useParams } from "react-router";
import { modules } from "../../Database";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { addModule, deleteModule, updateModule, setModule, setModules } from "./reducer";
import { findModulesForCourse, createModule } from "./client";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);
  const handleAddModule = () => {
    createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };



  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );

  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  
  const dispatch = useDispatch();
  const modulesList = moduleList.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  
  return (
    <div className="flex-fill">
      <button type="button" className="btn btn-secondary">
        Collapse All
      </button>
      <button type="button" className="btn btn-info">
        View Progress
      </button>
      <select className="form-select-sm">
        <option>Publish All</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <button type="button" className="btn btn-danger">
        + Module
      </button>

      <hr />
      <ul className="list-group modules">
        <div className="input-group mb-3">
          <input
            value={module.name}
            onChange={(e) =>
              dispatch(
                setModule({
                  ...module,
                  name: e.target.value,
                })
              )
            }
            className="border border-2 border-dark me-2"
          />
          <textarea
            value={module.description}
            onChange={(e) =>
              dispatch(
                setModule({
                  ...module,
                  description: e.target.value,
                })
              )
            }
            className="border border-2 border-dark ms-2"
          />
          <button
            onClick={handleAddModule}
            className="btn btn-primary ms-2"
          >
            Add
          </button>
          <button
            onClick={handleUpdateModule}
            className="btn btn-success ms-2"
          >
            Update
          </button>
        </div>
        <ul className="list-group">
      {modules
        .filter((module) => module.course === courseId)
        .map((module, index) => (
          <li key={index} className="list-group-item">
            <button
              onClick={() => handleDeleteModule(module._id)} >
              Delete </button>
            <h3>{module.name}</h3>
          </li>
        ))}
    </ul>

        {moduleList.map((module, index) => (
          <li key={index}
            className="list-group-item"
            onClick={() => setSelectedModule(module)}>
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule?._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson: any, index: any) => (
                  <li className="list-group-item" key={index}>
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuleList;

/* 
import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
function ModuleList() {
  const { courseId } = useParams();
  const [moduleList, setModuleList] = useState<any[]>(modules);
  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId,
  });
  const addModule = (module: any) => {
    const newModule = { ...module,
      _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };
  const deleteModule = (moduleId: string) => {
    const newModuleList = moduleList.filter(
      (module) => module._id !== moduleId );
    setModuleList(newModuleList);
  };

  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      
      <ul className="list-group wd-modules">
      <li className="list-group-item">
        <button onClick={() => { addModule(module) }}>Add</button>
        <input value={module.name}
          onChange={(e) => setModule({
            ...module, name: e.target.value })}
        />
        <textarea value={module.description}
          onChange={(e) => setModule({
            ...module, description: e.target.value })}
        />
      </li>

        {modulesList.filter((module) => module.course === courseId).map((module, index) => (
          <li key={index}
            className="list-group-item"
            onClick={() => setSelectedModule(module)}>
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson, index) => (
                  <li className="list-group-item" key={index}>
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
} 
export default ModuleList;  */