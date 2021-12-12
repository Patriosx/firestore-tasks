import "./firebase/config";
import "bootswatch/dist/sketchy/bootstrap.min.css";
import Task from "./components/Task";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container p-4">
      <Task />
      <ToastContainer />
    </div>
  );
}

export default App;
