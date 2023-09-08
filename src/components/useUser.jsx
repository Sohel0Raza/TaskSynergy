import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return async () => {
            const logInUser = await JSON.parse(localStorage.getItem('loginUser'));
            setUser(logInUser);
            setLoading(false)
        }

    }, []);
    return [user, loading]

};

export default useUser;