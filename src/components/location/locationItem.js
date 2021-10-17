import { useEffect, useState } from 'react';
import './locationItem.scss';

export default function LocationSearchItem({clickLocation, url}) {
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
        <div className="location-search-item" onClick={() => clickLocation(data.url)}>
            {!isLoaded && <div>Carregando...</div>}
            {error ? <div>Erro</div> :
            <>
                {data.name}
                <span>{data.type}</span>
            </>
            }
        </div>
    )
}


