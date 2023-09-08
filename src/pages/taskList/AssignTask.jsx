import { useNavigate, useParams } from "react-router-dom";
import useAllGroup from "../../hooks/useAllGroup";
import useAllUser from "../../hooks/useAllUser";
import { useEffect, useState } from "react";
import useTask from "../../hooks/useTask";

const AssignTask = () => {
    const [tasks] = useTask()
    const [users, loading] = useAllUser()
    const [groups, isLoading] = useAllGroup()
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate()
  

    useEffect(() => {
        if (!loading) {
            setUserList(users);
        }
    }, [users, loading]);
    const { id } = useParams()
    const handleGroupChange = (event) => {
        const groupId = event.target.value;
        const newUsers = users.filter(user =>
        user.groupId === groupId
        )
        setUserList(newUsers)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const from = e.target

        const userId = from.user.value;

        const index = tasks.findIndex(task => task.id === id);
        const task = tasks.find(task => task.id === id);
        tasks[index] = { ...tasks[index], status: 'Progress' }
        localStorage.setItem('allTasks', JSON.stringify(tasks));
        const indexUser = users.findIndex(user => user.id === userId);
        const assignTasks = users[indexUser]?.tasks?.push(task);
        users[indexUser] = { ...users[indexUser], task: assignTasks }
        localStorage.setItem('allUser', JSON.stringify(users));
        navigate('/', {replace: true})

    }
    return (
        <div className="py-10">
            <h1 className="text-center font-bold text-2xl">Assign Task</h1>
            <div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="shadow-xl p-5 rounded-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                                Group
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="group"
                                required="required"
                                defaultValue=""
                                onChange={handleGroupChange}
                            >
                                <option value="">Select Group</option>
                                {
                                    groups?.map(group => <option key={group.id} value={group.id}>{group.groupName}</option>)
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                                User
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="user"
                                required="required"
                                defaultValue=""
                            >
                                <option value="">Select User</option>
                                {
                                    userList?.map(user => <option key={user.id} value={user.id}>{user.fullName}</option>)
                                }

                            </select>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignTask;