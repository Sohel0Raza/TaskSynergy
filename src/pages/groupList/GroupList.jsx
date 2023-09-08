import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { groupAddTodb } from "../../components/userdb";
import { useState } from "react";
import useAllUser from "../../components/useAllUser";

const GroupList = () => {
    const [users, loading] = useAllUser()
    const allGroup = localStorage.getItem('allGroup') ? JSON.parse(localStorage.getItem('allGroup')) : []
    console.log('allGroup :', allGroup);
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
            closeCreteGroupModal()
        }
    };


    const openCreteGroupModal = () => {
        document.getElementById('createGroupModal').showModal()
    }
    const closeCreteGroupModal = () => {
        document.getElementById('createGroupModal').close()
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

    }

    return (
        <div>
            <div className="my-10">
                <div className="space-y-4 my-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-5 md:mx-10 ">
                        {groups?.map((group, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-md p-4 rounded-lg transition-transform transform hover:scale-105"
                            >
                                <h3 className="text-xl font-semibold mb-2">{group.groupName}</h3>
                                <button onClick={() => openUserInviteModal(group.id)}>Send Invite</button>
                                <dialog id="inviteUserModal" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <input id="groupId" type="hidden" />
                                        <h2 className="font-bold text-2xl mb-2">User List</h2>
                                        <div>
                                            {users?.map((user) => <ul key={user.id}>
                                                <li className="flex justify-between">{user.fullName} <button onClick={() => handleUserInvite(user.id)} className="btn btn-xs">Invite</button></li>
                                            </ul>)}
                                        </div>

                                    </div>
                                </dialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <button className="btn" onClick={openCreteGroupModal}>open modal</button>
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
                                    Create Group
                                </button>
                                <button type="button" onClick={closeCreteGroupModal} className="btn btn-warning btn-sm">Close</button>
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