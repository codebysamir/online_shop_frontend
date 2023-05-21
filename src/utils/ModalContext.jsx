import React, { createContext, useState } from 'react'

export const ModalContext = createContext({
    modal: Boolean,
    setModal: () => {}
})

export default function ModalProvider({ children }) {
    const [modal, setModal] = useState(false)

    const ModalValue = {
        modal,
        setModal
    }

  return (
    <ModalContext.Provider value={ModalValue}>
        {children}
    </ModalContext.Provider>
  )
}
