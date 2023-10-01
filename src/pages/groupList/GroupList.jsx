import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { groupAddTodb } from "../../hooks/userdb";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import useLocalStorage from "use-local-storage";

const GroupList = () => {
    const [users, setUsers] = useLocalStorage("allUser");

    const allGroup = localStorage.getItem('allGroup') ? JSON.parse(localStorage.getItem('allGroup')) : []
    const [groups, setGroups] = useState(allGroup);
    const [newGroup, setNewGroup] = useState({
        groupName: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGroup({ ...newGroup, id: new Date().getTime().toString(), [name]: value, users: [] });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        if (newGroup.groupName) {
            setGroups([...groups, newGroup]);
            form.reset()
            groupAddTodb(newGroup)
            toast('Group Create Successful!');
            closeModal('createGroupModal')
        }
    };


    const openCreteGroupModal = () => {
        document.getElementById('createGroupModal').showModal()
    }
    const closeModal = (id) => {
        document.getElementById(id).close()
    }

    const openUserInviteModal = (groupId) => {
        document.getElementById('groupId').value = groupId;
        document.getElementById('inviteUserModal').showModal()
    }

    const handleUserInvite = (userId) => {

        const groupId = document.getElementById('groupId').value;

        const userIndex = users.findIndex(user => user.id === userId);
        const user = users.find(user => user.id === userId);
        users[userIndex] = { ...users[userIndex], groupId: groupId }

        localStorage.setItem('allUser', JSON.stringify(users));

        const groupIndex = allGroup.findIndex(group => group.id === groupId);
        const invitedUsers = groups[groupIndex]?.users?.push(user);
        groups[groupIndex] = { ...groups[groupIndex], user: invitedUsers }
        localStorage.setItem('allGroup', JSON.stringify(groups));

        closeModal("inviteUserModal")
        window.location.reload()
    }
    return (
        <div>
            <div className="my-10">
                <div className="text-center">
                    <button className="btn btn-primary" onClick={openCreteGroupModal}>Create Group</button>
                </div>
                <div className="space-y-4 my-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-5 md:mx-10 ">
                        {groups?.map((group, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md py-5 px-8 rounded-lg transition-transform transform hover:scale-105"
                            >
                                <h3 className="font-semibold text-center text-2xl mb-4 text-warning hover:text-black hover:duration-1000">{group.groupName}</h3>
                                <span className="font-semibold rounded-md">Group Members : </span>
                                 <span> {group.users?.length} </span>
                                  <br />
                                <div className="py-1">
                                    {
                                        group.users?.map(user => <div key={user.id}>
                                            <ul>
                                                <li>
                                                    {user.fullName}
                                                </li>
                                            </ul>
                                        </div>)
                                    }
                                </div>
                                <div className="flex justify-end">
                                    <button className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white" onClick={() => openUserInviteModal(group.id)}>Add Member <BsFillSendFill /></button>
                                </div>
                                <dialog id="inviteUserModal" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <input id="groupId" type="hidden" />
                                        <h2 className="font-bold text-2xl mb-2">User List</h2>
                                        <div>
                                            {users?.map((user) => <ul key={user.id}>
                                                <li className="flex justify-between">{user.fullName}
                                                    <div>
                                                        {!user.groupId && (
                                                            <button onClick={() => handleUserInvite(user.id)} className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white">Invite</button>
                                                        )}
                                                    </div>
                                                </li>
                                            </ul>)}
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button type="button" onClick={() => closeModal('inviteUserModal')} className="btn btn-xs ml-3">Close</button>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>

                <dialog id="createGroupModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit}>
                            <div className="px-5 pt-3 pb-1 rounded-md">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Group Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        name="groupName"
                                        required="required"
                                        value={newGroup.groupName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-action px-5">
                                <button

                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                >
                                    Create New Group
                                </button>
                                <button type="button" onClick={() => closeModal('createGroupModal')} className="btn btn-warning btn-sm">Close</button>
                            </div>
                        </form>

                    </div>
                </dialog>
            </div>
            <ToastContainer />
        </div>
    );
};

export default GroupList;