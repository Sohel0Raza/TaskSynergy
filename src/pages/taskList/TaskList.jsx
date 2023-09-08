import { Link } from "react-router-dom";
import useTask from "../../components/useTask";


const TaskList = () => {
  const [tasks] = useTask()

  const mark = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    tasks[index] = { ...tasks[index], status: 'Completed' }
    localStorage.setItem('allTasks', JSON.stringify(tasks));
  }

  return (
    <div className="space-y-4 my-10">
      <h1 className="text-center font-bold text-2xl">Task List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-5 md:mx-10 ">
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-lg transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">Due Date: {task.dueDate}</p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <button>Assign</button>
            <button onClick={() => mark(task.id)}>mark as completed</button>
          </div>
        ))}
      </div>
      <div className="text-center my-5">
        <Link to="/createTask"> <button className="btn btn-primary">Create Task</button></Link>
      </div>
    </div>
  );
};

export default TaskList;

