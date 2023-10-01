import { Link } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

const TaskList = () => {
  const [tasks, setTasks] = useLocalStorage("allTasks", []);
  const [filterTasks, setFilterTasks] = useState(tasks);

  const [selectedPriority, setSelectedPriority] = useState('all');
  const handleMarkToCompleted = async (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: 'Completed' };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('allTasks', JSON.stringify(updatedTasks));
    window.location.reload()
  }

  const handleTask = (event) => {
    const priority = event.target.value;

    setSelectedPriority(priority);
    const filteredTasks = priority === 'all' ? tasks : tasks.filter(task => task.priority === priority);
    setFilterTasks(filteredTasks);
  };
  return (
    <div className="space-y-4 my-10">
      <div className="flex justify-end mr-16">
        <Link to="/createTask"> <button className="btn btn-primary mr-5">Create Task</button></Link>
        {tasks.length === 0 ? '' :
          <select onChange={handleTask} className='bg-white border-2 border-warning outline-none p-2 rounded-md'>
            <option value="all">ALL</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>}
      </div>
      {tasks.length === 0 ? <h2 className="text-center text-4xl mt-24">No Task Found <span className="text-red-600">Please Create Task</span></h2> :
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-5 md:mx-16">
          {filterTasks?.map((task, index) => (
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
        </div>}
    </div>
  );
};

export default TaskList;
