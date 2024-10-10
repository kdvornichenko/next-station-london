import { useRouter } from 'next/navigation'
import { supabase } from '../supabase/client';

// Утилита для проверки авторизации пользователя
export const checkUserSession = async (router: ReturnType<typeof useRouter>, setUser: (user: any) => void) => {
    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // Если сессии нет - перенаправляем на страницу логина
        if (!session) {
            router.push('/login');
            return;
        }

        // Если сессия существует - устанавливаем пользователя
        setUser(session.user);
    } catch (error) {
        console.error('Ошибка при проверке сессии пользователя:', error);
    }
};
