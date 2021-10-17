import { useEffect, useState } from 'react';
import './info.scss'
import LocationResidentItem from '../location/residentItem';

export default function EpisodeInfo({ url, setModal }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json);
            })
    }, []);

    function clickCharacter(id) {
        setModal({type: 'CharacterInfo', id: id})
    }

    function doSearch() {
        setModal({type: 'EpisodeSearch'})
    }

    return (
        <>
            {!isLoaded && <div>Carregando...</div>}
            {error ? <div>Erro</div> :
                <>
                   <div className="modal-episode-info">
                       <h1 className="modal-location-info__name">{data.name ? data.name : "-"}</h1>
                       <table>
                            <tbody>
                                <tr>
                                    <th>episode</th>
                                    <td className="link" onClick={() => doSearch()}>{data.episode ? data.episode : '-'}</td>
                                </tr>
                                <tr>
                                    <th>air date</th>
                                    <td>{data.air_date ? data.air_date : '-'}</td>
                                </tr>
                            </tbody>                                   
                        </table>
                    </div>
                    <div className="modal-episode-characters">
                        <h3>Characters:</h3>
                        <div className="modal-episode-characters__list">
                            {data.characters ? data?.characters.map((character, index) => (
                                <LocationResidentItem key={index} url={character} clickCharacter={clickCharacter} />
                            )) : "Oops, something wrong is not right." }
                        </div>
                    </div>
                </>
            }
        </>
    )
}