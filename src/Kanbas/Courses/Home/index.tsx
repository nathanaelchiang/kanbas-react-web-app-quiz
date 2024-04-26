import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div>
      <div className="row">
        <div className="col col-9">
          <h2>Home</h2>
          <ModuleList />
        </div>
        <div className="col">
          <h2>Status</h2>
          <Status />
        </div>
      </div>
    </div>
  );
}
export default Home;
