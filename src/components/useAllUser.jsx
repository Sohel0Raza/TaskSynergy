import { useEffect, useState } from "react";

const useAllUser = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        return async () => {
            const allUser = await JSON.parse(localStorage.getItem('allUser'));
            setUsers(allUser);
            setLoading(false)
        }

    }, []);
    return [users,loading]

};

export default useAllUser;