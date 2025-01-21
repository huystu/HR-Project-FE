// src/pages/PageNotFound.jsx
import { useEffect } from 'react';

const PageNotFound = () => {
    const chatHistoryDel = async () => {
        const accessToken = localStorage.getItem('token');
        const loginUserID = localStorage.getItem('loginUserId');

        setAuthToken(accessToken);
        const headers = { "Session-ID": loginUserID, };

        try {
            const response = await api.delete('/api/gemini/session-history', { headers });

            if (response.status === 200) {
                console.log("delete session: ", response);
            }
        }
        catch (error) {
            console.log("refresh error: ", error);
        }
    }

    useEffect(() => {
        chatHistoryDel();
    }, []);

    return (
        <img src="/src/assets/404error.gif" width="100%"/>
    );
};

export default PageNotFound;