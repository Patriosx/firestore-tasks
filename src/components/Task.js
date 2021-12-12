import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { db } from "../firebase/config";
import OneTask from "./OneTask";
import { toast } from "react-toastify";

const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addTask = async (task) => {
    try {
      await db.collection("Tasks").doc().set(task);
      toast("Task added", { type: "success" });
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure about this?")) {
      try {
        await db.collection("Tasks").doc(id).delete();
        toast.error("Task deleted");
        setCurrentId("");
      } catch (error) {
        console.log(error);
        toast.error("Server error");
      }
    } else {
      toast.warn("We keep it then");
    }
  };
  const updateTask = async (value) => {
    try {
      await db.collection("Tasks").doc(currentId).update(value);
      toast.info("Task updated");
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };
  const getTaskList = async () => {
    try {
      db.collection("Tasks")
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setTaskList(data);
        });
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    // console.log("getting data");
    // console.log(taskList);
    getTaskList();
  }, []);

  return (
    <div className="container">
      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        currentId={currentId}
        setCurrentId={setCurrentId}
        taskList={taskList}
      />
      <h2 className="fw-bold">Task List</h2>
      {taskList.map((task) => {
        return (
          <OneTask
            task={task}
            deleteTask={deleteTask}
            key={task.id}
            setCurrentId={setCurrentId}
          />
        );
      })}
    </div>
  );
};

export default Task;
