import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <div className="hero">
                <h1 className="hero-title">运河文化探索</h1>
                <p className="hero-subtitle">穿越千年时光，探寻运河文明的奥秘</p>
            </div>

            <div className="sections-grid">
                <Link to="/canal-map" className="section-card">
                    <div className="card-icon">🗺️</div>
                    <h2>运河舆图</h2>
                    <p>探索运河舆图，点击城市地标进入剧本杀世界</p>
                </Link>

                <Link to="/navigation-archive" className="section-card">
                    <div className="card-icon">📜</div>
                    <h2>航行密档</h2>
                    <p>深入了解运河城市、历史名词、文物与非遗文化</p>
                </Link>

                <Link to="/passenger-scroll" className="section-card">
                    <div className="card-icon">👥</div>
                    <h2>渡客长卷</h2>
                    <p>浏览人物图册，探索复杂的人物关系网络</p>
                </Link>
            </div>
        </div>
    )
}

export default Home

