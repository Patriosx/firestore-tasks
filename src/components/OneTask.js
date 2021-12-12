const OneTask = ({ task, deleteTask, setCurrentId }) => {
  const onDeleteTask = async (id) => {
    deleteTask(id);
  };
  const onUpdateId = () => {
    setCurrentId(task.id);
  };
  return (
    <div className="card shadow-sm mb-2">
      <div className="card-body">
        <div className="px-2 d-flex justify-content-between">
          <h3 className="card-title">{task.title}</h3>
          <div>
            <i
              className="material-icons text-danger"
              onClick={() => onDeleteTask(task.id)}
            >
              close
            </i>
            <i className="material-icons" onClick={onUpdateId}>
              create
            </i>
          </div>
        </div>
        <div className="p-1">
          <h5 className="card card-text p-2">{task.body}</h5>
        </div>
      </div>
    </div>
  );
};

export default OneTask;
