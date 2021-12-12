import React, { useEffect, useState } from "react";
import { db, timestamp } from "../firebase/config";

const TaskForm = ({
  addTask,
  updateTask,
  currentId,
  setCurrentId,
  taskList,
}) => {
  const [task, setTask] = useState({
    title: "",
    body: "",
  });
  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === "") {
      addTask({ ...task, createdAt: timestamp });
    } else {
      updateTask(task);
    }
    clearForm();
  };
  const clearForm = () => {
    setTask({ title: "", body: "" });
    setCurrentId("");
  };
  const getTaskById = async (id) => {
    try {
      const doc = await db.collection("Tasks").doc(id).get();
      setTask({ ...doc.data() });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(currentId);
    if (currentId === "") {
      clearForm();
    } else {
      getTaskById(currentId);
    }
  }, [currentId]);

  return (
    <div className="card shadow p-3 mb-5">
      <h1 className="text-center fw-bold mt-2">New Task</h1>
      <div>
        <form action="" className="card-body" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Title"
            onChange={handleInputChange}
            value={task.title}
            required
          />
          <textarea
            name="body"
            className="form-control"
            placeholder="Task body"
            rows="4"
            onChange={handleInputChange}
            value={task.body}
            required
          ></textarea>
          <div className=" text-center pt-3">
            <button type="submit" className="btn btn-success m-1">
              {currentId === "" ? "Save" : "Update"}
            </button>
            <button className="btn btn-danger m-1" onClick={clearForm}>
              Clear
            </button>

            {/* <button
              type="button"
              className="btn"
              onClick={() => {
                // toast.warn("yeah");
                toast.error("Lorem ipsum dolor");
                console.log("object");
              }}
            >
              TEST
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
