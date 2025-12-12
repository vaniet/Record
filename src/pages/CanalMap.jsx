import { useNavigate } from 'react-router-dom'
import { cities } from '../data/cities'
import './CanalMap.css'

function CanalMap() {
    const navigate = useNavigate()

    const handleCityClick = (cityId) => {
        navigate(`/navigation-archive/${cityId}`)
    }

    return (
        <div className="canal-map-page">
            <h1 className="page-title">运河舆图</h1>
            <p className="page-description">
                基于真实运河走向绘制的地图，点击城市地标可进入该城市的"航行密档"
            </p>

            <div className="map-container">
                <svg
                    viewBox="0 0 100 100"
                    className="canal-map-svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* 运河河道 */}
                    <path
                        d="M 15 15 Q 17 17, 20 20 Q 25 25, 30 30 Q 32 35, 35 40 Q 40 45, 45 50 Q 50 55, 50 58 Q 52 60, 55 60 Q 58 62, 60 75"
                        fill="none"
                        stroke="#4a90e2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="canal-path"
                    />
                    {/* 长江河道 - 将扬州和苏州隔开的曲折横线 */}
                    <path
                        d="M 10 54 Q 25 52, 40 54 Q 50 56, 60 55 Q 70 54, 85 56"
                        fill="none"
                        stroke="#4a90e2"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeDasharray="2,2"
                        opacity="0.6"
                    />

                    {/* 城市地标 */}
                    {cities.map((city, index) => (
                        <g key={index}>
                            <circle
                                cx={city.x}
                                cy={city.y}
                                r="2"
                                fill="#e74c3c"
                                stroke="white"
                                strokeWidth="0.5"
                                className="city-marker"
                                onClick={() => handleCityClick(city.id)}
                                style={{ cursor: 'pointer' }}
                            />
                            <text
                                x={city.x}
                                y={city.y - 6}
                                textAnchor="middle"
                                fontSize="2.8"
                                fill="#2c3e50"
                                fontWeight="bold"
                                className="city-label"
                                onClick={() => handleCityClick(city.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {city.name}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    )
}

export default CanalMap

