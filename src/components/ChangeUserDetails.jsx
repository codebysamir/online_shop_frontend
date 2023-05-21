import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../utils/ModalContext'
import { UserContext } from '../utils/UserContext'

export default function ChangeUserDetails({detailToChange, setUserModal}) {
    const [input, setInput] = useState('')
    // const [loading, setLoading] = useState(false)
    const { updateUser, loading, error, setError, isSuccess, setIsSuccess } = useContext(UserContext)

    async function handleChangeUser() {
        const newChange = {[detailToChange]: input}
        updateUser(newChange)
        setInput('')
    }

    function handleCancel() {
        setUserModal(false)
        setError(false)
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => {
            setIsSuccess(false)
            setUserModal(false)
            console.log('Success Modal unomunt')
        }, 2000);
    }, [isSuccess])

    return (
        <div className='overlay' onClick={() => setUserModal(false)}>
            {isSuccess ?
            (<div className="modal-box success-box" onClick={(e) => e.stopPropagation()}>
                 <div className="text-box isSuccess">
                     {detailToChange.toUpperCase()} successfully changed !
                 </div>
             </div>)
            :
            (<div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div className="text-box">
                    Please enter the new {detailToChange} below:
                    <input type="text" value={input} placeholder={'new ' + detailToChange}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {loading && 'Loading...'}
                    {error && <span className="isError">{error}</span>
                    }
                </div>
                <div className="button-box">
                    <button className={'accept-black'} 
                    disabled={loading && true} 
                    onClick={handleChangeUser}>
                        Change now
                    </button>
                    <button className="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>)}
        </div>
    )
}
