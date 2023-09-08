import { useEffect, useState } from "react";

const useAllGroup = () => {
    const [groups, setGroups] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        return async () => {
            const allGroup = await JSON.parse(localStorage.getItem('allGroup'));
            setGroups(allGroup);
            setLoading(false)
        }

    }, []);
    return [groups,loading]

};

export default useAllGroup;