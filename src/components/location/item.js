import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './item.scss';

export default function LocationItem({location, handleClick}) {
    return (
        <div className="location-item" onClick={() => handleClick(location.url)}>
            <div className="location-info">
                <p className="location-info__name">{location.name}</p>
                <p className="location-info__type">{location.type}</p>
            </div>
            <FontAwesomeIcon className="location-item__icon" icon={faChevronRight} />
        </div>
    )
}