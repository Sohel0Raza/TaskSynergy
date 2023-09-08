import { Link } from "react-router-dom";
import useTask from "../../components/useTask";
import { useState } from "react";


const TaskList = () => {
  const [tasks] = useTask()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMarkToCompleted = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks[index] = { ...tasks[index], status: 'Completed' }
    localStorage.setItem('allTasks', JSON.stringify(tasks));
    setIsButtonDisabled(true);
  }

  return (
    <div className="space-y-4 my-10">
      <div className="text-center my-5">
        <Link to="/createTask"> <button className="btn btn-primary">Create Task</button></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-5 md:mx-16">
        {tasks?.map((task, index) => (
          <div key={index} className="card w-96 bg-base-100 shadow-xl transition-transform transform hover:scale-110">
            <div className="card-body ">
              <h3 className="text-xl text-secondary font-bold mb-2">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-lg font-normal mt-2 text-red-600">Due Date: {task.dueDate}</p>
              <p className="text-base text-black mb-2 ">Priority: {task.priority}</p>
              <div className="card-actions justify-between">
                <button className="btn-info">Assign</button>
                <button className="btn-secondary">Mark To Complete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
