import React, { useState, useEffect } from 'react'

function DevForm(onSubmit) {
   const [github_username, setGithubUsername] = useState('')
   const [techs, setTechs] = useState('')
   const [ latitude, setlatitude ] = useState('')
   const [ longitude, setlongitude ] = useState('')
   

   useEffect(() => {
    navigator.geolocation.getCurrentPosition(
       (position) => {
          const { latitude, longitude } = position.coords
          setlatitude(latitude)
          setlongitude(longitude)
       },
       (err) => {
          console.log("Error Geolocation:",err)
       },
       {
          timeout: 30000,
       }
    )
 }, []) 

 async function handleSubmit(e) {
     e.preventDefault();

     await onSubmit({
            setGithubUsername,
            setTechs,
            setlatitude,
            setlongitude
     })
       
     setGithubUsername('')
     setTechs('')
    }

    return(
        <form onSubmit={handleSubmit}>
               <div className="input-block">
                  <label htmlFor="github_username">Usuário do Github</label>
                  <input name="github_username" id="github_username" value={github_username} onChange={e => setGithubUsername(e.target.value)} required />
               </div>

               <div className="input-block">
                  <label htmlFor="techs">Tecnologias</label>
                  <input name="techs" id="techs" value={techs} onChange={ e => setTechs(e.target.value) } required />
               </div>

               <div className="input-group">
                  <div className="input-block">
                     <label htmlFor="latitude">Latitude</label>
                     <input name="latitude" id="latitude" value={latitude} onChange={ e => setTechs(e.target.value) }  required />
                  </div>
            
                  <div className="input-block">
                     <label htmlFor="longitude">Longitude</label>
                     <input name="longitude" id="longitude" value={longitude} onChange={ e => setTechs(e.target.value) } required />
                  </div>
               </div>
               <button type="submit">Salvar</button>
            </form>
)}

export default DevForm