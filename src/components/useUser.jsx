import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return async () => {
            const logInUser = await JSON.parse(localStorage.getItem('loginUser'));
            setUser(logInUser);
            setLoading(false)
        }

    }, []);

    useEffect(() => {
        return async () => {
            const allUser = await JSON.parse(localStorage.getItem('allUser'));
            setUsers(allUser);
            setLoading(false)
        }

    }, []);
    return [user, loading, users]

};

export default useUser;