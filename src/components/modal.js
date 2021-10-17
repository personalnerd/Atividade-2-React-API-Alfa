import CharacterInfo from "./character/info";
import CloseButton from './UI/CloseButton';
import './modal.scss'
import LocationInfo from "./location/info";
import EpisodeInfo from "./episode/info";
import CharacterSearch from "./character/search";
import { useEffect } from "react";
import LocationSearch from "./location/search";
import AllEpisodes from "./episode/all";

export default function Modal({props, setModal}) {
    const {type, id, url, formValues} = props;

    function closeModal() {
        setModal({type: null})
    }  

    useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            closeModal()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])
    
    if (type === 'CharacterInfo') {
        return (
            <div className="modal">
                <CloseButton closeModal={() => closeModal()} />
                <CharacterInfo id={id} setModal={setModal} />
            </div>
        )
    } else if (type === 'LocationInfo') {
        return (
            <div className="modal">
                <CloseButton closeModal={() => closeModal()} />
                <LocationInfo url={url} setModal={setModal} />
            </div>
        ) 
    } else if (type === 'EpisodeInfo') {
        return (
            <div className="modal">
                <CloseButton closeModal={() => closeModal()} />
                <EpisodeInfo url={url} setModal={setModal} />
            </div>
        ) 
    } else if (type === 'CharacterSearch') {
        return (        
            <div className="modal">
                <CloseButton closeModal={() => closeModal()} />
                <CharacterSearch formValues={formValues} setModal={setModal} />
            </div>            
        ) 
    } else if (type === 'LocationSearch') {
        return (        
            <div className="modal">
                <CloseButton closeModal={() => closeModal()} />
                <LocationSearch formValues={formValues} setModal={setModal} />
            </div>            
        ) 
    } else if (type === 'EpisodeSearch') {
        return (        
            <div className="modal">
                <CloseButton closeModal={() => closeModal()} />
                <AllEpisodes setModal={setModal} />
            </div>            
        ) 
    } else {
        return <div></div>
    }
}