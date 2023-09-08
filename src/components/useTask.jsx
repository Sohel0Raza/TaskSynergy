import { useEffect, useState } from "react";

const useTask = () => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return async () => {
            const allTask = await JSON.parse(localStorage.getItem('allTasks'))
            setTask(allTask);
            setLoading(false)
        }

    }, []);
    return [task, loading]
};

export default useTask;