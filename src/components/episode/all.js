import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import EpisodeSearchItem from './episodeItem';
import './all.scss'

export default function AllEpisodes({ setModal }) {
    const [dataS1, setDataS1] = useState([]);
    const [dataS2, setDataS2] = useState([]);
    const [dataS3, setDataS3] = useState([]);
    const [dataS4, setDataS4] = useState([]);
    
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/?episode=S01`)
        .then(res => res.json())
        .then(json => {
            setDataS1(json.results)
        })

        fetch(`https://rickandmortyapi.com/api/episode/?episode=S02`)
        .then(res => res.json())
        .then(json => {
            setDataS2(json.results)
        })
        
        fetch(`https://rickandmortyapi.com/api/episode/?episode=S03`)
        .then(res => res.json())
        .then(json => {
            setDataS3(json.results)
        })
        
        fetch(`https://rickandmortyapi.com/api/episode/?episode=S04`)
        .then(res => res.json())
        .then(json => {
            setDataS4(json.results)
        })
    }, [])
    
    function clickEpisode(url) {
        setModal({type: 'EpisodeInfo', url: url})
    }

    return (
        <>
            <div className="modal-episodes-search-filter">
                <h1 className="modal-search-filter__title">All Episodes</h1>
            </div>
            <div className="modal-episodes-search-results">
                <h3>Season 01</h3>
                <div className="modal-episodes-search-results__list">
                    {dataS1 && dataS1?.map((episode) => (
                        <EpisodeSearchItem key={episode.id} url={episode.url} clickEpisode={clickEpisode} />
                    ))}
                </div>
                <h3>Season 02</h3>
                <div className="modal-episodes-search-results__list">
                    {dataS2 && dataS2?.map((episode) => (
                        <EpisodeSearchItem key={episode.id} url={episode.url} clickEpisode={clickEpisode} />
                    ))}
                </div>
                <h3>Season 03</h3>
                <div className="modal-episodes-search-results__list">
                    {dataS3 && dataS3?.map((episode) => (
                        <EpisodeSearchItem key={episode.id} url={episode.url} clickEpisode={clickEpisode} />
                    ))}
                </div>
                <h3>Season 04</h3>
                <div className="modal-episodes-search-results__list">
                    {dataS4 && dataS4?.map((episode) => (
                        <EpisodeSearchItem key={episode.id} url={episode.url} clickEpisode={clickEpisode} />
                    ))}
                </div>
            </div>
        </>
    )
}