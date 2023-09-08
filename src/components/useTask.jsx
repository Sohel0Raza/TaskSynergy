import { useEffect, useState } from "react";

const useTask = () => {
    const [tasks, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return async () => {
            const allTask = await JSON.parse(localStorage.getItem('allTasks'))
            setTask(allTask);
            setLoading(false)
        }

    }, []);
    return [tasks, setTask, loading]
};

export default useTask;