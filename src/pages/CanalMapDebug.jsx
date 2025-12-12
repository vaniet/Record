import { useState } from 'react'
import { cities as initialCities } from '../data/cities'
import './CanalMap.css'

function CanalMapDebug() {
    const [cities, setCities] = useState(initialCities)
    const [draggingIndex, setDraggingIndex] = useState(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

    const handleMouseDown = (e, index) => {
        e.preventDefault()
        const city = cities[index]
        const svg = e.currentTarget.closest('svg')
        const point = svg.createSVGPoint()
        point.x = e.clientX
        point.y = e.clientY
        const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse())

        setDraggingIndex(index)
        setDragOffset({
            x: svgPoint.x - city.x,
            y: svgPoint.y - city.y
        })
    }

    const handleMouseMove = (e) => {
        if (draggingIndex === null) return

        const svg = e.currentTarget.closest('svg')
        const point = svg.createSVGPoint()
        point.x = e.clientX
        point.y = e.clientY
        const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse())

        const newCities = [...cities]
        newCities[draggingIndex] = {
            ...newCities[draggingIndex],
            x: svgPoint.x - dragOffset.x,
            y: svgPoint.y - dragOffset.y
        }
        setCities(newCities)
    }

    const handleMouseUp = () => {
        if (draggingIndex !== null) {
            console.log('城市坐标更新:')
            cities.forEach(city => {
                console.log(`{ name: '${city.name}', x: ${Math.round(city.x)}, y: ${Math.round(city.y)}, id: '${city.id}' },`)
            })
        }
        setDraggingIndex(null)
    }

    const copyCoordinates = () => {
        const coords = cities.map(city =>
            `{ name: '${city.name}', x: ${Math.round(city.x)}, y: ${Math.round(city.y)}, id: '${city.id}' },`
        ).join('\n    ')
        navigator.clipboard.writeText(coords)
        alert('坐标已复制到剪贴板！')
    }

    return (
        <div className="canal-map-page">
            <h1 className="page-title">运河舆图 - 调试模式</h1>
            <p className="page-description">
                拖拽城市地标调整位置，坐标会在控制台输出
            </p>

            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <button
                    onClick={copyCoordinates}
                    style={{
                        padding: '0.8rem 2rem',
                        background: '#8b7355',
                        color: '#f5f1e8',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'KaiTi, STKaiti, 楷体, serif'
                    }}
                >
                    复制所有坐标
                </button>
            </div>

            <div className="map-container">
                <svg
                    viewBox="0 0 100 100"
                    className="canal-map-svg"
                    preserveAspectRatio="xMidYMid meet"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* 运河河道 - 连接所有运河城市，流畅的曲线路径 */}
                    <path
                        d="M 23 10 
                           L 37 10 
                           Q 30 15, 25 20 
                           Q 15 28, 10 37 
                           Q 18 45, 30 50 
                           Q 35 52, 37 54 
                           Q 45 58, 55 61 
                           Q 60 62, 63 63 
                           Q 70 68, 80 75 
                           Q 88 80, 90 81 
                           Q 85 86, 77 90"
                        fill="none"
                        stroke="#4a90e2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="canal-path"
                    />
                    {/* 长江河道 - 经过南京和扬州，与扬州相交，将扬州和苏州隔开 */}
                    <path
                        d="M 8 68 
                           Q 20 70, 35 71 
                           Q 45 71.5, 50 72 
                           Q 56 68, 60 66 
                           L 63 63 
                           Q 68 60, 75 65 
                           Q 82 70, 92 72"
                        fill="none"
                        stroke="#4a90e2"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeDasharray="2,2"
                        opacity="0.6"
                    />

                    {/* 城市地标 - 可拖拽 */}
                    {cities.map((city, index) => (
                        <g key={index}>
                            <circle
                                cx={city.x}
                                cy={city.y}
                                r="2"
                                fill={draggingIndex === index ? "#c0392b" : "#e74c3c"}
                                stroke="white"
                                strokeWidth="0.5"
                                className="city-marker"
                                onMouseDown={(e) => handleMouseDown(e, index)}
                                style={{ cursor: 'move' }}
                            />
                            <text
                                x={city.x}
                                y={city.y - 6}
                                textAnchor="middle"
                                fontSize="2.8"
                                fill="#2c3e50"
                                fontWeight="bold"
                                className="city-label"
                                style={{ cursor: 'move', pointerEvents: 'none' }}
                            >
                                {city.name}
                            </text>
                            {/* 显示坐标 */}
                            <text
                                x={city.x}
                                y={city.y + 8}
                                textAnchor="middle"
                                fontSize="1.8"
                                fill="#666"
                                style={{ pointerEvents: 'none' }}
                            >
                                ({Math.round(city.x)}, {Math.round(city.y)})
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    )
}

export default CanalMapDebug

