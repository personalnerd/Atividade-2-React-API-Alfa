import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './item.scss';

export default function CharacterItem({clickCharacter, props}) {
    return (
        <div className="character-item" onClick={() => clickCharacter(props.id)}>
            <img className="character-img" src={`https://rickandmortyapi.com/api/character/avatar/${props.id}.jpeg`} />
            <div className="character-info">
                <p className="character-info__name">{props.name}</p>
                <p className="character-info__specie">{props.species}</p>
            </div>
            <FontAwesomeIcon className="character-item__icon" icon={faChevronRight} />
        </div>
    )
}