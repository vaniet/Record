import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { charactersData } from '../data/characters'
import CitySelector from '../components/CitySelector'
import './PassengerScroll.css'

function PassengerScroll() {
    const { city } = useParams()
    const navigate = useNavigate()
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [flippedCharacters, setFlippedCharacters] = useState({})
    const [viewMode, setViewMode] = useState('scroll') // 'scroll' or 'network'
    const [hoveredEdge, setHoveredEdge] = useState(null) // { summary, detail, x, y }

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

    const isNanjing = city === 'nanjing'

    const handleCardClick = (character) => {
        setSelectedCharacter(character)
    }

    const handleImageClick = (event, character) => {
        // 仅翻转图片，不触发卡片点击的弹窗
        event.stopPropagation()
        setFlippedCharacters(prev => ({
            ...prev,
            [character.id]: !prev[character.id]
        }))
    }

    const handleEdgeEnter = (event, edge) => {
        setHoveredEdge({
            summary: edge.summary,
            detail: edge.detail,
            x: event.clientX,
            y: event.clientY
        })
    }

    const handleEdgeMove = (event) => {
        setHoveredEdge(prev => prev ? ({ ...prev, x: event.clientX, y: event.clientY }) : prev)
    }

    const handleEdgeLeave = () => {
        setHoveredEdge(null)
    }

    // 南京关系网：文字更“贴着线”，同时避开两端节点
    // 说明：这里依然在 0~100 的“百分比坐标”里计算，渲染时使用 x/y 的百分比写法
    const getEdgeLabelPosition = (from, to, idx) => {
        const dx = to.left - from.left
        const dy = to.top - from.top
        const len = Math.sqrt(dx * dx + dy * dy) || 1

        // 单位法向量（垂直于线段）
        const nx = -dy / len
        const ny = dx / len

        // 文字沿线段的位置：略偏向中间偏上/偏下（交替），让“关联更紧密”
        const baseT = 0.56
        const t = Math.max(0.35, Math.min(0.65, baseT + (idx % 3 - 1) * 0.03))

        const midX = from.left + dx * t
        const midY = from.top + dy * t

        // 垂直偏移：尽量小，让文字更贴线；线越短，偏移略大避免压住节点
        const baseOffset = 1.8
        const extraOffset = Math.max(0, 16 - len) * 0.12
        const offset = baseOffset + extraOffset
        const sign = idx % 2 === 0 ? 1 : -1

        const candA = { x: midX + nx * offset * sign, y: midY + ny * offset * sign }
        const candB = { x: midX - nx * offset * sign, y: midY - ny * offset * sign }

        const dist2 = (p, n) => {
            const ddx = p.x - n.left
            const ddy = p.y - n.top
            return ddx * ddx + ddy * ddy
        }

        // 取到两个端点“最小距离”更大的候选点
        const score = (p) => Math.min(dist2(p, from), dist2(p, to))
        const best = score(candA) >= score(candB) ? candA : candB

        // 轻微限制在画布内，避免贴边
        return {
            x: Math.max(6, Math.min(94, best.x)),
            y: Math.max(6, Math.min(94, best.y)),
        }
    }

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
                                className={`character-card ${isNanjing ? 'nanjing-card' : ''}`}
                                onClick={() => handleCardClick(character)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {isNanjing && character.imageFront && character.imageBack ? (
                                    <div
                                        className={`character-image image-flip ${flippedCharacters[character.id] ? 'flipped' : ''}`}
                                        onClick={(event) => handleImageClick(event, character)}
                                    >
                                        <div
                                            className="image-face image-front"
                                            style={{ backgroundImage: `url(${character.imageFront})` }}
                                        />
                                        <div
                                            className="image-face image-back"
                                            style={{ backgroundImage: `url(${character.imageBack})` }}
                                        />
                                    </div>
                                ) : (
                                    <div className="character-image">{character.image}</div>
                                )}
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
                        {isNanjing && data.network?.nodes?.length ? (
                            <>
                                {/* 南京：节点 */}
                                {data.network.nodes.map((node) => {
                                    const linkedCharacter = typeof node.characterId === 'number'
                                        ? data.characters.find(c => c.id === node.characterId)
                                        : null

                                    const isExtra = !linkedCharacter

                                    return (
                                        <div
                                            key={node.id}
                                            className={`network-node ${isExtra ? 'extra-node' : ''}`}
                                            style={{ left: `${node.left}%`, top: `${node.top}%` }}
                                            onClick={() => linkedCharacter && setSelectedCharacter(linkedCharacter)}
                                            role={linkedCharacter ? 'button' : undefined}
                                            tabIndex={linkedCharacter ? 0 : undefined}
                                        >
                                            {!isExtra ? (
                                                <>
                                                    <div className="node-image">
                                                        {linkedCharacter?.imageFront ? (
                                                            <div
                                                                className="node-photo"
                                                                style={{ backgroundImage: `url(${linkedCharacter.imageFront})` }}
                                                            />
                                                        ) : (
                                                            linkedCharacter?.image
                                                        )}
                                                    </div>
                                                    <div className="node-name">{node.name}</div>
                                                </>
                                            ) : (
                                                <div className="extra-node-name">{node.name}</div>
                                            )}
                                        </div>
                                    )
                                })}

                                {/* 南京：关系连线（摘要 + 悬停详情） */}
                                <svg className="relationship-lines relationship-lines--nanjing">
                                    {data.network.edges.map((edge, idx) => {
                                        const from = data.network.nodes.find(n => n.id === edge.from)
                                        const to = data.network.nodes.find(n => n.id === edge.to)
                                        if (!from || !to) return null

                                        // 支持“从某条边的中段分叉”的起点锚点
                                        let x1 = from.left
                                        let y1 = from.top
                                        if (edge.fromAnchor?.type === 'edgeMid') {
                                            const a = data.network.nodes.find(n => n.id === edge.fromAnchor.edgeFrom)
                                            const b = data.network.nodes.find(n => n.id === edge.fromAnchor.edgeTo)
                                            if (a && b) {
                                                const t = typeof edge.fromAnchor.t === 'number' ? edge.fromAnchor.t : 0.5
                                                x1 = a.left + (b.left - a.left) * t
                                                y1 = a.top + (b.top - a.top) * t
                                            }
                                        }

                                        const x2 = to.left
                                        const y2 = to.top

                                        const labelPos = getEdgeLabelPosition({ left: x1, top: y1 }, { left: x2, top: y2 }, idx)
                                        const edgeColor = edge.color || '#6b5a42'

                                        return (
                                            <g key={`${edge.from}-${edge.to}-${idx}`}>
                                                <line
                                                    x1={`${x1}%`}
                                                    y1={`${y1}%`}
                                                    x2={`${x2}%`}
                                                    y2={`${y2}%`}
                                                    stroke={edgeColor}
                                                    strokeWidth="2"
                                                    strokeDasharray="5,5"
                                                    opacity="0.55"
                                                />
                                                {!edge.hideLabel && edge.summary ? (
                                                    <text
                                                        x={`${labelPos.x}%`}
                                                        y={`${labelPos.y}%`}
                                                        className="relationship-label"
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                        onMouseEnter={(e) => handleEdgeEnter(e, edge)}
                                                        onMouseMove={handleEdgeMove}
                                                        onMouseLeave={handleEdgeLeave}
                                                        fill={edgeColor}
                                                    >
                                                        {edge.summary}
                                                    </text>
                                                ) : null}
                                            </g>
                                        )
                                    })}
                                </svg>
                            </>
                        ) : (
                            <>
                                {/* 其他城市：原逻辑 */}
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
                                        <div className="node-image">
                                            {isNanjing && character.imageFront ? (
                                                <div
                                                    className="node-photo"
                                                    style={{ backgroundImage: `url(${character.imageFront})` }}
                                                />
                                            ) : (
                                                character.image
                                            )}
                                        </div>
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
                            </>
                        )}
                    </div>
                </div>
            )}

            {isNanjing && viewMode === 'network' && hoveredEdge && (
                <div
                    className="relationship-tooltip"
                    style={{ left: hoveredEdge.x + 14, top: hoveredEdge.y + 14 }}
                >
                    <div className="relationship-tooltip-summary">{hoveredEdge.summary}</div>
                    <div className="relationship-tooltip-detail">{hoveredEdge.detail}</div>
                </div>
            )}

            {selectedCharacter && (
                <div className="character-modal" onClick={() => setSelectedCharacter(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedCharacter(null)}>×</button>
                        <div className="modal-character-image">
                            {isNanjing && selectedCharacter.imageFront ? (
                                <div
                                    className={`modal-photo image-flip ${flippedCharacters[selectedCharacter.id] ? 'flipped' : ''}`}
                                    onClick={(event) => handleImageClick(event, selectedCharacter)}
                                >
                                    <div
                                        className="image-face image-front"
                                        style={{ backgroundImage: `url(${selectedCharacter.imageFront})` }}
                                    />
                                    <div
                                        className="image-face image-back"
                                        style={{ backgroundImage: `url(${selectedCharacter.imageBack})` }}
                                    />
                                </div>
                            ) : (
                                selectedCharacter.image
                            )}
                        </div>
                        <h2>{selectedCharacter.name}</h2>
                        <div className="modal-character-role">{selectedCharacter.role}</div>
                        <p>{selectedCharacter.description}</p>
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
