import ModuleList from "../Modules/List";


function Home() {
  return (
    <div>
      <h2>Home</h2>
      <button type="button">Collapse All</button>
            <button type="button">View Progress</button>
            <select>
                <option value="Publish All">Publish All</option>
            </select> 
            <button type="button">Module</button>
      <ModuleList />
      <h2>Status</h2>
    </div>
  );
}
export default Home;