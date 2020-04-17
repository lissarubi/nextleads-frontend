import './styles.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiSend } from 'react-icons/fi'
import api from '../../services/api'

import Header from '../../utils/Header'

export default function Form() {
    const [instName, setInstName] = useState('')
    const [instId, setInstId] = useState(0)
    const history = useHistory()

    const [leadName, setLeadName] = useState('')
    const [leadEmail, setLeadEmail] = useState('')
    const [leadTel, setLeadTel] = useState('')

    const url_string = window.location.href
    const url = new URL(url_string)
    const x = url.searchParams.get("x")

    async function preparePost(){
        try{
            const response = await api.get('users')
            const possibleIds = response.data.users
            for (let i = 0; i< possibleIds.length; i++){
                if (possibleIds[i].name === x){
                    setInstName(possibleIds[i].name)
                    setInstId(possibleIds[i].loginid)
                }
            }

            
        } catch(err){
            alert('Falha na conexão, tente novamente mais tarde.')
        }        
    }

    async function handleForm(e){
        e.preventDefault()

        let data = {
            name: leadName,
            email: leadEmail,
            tel: leadTel,
            contacted: false,
            interested: false,
            matriculated: false,
        }
        try{
            await api.post('leads', data, {
                headers: {
                    authorization: instId
                }
            })
            history.push('/thanks')
        }catch(err){
            alert('Falha na conexão, tente novamente mais tarde')
        }
    }

    window.onload = preparePost

    return(
        <div className="form-conteiner">
            <Header />
            <main className="cutDiv">
                <div className="formBox" id="formBox">
                    <span className="blackblock">Preencha o formulário abaixo para ser contactado pela {instName}</span>
                    <form className="form" onSubmit={handleForm}>
                        <div className="loginItem"><input className="formInput" type="text" name="name" id="name" placeholder="Seu nome" 
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)} /></div>
                        <div className="loginItem"><input className="formInput" type="email" name="email" id="email" placeholder="Seu E-mail"
                        value={leadEmail}
                        onChange={e => setLeadEmail(e.target.value)} /></div>
                        <div className="loginItem"><input className="formInput" type="tel" name="tel" id="tel" placeholder="Seu telefone"
                        value={leadTel}
                        onChange={e => setLeadTel(e.target.value)} /></div>
                        <button type="submit" className="startButton">Enviar <FiSend size={25} color="#fff" /></button>
                    </form>
                </div>
            </main>
        </div>
    )
}
