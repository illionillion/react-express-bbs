import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import './index.css'

export const MyPage = () => {
    const { userData } = useContext(AuthContext);

    return <div className="my-page">
        <h3>マイページ</h3>
        <div className="my-page-contents">
            <div className="user-data">
                ユーザー名：{userData.userName}
            </div>
        </div>
    </div>
}