import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
    const location = useLocation()

    return (
        <div className="layout">
            <header className="header">
                <div className="header-content">
                    <Link to="/canal-map" style={{ textDecoration: 'none' }}>
                        <h1 className="site-title">运河文化探索</h1>
                    </Link>
                    <nav className="nav">
                        <Link
                            to="/canal-map"
                            className={location.pathname === '/canal-map' ? 'active' : ''}
                        >
                            运河舆图
                        </Link>
                        <Link
                            to="/navigation-archive"
                            className={location.pathname.startsWith('/navigation-archive') ? 'active' : ''}
                        >
                            航行密档
                        </Link>
                        <Link
                            to="/passenger-scroll"
                            className={location.pathname.startsWith('/passenger-scroll') ? 'active' : ''}
                        >
                            渡客长卷
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <p>© 2026 运河文化探索 - 传承千年运河文明</p>
            </footer>
        </div>
    )
}

export default Layout

