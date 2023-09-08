import { useState } from "react";
import { TaskAddTodb } from "../../hooks/userdb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";

const CreateTask = () => {
    const navigate = useNavigate()
  
    const from = "/"
    const PriorityEnum = {
        LOW: 'Low',
        MEDIUM: 'Medium',
        HIGH: 'High',
    };

    const TaskStatusEnum = {
        PENDING: 'Pending',
        IN_PROGRESS: 'Progress',
        COMPLETED: 'Completed',
    };

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: PriorityEnum.LOW,
        status: TaskStatusEnum.PENDING
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, id: new Date().getTime().toString(), [name]: value , status: TaskStatusEnum.PENDING} );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.title && newTask.description && newTask.dueDate) {
            setTasks([...tasks, newTask]);
            TaskAddTodb(newTask)
            toast('Task Create Successful!');
        }
        navigate(from, {replace: true})
    };
    return (
        <div className="py-10">
            <h1 className="text-center font-bold text-2xl">Create New Task</h1>
            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="shadow-xl p-5 rounded-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="title"
                                required="required"
                                value={newTask.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description:
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="description"
                                required="required"
                                value={newTask.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                                Due Date:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date"
                                name="dueDate"
                                required="required"
                                value={newTask.dueDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                                Priority:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="priority"
                                required="required"
                                value={newTask.priority}
                                onChange={handleChange}
                            >
                                <option value={PriorityEnum.LOW}>{PriorityEnum.LOW}</option>
                                <option value={PriorityEnum.MEDIUM}>{PriorityEnum.MEDIUM}</option>
                                <option value={PriorityEnum.HIGH}>{PriorityEnum.HIGH}</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Create Task
                            </button>
                            <ToastContainer/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;