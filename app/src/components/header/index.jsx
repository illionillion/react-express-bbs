import { Link } from 'react-router-dom'
import './index.css'

export const Header = () => {
    return <header>
    <div className="header__inner">
      <h1>掲示板</h1>
      <nav className='header__nav'>
        <ul>
          <li><Link to="/">ホーム</Link></li>
          <li><Link to="/my-page">マイページ</Link></li>
        </ul>
      </nav>
    </div>
  </header>
}