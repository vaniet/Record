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
                基于运河走向绘制的示意图，点击城市地标可进入该城市的"航行密档"
            </p>

            <div className="map-container">
                <svg
                    viewBox="0 0 100 100"
                    className="canal-map-svg"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* 运河河道 - 连接所有运河城市，流畅的曲线路径 */}
                    <path
                        d="M 27 8 
                           Q 32 12, 36 17 
                           Q 31 26, 26 36 
                           Q 32 45, 37 54 
                           Q 44 58, 51 63 
                           Q 55 69, 60 75 
                           Q 58 83, 56 91"
                        fill="none"
                        stroke="#4a90e2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="canal-path"
                    />
                    {/* 长江河道 - 经过南京和扬州，与扬州相交，将扬州和苏州隔开 */}
                    <path
                        d="M 8 67 
                           Q 20 67, 30 67 
                           Q 33 67, 36 67 
                           Q 43 65, 51 63 
                           Q 58 60, 68 65 
                           Q 75 68, 85 70"
                        fill="none"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        className="yangtze-path"
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
                                x={city.id === 'nanjing' ? city.x : city.x + 4}
                                y={city.id === 'nanjing' ? city.y + 6 : (city.id === 'yangzhou' ? city.y - 2 : city.y)}
                                textAnchor={city.id === 'nanjing' ? 'middle' : 'start'}
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

