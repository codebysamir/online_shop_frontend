import React, { useContext } from 'react'
import { ModalContext } from '../utils/ModalContext'

export default function Modal({modalText, acceptBtnText, acceptFunction, acceptBGColor, cancelFunction}) {
  const {modal, setModal} = useContext(ModalContext)
  
  const handleCloseModal = () => {
    setModal(false)
  }

  return (
    <div className='overlay' onClick={() => setModal(false)}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="text-box">
                {modalText}
            </div>
            <div className="button-box">
                <button className={acceptBGColor || 'accept-red'} onClick={acceptFunction}>{acceptBtnText ? acceptBtnText : 'Yes'}</button>
                <button className="cancel" onClick={cancelFunction || handleCloseModal}>CANCEL</button>
            </div>
        </div>
    </div>
  )
}
