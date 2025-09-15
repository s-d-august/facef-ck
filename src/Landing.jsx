import { useState, useEffect, useRef } from 'react'
import './App.css'
import App from './App'
import AgeCheck from './assets/kkht/age-check/age-check'


function Landing() {

  const [ageChecked, setAgeChecked] = useState(false)

  const [JP, setJP] = useState(localStorage.getItem("JP"))

  useEffect(() => {
    if (ageChecked) {
      document.getElementById("mainDiv").classList.add("ready")
    } else {
      document.getElementById("ageCheckDiv")?.classList.add("ready")
    }

  }, [ageChecked]);

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) container.classList.add("ready");
  }, [ageChecked]);


  return (
    <div id='container'>

      {!ageChecked ? <AgeCheck ageChecked={ageChecked}
        setAgeChecked={setAgeChecked} JP={JP} setJP={setJP} /> : <App JP={JP} setJP={setJP} />}

    </div>
  )
}

export default Landing
