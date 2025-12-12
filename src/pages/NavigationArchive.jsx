import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { archiveData } from '../data/archives'
import CitySelector from '../components/CitySelector'
import './NavigationArchive.css'

function NavigationArchive() {
    const { city } = useParams()
    const navigate = useNavigate()
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [isResearchExpanded, setIsResearchExpanded] = useState(false)

    // 如果没有城市参数，显示城市选择界面
    if (!city) {
        return (
            <CitySelector
                title="航行密档"
                description="请选择要查看的城市档案"
                onSelect={(cityId) => navigate(`/navigation-archive/${cityId}`)}
            />
        )
    }

    const data = archiveData[city] || archiveData.default

    return (
        <div className="navigation-archive-page">
            <h1 className="page-title">航行密档 · {data.city}</h1>

            <div className="archive-content">
                <div className="entries-section">
                    <h2>词条索引</h2>
                    <div className="entries-grid">
                        {data.entries.map((entry) => (
                            <div
                                key={entry.id}
                                className="entry-card"
                                onClick={() => setSelectedEntry(entry)}
                            >
                                <div className="entry-image">{entry.image}</div>
                                <div className="entry-badge">{entry.type}</div>
                                <h3>{entry.title}</h3>
                                <p>{entry.description}</p>
                                <div className="audio-placeholder">🔊 {entry.audio}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="research-section">
                    <div className="research-header">
                        <h2>谜案考据</h2>
                        <button
                            className="research-toggle-btn"
                            onClick={() => setIsResearchExpanded(!isResearchExpanded)}
                        >
                            <span className={`toggle-icon ${isResearchExpanded ? 'expanded' : ''}`}>
                                {isResearchExpanded ? '▼' : '▶'}
                            </span>
                            <span>回溯记忆</span>
                        </button>
                    </div>
                    <div className={`research-card-wrapper ${isResearchExpanded ? 'expanded' : ''}`}>
                        <div className="research-card">
                            <h3>{data.research.title}</h3>
                            <p>{data.research.content}</p>
                        </div>
                    </div>
                </div>
            </div>

            {selectedEntry && (
                <div className="entry-modal" onClick={() => setSelectedEntry(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedEntry(null)}>×</button>
                        <div className="modal-image">{selectedEntry.image}</div>
                        <div className="modal-badge">{selectedEntry.type}</div>
                        <h2>{selectedEntry.title}</h2>
                        <p>{selectedEntry.description}</p>
                        <div className="modal-audio">
                            <div className="audio-player-placeholder">
                                🔊 音频播放器占位
                                <div className="audio-wave">
                                    <span></span><span></span><span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="back-link">
                <Link to="/canal-map">← 返回运河舆图</Link>
                {city && (
                    <Link to={`/passenger-scroll/${city}`} className="passenger-link">
                        查看渡客长卷 →
                    </Link>
                )}
            </div>
        </div>
    )
}

export default NavigationArchive
