import './index.css'

export const Header = () => {
    return <header>
    <div className="header__inner">
      <h1>掲示板</h1>
      <nav className='header__nav'>
        <ul>
          <li><a href="#">ホーム</a></li>
          <li><a href="#">マイページ</a></li>
        </ul>
      </nav>
    </div>
  </header>
}