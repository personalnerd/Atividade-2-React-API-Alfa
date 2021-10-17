import { useEffect, useState } from 'react';
import './episodeItem.scss';

export default function CharacterEpisodeItem({url, handleClick}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json)
            })
    }, []);

    return (
        <div className="character-episode-item" onClick={() => handleClick(data.url)}>
            {!isLoaded && <div>Carregando...</div>}
            {error ? <div>Erro</div> :
            <>
                <span>{data.episode}</span> {data.name}
            </>
            }
        </div>
    )
}


