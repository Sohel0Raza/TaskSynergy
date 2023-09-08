import { Link, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import useTask from "../../components/useTask";

const TaskList = () => {
  const [tasks, , loading] = useTask()
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (!loading) {
      setAllTasks(tasks);
    }
  }, [tasks, loading]);

  const [selectedPriority, setSelectedPriority] = useState('all');


  const handleMarkToCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: 'Completed' };
      }
      return task;
    });
    setAllTasks(updatedTasks);
    localStorage.setItem('allTasks', JSON.stringify(updatedTasks));
  }

  const handleTask = (event) => {
    const priority = event.target.value;

    setSelectedPriority(priority);
    const filteredTasks = priority === 'all' ? tasks : tasks.filter(task => task.priority === priority);
    setAllTasks(filteredTasks);
  };

  if (loading) {
    return <div className="flex justify-center md:mt-52"><span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span></div>
  }

  return (
    <div className="space-y-4 my-10">
      <div className="flex justify-end mr-16">
        <Link to="/createTask"> <button className="btn btn-primary mr-5">Create Task</button></Link>
        <select onChange={handleTask} className='bg-white border-2 border-warning outline-none p-2 rounded-md'>
          <option value="all">ALL</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-5 md:mx-16">
        {allTasks?.map((task, index) => (
          <div key={index} className="card bg-base-100 shadow-xl transition-transform transform hover:scale-110">
            <div className="card-body ">
              <h3 className="text-xl text-secondary font-bold mb-2">{task.title}</h3>
              <div className="text-gray-600 max-h-16 text-ellipsis whitespace-nowrap overflow-x-hidden">{task.description}</div>
              <p className="text-lg font-normal mt-2 text-red-600">Due Date: {task.dueDate}</p>
              <p className="text-base text-black ">Priority: {task.priority}</p>
              <p className="text-base text-black mb-2 ">Status: {task.status}</p>
              <div className="card-actions justify-between">
                {task.status === 'Pending' && (
                  <Link to={`/assign/${task.id}`}>
                    <button className="btn-info">Assign</button>
                  </Link>
                )}
                {task.status === 'Progress' && (
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      handleMarkToCompleted(task.id);
                    }}
                  >
                    Mark To Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
