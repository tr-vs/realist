import { useAuthContext } from './useAuthContext';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = async () => {
        // remove user from storage
        localStorage.removeItem('user');
        // dispatch logout action
        dispatch({ type: 'LOGOUT' });

        const user = new PassageUser();
        await user.signOut();
    };

    return { logout };
};
