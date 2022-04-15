import React from 'react'

const Svg = () => {
  return (
    <svg className="preview-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
      </defs>
      <g className="preview-parallax" style={{ width: '4000px', height: '246px'}}>
        <use xmlnsXlink="#gentle-wave" x="48" y="0" fill="var(--gentle-wave1)" style={{ width: '3132px', height: '221px'}}></use>
        <use xmlnsXlink="#gentle-wave" x="48" y="3" fill="var(--gentle-wave2)" style={{ width: '3132px', height: '221px'}}></use>
        <use xmlnsXlink="#gentle-wave" x="48" y="5" fill="var(--gentle-wave3)" style={{ width: '3132px', height: '221px'}}></use>
        <use xmlnsXlink="#gentle-wave" x="48" y="7" fill="var(--gentle-wave)" style={{ width: '3132px', height: '221px'}}></use>
      </g>
    </svg>
  )
}

const Home = () => {
  return (
    <div>
      <Svg />
    </div>
  )
}

export default Home