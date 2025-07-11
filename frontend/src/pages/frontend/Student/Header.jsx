import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-actions">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <span className="icon">🔔</span>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span className="user-name">John Smith</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
