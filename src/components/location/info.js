import { useEffect, useState } from 'react';
import './info.scss'
import LocationResidentItem from './residentItem';

export default function LocationInfo({ url, setModal }) {
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

    function doSearch(key, value) {
        if (value !== '')
            setModal({type: 'LocationSearch', formValues:{ [key]:value }})
    }
    
    return (
        <>
            {!isLoaded && <div>Carregando...</div>}
            {error ? <div>Erro</div> :
                <>
                   <div className="modal-location-info">
                       <h1 className="modal-location-info__name">{data.name ? data.name : "-"}</h1>
                       <table>
                            <tbody>
                                <tr>
                                    <th>type</th>
                                    <td className="link" onClick={() => doSearch('type', data.type)}>{data.type ? data.type : '-'}</td>
                                </tr>
                                <tr>
                                    <th>dimension</th>
                                    <td className="link" onClick={() => doSearch('dimension', data.dimension)}>{data.dimension ? data.dimension : '-'}</td>
                                </tr>
                            </tbody>                                   
                        </table>
                    </div>
                    <div className="modal-location-residents">
                        <h3>Residents:</h3>
                        <div className="modal-location-residents__list">
                            {data.residents ? data?.residents.map((resident, index) => (
                                <LocationResidentItem key={index} url={resident} clickCharacter={clickCharacter} />
                            )) : "Oops, something wrong is not right." }
                        </div>
                    </div>
                </>
            }
        </>
    )
}