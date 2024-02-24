import { FaFileImport, FaFileUpload, FaCrosshairs, FaChartBar, FaBullhorn, FaBell } from "react-icons/fa";
import "./index.css";

function Status() {
    return (
        <div>
            <div className="buttons">
                <button><FaFileImport /> Import Existing Content</button>
                <button><FaFileUpload /> Import From Commons</button>
                <button><FaCrosshairs /> Choose Home Page</button>
                <button><FaChartBar /> View Course Stream</button>
                <button><FaBullhorn /> New Announcment</button>
                <button><FaChartBar /> New Analytics</button>
                <button><FaBell /> View Course Notifications</button>
            </div>
            <h4>To Do</h4>
            <hr />
            <div className="todo">
                <a href="#">Grade A1 - ENV + HTML</a>
                {'100 points - Sep 18 at 11:59 pm'}
                <br /><br />
                <a href="#">Grade A2 - CSS + BOOTSTRAP</a>
                {'100 points - Oct 2 at 11:59 pm'}
            </div>
        </div>
    );
}

export default Status;