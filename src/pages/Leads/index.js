import React, { useState, useEffect } from 'react'
import './styles.css'
import { FiPower } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import Darkmode from 'darkmode-js'
const darkmode = new Darkmode()
darkmode.showWidget()

export default function Leads(){
    const [leads, setLeads] = useState([])
    const instName = localStorage.getItem('instName')
    const loginId = localStorage.getItem('loginId')
    const history = useHistory()

    function toggleMenu(e){
        const navlinks = document.querySelector('div.navlinks')
        navlinks.classList.toggle('active')
    }

    useEffect(() => {
        api.get('leads', {
            headers: {
                authorization: loginId
            }
        }).then(response => {
            setLeads(response.data)
        })
    }, [loginId] )

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    async function handleContacted(leadId, instId){
        let data = ({
            leadId : leadId,
            item: 'contacted'
        })

        try {
            api.put('/changeLeadItem', data, {
                headers: {
                    authorization: instId
                }
            })

            setTimeout(() => {
                window.location.reload(false)
            }, 1000)
        }catch(err){
            alert('Falha na conexão, tente novamente mais tarde')
        }
    }
    async function handleInterested(leadId, instId){
        let data = ({
            leadId : leadId,
            item: 'interested'
        })

        try {
            api.put('/changeLeadItem', data, {
                headers: {
                    authorization: instId
                }
            })

            setTimeout(() => {
                window.location.reload(false)
            }, 1000)
        }catch(err){
            alert('Falha na conexão, tente novamente mais tarde')
        }
    }
    async function handleMatriculated(leadId, instId){
        let data = ({
            leadId : leadId,
            item: 'matriculated'
        })

        try {
            api.put('/changeLeadItem', data, {
                headers: {
                    authorization: instId
                }
            })

            setTimeout(() => {
                window.location.reload(false)
            }, 1000)
        }catch(err){
            alert('Falha na conexão, tente novamente mais tarde ')
        }
    }

    return(
        <div className="leads-conteiner">
            <header>
                <nav>
                <Link to="#" className="toggle-button" id="button" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </Link>
                    Olá, administrador do(a) {instName}
                    <div className="navlinks">
                        <Link to="/"><div className="li">Next</div></Link>
                    </div>
                        <FiPower size={30} color='#11548f' className="logout" onClick={handleLogout} />
                </nav>
            </header>
            <main>
                <span className="blackblock"></span>
                <div className="leadsBox">
                    {leads.map(lead => (
                        lead.contacted === 0 ?
                            <div className="lead" key={lead.id}>
                                <div className="leadItem">{lead.name}</div><br />
                                <div className="leadItem">{lead.email}</div><br />
                                <div className="leadItem">{lead.tel}</div>
                                <div className="leadItem"><button className="notContacted" onClick={ () => handleContacted(lead.id, lead.loginId) }>Contactar</button></div>
                            </div>
                        : lead.contacted === 1 && lead.interested === 1 && lead.matriculated === 0 ?
                            <div className="lead" key={lead.id}>
                                <div className="leadItem">{lead.name}</div><br />
                                <div className="leadItem">{lead.email}</div><br />
                                <div className="leadItem">{lead.tel}</div>
                                <div className="leadItem"><button className="contacted" >Contactado</button></div>
                                <div className="leadItem"><button className="interested" >Interessado</button></div>
                                <div className="leadItem"><button className="notMatriculated" onClick={ () => handleMatriculated(lead.id, lead.loginId) }>Matriculado</button></div>
                            </div>
                        : lead.contacted === 1 && lead.interested === 1 && lead.matriculated === 1 ?
                            <div className="lead" key={lead.id}>
                                <div className="leadItem">{lead.name}</div><br />
                                <div className="leadItem">{lead.email}</div><br />
                                <div className="leadItem">{lead.tel}</div>
                                <div className="leadItem"><button className="contacted" >Contactado</button></div>
                                <div className="leadItem"><button className="interested" >Interessado</button></div>
                                <div className="leadItem"><button className="matriculated" >Matriculado</button></div>
                            </div>
                        : lead.contacted === 1 && lead.interested === 1 ?
                            <div className="lead" key={lead.id}>
                                <div className="leadItem">{lead.name}</div><br />
                                <div className="leadItem">{lead.email}</div><br />
                                <div className="leadItem">{lead.tel}</div>
                                <div className="leadItem"><button className="contacted" >Contactado</button></div>
                                <div className="leadItem"><button className="interested" >Interessado</button></div>
                            </div> : 
                            <div className="lead" key={lead.id}>
                                <div className="leadItem">{lead.name}</div><br />
                                <div className="leadItem">{lead.email}</div><br />
                                <div className="leadItem">{lead.tel}</div>
                                <div className="leadItem"><button className="contacted" id={lead.id} >Contactado</button></div>
                                <div className="leadItem"><button className="notInterested" id={lead.id} onClick={ () => handleInterested(lead.id, lead.loginId) }>Interessado</button></div>
                            </div>

                    ))}
                </div>
            </main>

    </div>
    )
}
