import { useEffect, useState } from 'react';
import CharacterEpisodeItem from './episodeItem';
import './info.scss'

export default function CharacterInfo({ id, setModal }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json);
            })
    }, []);

    function handleClick(url) {
        setModal({type: 'EpisodeInfo', url: url})
    }

    function clickLocation(url) {
        if (url !== '')
            setModal({type: 'LocationInfo', url:url})
    }
    function doSearch(key, value) {
        if (key === 'status' || key ==='gender') {
            value = value.toLowerCase();
        }
        if (value !== '')
            setModal({type: 'CharacterSearch', formValues:{ [key]:value }})
    }

    return (
        <>
            {!isLoaded && <div>Carregando...</div>}
            {error ? <div>Erro</div> :
                <>
                    <div className="modal-character-info">
                        <span className={`modal-character-info__species stamp ${data.status}`}>{data.status}</span>                    
                        <img className="modal-character-info__img" src={data.image} alt={data.name} />
                        <div className="modal-character-info__info">
                            <h1 className="modal-character-info__name">{data.name}</h1>
                            <div className="modal-character-info__details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>species</th>
                                            <td className="link" onClick={() => doSearch('species', data.species)}>{data.species ? data.species : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>type</th>
                                            <td className="link" onClick={() => doSearch('type', data.type)}>{data.type ? data.type : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>gender</th>
                                            <td className="link" onClick={() => doSearch('gender', data.gender)}>{data.gender ? data.gender : '-'}</td>
                                        </tr>
                                    </tbody>                                   
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>origin</th>
                                            <td className="link" onClick={() => clickLocation(data.origin.url)}>{data.origin ? data.origin.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>last location</th>
                                            <td className="link" onClick={() => clickLocation(data.location.url)}>{data.location ? data.location.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th>status</th>
                                            <td className="link" onClick={() => doSearch('status', data.status)}>{data.status ? data.status : '-'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-character-episodes">
                        <h3>Episodes:</h3>
                        <div className="modal-character-episodes__list">
                            {data.episode ? data?.episode.map((episode, index) => (
                                <CharacterEpisodeItem key={index} url={episode} handleClick={handleClick} />
                            )) : "Oops, something wrong is not right." }
                        </div>
                    </div>
                </>
            }
        </>
    )
}