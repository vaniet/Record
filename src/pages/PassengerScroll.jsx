import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { charactersData } from '../data/characters'
import CitySelector from '../components/CitySelector'
import './PassengerScroll.css'

function PassengerScroll() {
    const { city } = useParams()
    const navigate = useNavigate()
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [viewMode, setViewMode] = useState('scroll') // 'scroll' or 'network'

    // 如果没有城市参数，显示城市选择界面
    if (!city) {
        return (
            <CitySelector
                title="渡客长卷"
                description="请选择要查看的城市人物图册"
                onSelect={(cityId) => navigate(`/passenger-scroll/${cityId}`)}
            />
        )
    }

    const data = charactersData[city] || charactersData.default

    return (
        <div className="passenger-scroll-page">
            <h1 className="page-title">{data.title}</h1>

            <div className="view-toggle">
                <button
                    className={viewMode === 'scroll' ? 'active' : ''}
                    onClick={() => setViewMode('scroll')}
                >
                    人物图册
                </button>
                <button
                    className={viewMode === 'network' ? 'active' : ''}
                    onClick={() => setViewMode('network')}
                >
                    关系网络
                </button>
            </div>

            {viewMode === 'scroll' ? (
                <div className="scroll-container">
                    <div className="scroll-content">
                        {data.characters.map((character, index) => (
                            <div
                                key={character.id}
                                className="character-card"
                                onClick={() => setSelectedCharacter(character)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="character-image">{character.image}</div>
                                <div className="character-info">
                                    <h3>{character.name}</h3>
                                    <div className="character-role">{character.role}</div>
                                    <p>{character.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="network-container">
                    <div className="network-graph">
                        {data.characters.map((character) => (
                            <div
                                key={character.id}
                                className="network-node"
                                style={{
                                    left: `${30 + (character.id - 1) * 15}%`,
                                    top: `${20 + ((character.id - 1) % 3) * 30}%`
                                }}
                                onClick={() => setSelectedCharacter(character)}
                            >
                                <div className="node-image">{character.image}</div>
                                <div className="node-name">{character.name}</div>
                            </div>
                        ))}
                        {/* 关系连线 */}
                        <svg
                            className="relationship-lines"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                                zIndex: 1
                            }}
                        >
                            {data.characters.map((character) =>
                                character.relationships.map((relId) => {
                                    const target = data.characters.find(c => c.id === relId)
                                    if (!target || character.id >= relId) return null // 避免重复连线
                                    const sourceIndex = character.id - 1
                                    const targetIndex = target.id - 1
                                    const getX = (index) => 30 + index * 15
                                    const getY = (index) => 20 + (index % 3) * 30
                                    return (
                                        <line
                                            key={`${character.id}-${relId}`}
                                            x1={`${getX(sourceIndex)}%`}
                                            y1={`${getY(sourceIndex)}%`}
                                            x2={`${getX(targetIndex)}%`}
                                            y2={`${getY(targetIndex)}%`}
                                            stroke="#8b7355"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                            opacity="0.5"
                                        />
                                    )
                                })
                            )}
                        </svg>
                    </div>
                </div>
            )}

            {selectedCharacter && (
                <div className="character-modal" onClick={() => setSelectedCharacter(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedCharacter(null)}>×</button>
                        <div className="modal-character-image">{selectedCharacter.image}</div>
                        <h2>{selectedCharacter.name}</h2>
                        <div className="modal-character-role">{selectedCharacter.role}</div>
                        <p>{selectedCharacter.description}</p>
                        <div className="modal-relationships">
                            <h3>相关人物</h3>
                            <div className="related-characters">
                                {selectedCharacter.relationships.map((relId) => {
                                    const related = data.characters.find(c => c.id === relId)
                                    if (!related) return null
                                    return (
                                        <div key={relId} className="related-character">
                                            <div className="related-image">{related.image}</div>
                                            <div className="related-name">{related.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="back-link">
                <Link to="/canal-map">← 返回运河舆图</Link>
                {city && (
                    <Link to={`/navigation-archive/${city}`} className="archive-link">
                        查看航行密档 →
                    </Link>
                )}
            </div>
        </div>
    )
}

export default PassengerScroll
