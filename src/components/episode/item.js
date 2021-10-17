import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './item.scss';

export default function EpisodeItem({episode, handleClick}) {
    return (
        <div className="episode-item" onClick={() => handleClick(episode.url)}>
            <div className="episode-info">
                <p className="episode-info__name">{episode.name}</p>
                <p className="episode-info__episode">{episode.episode}</p>
            </div>
            <FontAwesomeIcon className="episode-item__icon" icon={faChevronRight} />
        </div>
    )
}