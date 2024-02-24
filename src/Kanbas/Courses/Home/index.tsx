import ModuleList from "../Modules/List";
import Status from "./Status";
import "./index.css";


function Home() {
  return (
      <div className="homeContainer">
          <div className="moduleList">
          <h2>Home</h2>
      <button type="button">Collapse All</button>
            <button type="button">View Progress</button>
            <select>
                <option value="Publish All">Publish All</option>
            </select> 
            <button type="button" className="moduleButton">+Module</button>
              <ModuleList />
          </div>
          <div className="status">
              <Status />
          </div>
      </div>
  );
}
export default Home;