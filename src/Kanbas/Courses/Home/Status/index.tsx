import { FaCalendarAlt } from "react-icons/fa";
import {
  MdImportExport,
  MdCloudDownload,
  MdHome,
  MdVisibility,
  MdAnnouncement,
  MdAssessment,
  MdNotifications,
} from "react-icons/md";

import "./index.css";

function Status() {
  return (
    <>
      <h4>Course Status</h4>
      <table>
        <tbody>
          <tr>
            <td>
              <button>
                <i className="fas fa-ban"></i> Unpublish
              </button>
            </td>
            <td>
              <button className="published-button">
                <i className="fas fa-check"></i> Published
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ul className="course-status-list">
        <li className="status-item rounded">
          <MdImportExport /> Import Existing Content
        </li>
        <li className="status-item rounded">
          <MdCloudDownload /> Import from Commons
        </li>
        <li className="status-item rounded">
          <MdHome /> Choose Home Page
        </li>
        <li className="status-item rounded">
          <MdVisibility /> View Course Stream
        </li>
        <li className="status-item rounded">
          <MdAnnouncement /> New Announcement
        </li>
        <li className="status-item rounded">
          <MdAssessment /> New Analytics
        </li>
        <li className="status-item rounded">
          <MdNotifications /> View Course Notifications
        </li>
      </ul>

      <div className="d-flex justify-content-between align-items-center">
        <h4>Coming Up</h4>
        <div>
          <i className="fas fa-calendar-day"></i>
          <a href="#" id="view-calendar-button">
            View Calendar
          </a>
        </div>
      </div>
      <hr />

      <div className="coming-up-container">
        <div className="row top-align">
          <div className="col col-2 left-col">
            <FaCalendarAlt />
          </div>
          <div className="col right-col">
            <li>
              <a href="#">Lecture</a>
              <p>CS4550.12631.202410 Sep 7 at 11:45am</p>
            </li>
          </div>
        </div>
        <div className="row top-align">
          <div className="col col-2 left-col">
            <FaCalendarAlt />
          </div>
          <div className="col right-col">
            <li>
              <a href="#">CS5610 06 SP23 Lecture</a>
              <p>CS4550.12631.202410 Sep 11 at 6pm</p>
            </li>
          </div>
        </div>
        <div className="row top-align">
          <div className="col col-2 left-col">
            <FaCalendarAlt />
          </div>
          <div className="col right-col">
            <li>
              <a href="#">CS5610 Web Development Summer 1 2023 - Lecture</a>
              <p>CS4550.12631.202410 Sep 11 at 7pm</p>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Status;
