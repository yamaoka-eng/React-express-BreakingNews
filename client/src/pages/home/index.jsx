import React from 'react'
import './index.scss'

const Svg = () => {
  return (
    <header className='header md:h-[50rem] h-[22rem] relative'>
      <div className='preview-overlay absolute bottom-0'>
        <svg className="preview-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
          </defs>
          <g className="preview-parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="var(--gentle-wave1)"></use>
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="var(--gentle-wave2)"></use>
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="var(--gentle-wave3)"></use>
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--gentle-wave)"></use>
          </g>
        </svg>
      </div>
    </header>
  )
}

const Home = () => {
  return (
    <div className='bg-white h-full w-full'>
      <Svg />
    </div>
  )
}

export default Home