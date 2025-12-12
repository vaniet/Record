import { useNavigate } from 'react-router-dom'
import { cities } from '../data/cities'
import './CitySelector.css'

function CitySelector({ title, description, onSelect }) {
    const navigate = useNavigate()

    const handleCityClick = (cityId) => {
        if (onSelect) {
            onSelect(cityId)
        } else {
            navigate(`/${title}/${cityId}`)
        }
    }

    return (
        <div className="city-selector-page">
            <h1 className="page-title">{title}</h1>
            <p className="page-description">{description}</p>

            <div className="cities-selection-grid">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        className="city-selection-card"
                        onClick={() => handleCityClick(city.id)}
                    >
                        <div className="city-selection-icon"></div>
                        <h3>{city.name}</h3>
                        <p>点击进入</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CitySelector

