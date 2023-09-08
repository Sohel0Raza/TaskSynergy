const userAddTodb = (user) => {
    let allUser = JSON.parse(localStorage.getItem('allUser')) || [];
    allUser.push(user);

    localStorage.setItem('allUser', JSON.stringify(allUser));
}
const TaskAddTodb = (tasks) => {
    let allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    allTasks.push(tasks);

    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}
const groupAddTodb = (group) => {
    let allGroup = JSON.parse(localStorage.getItem('allGroup')) || [];
    allGroup.push(group);

    localStorage.setItem('allGroup', JSON.stringify(allGroup));
}

const addLoginUser = (user) => {
    localStorage.setItem('loginUser', JSON.stringify(user));
}
const deleteUser = () => {
    localStorage.removeItem('loginUser')
}
export { userAddTodb, TaskAddTodb, addLoginUser, deleteUser, groupAddTodb };