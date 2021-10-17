import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './CloseButton.scss';

export default function CloseButton({closeModal}) {
    return <button onClick={() => closeModal()} className="close-button"><FontAwesomeIcon icon={faTimes} /></button>
}