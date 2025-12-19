import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { archiveData } from '../data/archives'
import CitySelector from '../components/CitySelector'
import './NavigationArchive.css'

function NavigationArchive() {
    const { city } = useParams()
    const navigate = useNavigate()
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null) // null = 显示全部
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

    // 兼容旧数据结构（没有 categories 的城市）
    const hasCategories = data.categories && Array.isArray(data.categories)

    // 根据分类ID返回不同颜色
    const getCategoryColor = (categoryId) => {
        const colors = {
            geography: '#6e5a3d',
            function: '#3f6f72',
            heritage: '#7a4f58'
        }
        return colors[categoryId] || '#6b5a42'
    }

    // 获取所有词条（扁平化）
    const getAllEntries = () => {
        if (!hasCategories) return data.entries || []
        return data.categories.flatMap((category) =>
            category.entries.map((entry) => ({
                ...entry,
                category
            }))
        )
    }

    // 根据筛选条件过滤词条
    const filteredEntries = selectedCategory
        ? getAllEntries().filter(entry => entry.category?.id === selectedCategory)
        : getAllEntries()

    return (
        <div className="navigation-archive-page">
            <h1 className="page-title">航行密档 · {data.city}</h1>

            <div className="archive-content">
                {hasCategories && (
                    <div className="category-filter">
                        <button
                            className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            全部
                        </button>
                        {data.categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                )}

                <div className="entries-section">
                    <h2>词条索引</h2>
                    <div className="entries-grid">
                        {filteredEntries.map((entry, idx) => (
                            <div
                                key={entry.id || idx}
                                className="entry-card"
                                onClick={() => setSelectedEntry(entry)}
                            >
                                <span className="corner-decoration corner-tl"></span>
                                <span className="corner-decoration corner-tr"></span>
                                <span className="corner-decoration corner-bl"></span>
                                <span className="corner-decoration corner-br"></span>
                                <h3>{entry.keyword || entry.title}</h3>
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
                <div className="entry-card-modal" onClick={() => setSelectedEntry(null)}>
                    <div className="entry-card-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedEntry(null)}>×</button>
                        {selectedEntry.category && (
                            <div className="card-category-badge">{selectedEntry.category.title}</div>
                        )}
                        <h2 className="card-keyword">{selectedEntry.keyword || selectedEntry.title}</h2>
                        {selectedEntry.summary && (
                            <div className="card-summary">{selectedEntry.summary}</div>
                        )}
                        <div className="card-detail">
                            {selectedEntry.detail ? (
                                selectedEntry.detail.split('\n').map((line, idx) => (
                                    <p key={idx}>{line || '\u00A0'}</p>
                                ))
                            ) : (
                                <p>{selectedEntry.description}</p>
                            )}
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
