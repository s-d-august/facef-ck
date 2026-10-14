import { useState, useEffect, useRef } from 'react'
import './App.css'
import App from './App'
import AgeCheck from './assets/kkht/age-check/age-check'


function Landing() {

  const devMode = useRef(true)

  const [ageChecked, setAgeChecked] = useState(devMode.current)

  const [JP, setJP] = useState()


  useEffect(() => {
    const container = document.getElementById("container");
    if (container) container.classList.add("ready");

    if (ageChecked) {
      document.getElementById("mainDiv").classList.add("ready")
    } else {
      document.getElementById("ageCheckDiv")?.classList.add("ready")
    }

  }, [ageChecked]);

  useEffect(() => {
    if (localStorage.getItem("JP") === "false" || !localStorage.getItem("JP")) {
      setJP(false)
    } else {
      setJP(true)
    }
  }, []);


  return (
    <div id='container'>

      {!ageChecked ? <AgeCheck ageChecked={ageChecked}
        setAgeChecked={setAgeChecked} JP={JP} setJP={setJP} /> : <App JP={JP} setJP={setJP} devMode={devMode.current} />}

    </div>
  )
}

export default Landing
