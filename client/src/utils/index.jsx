import { lazy, Suspense, useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import styles from './utils.module.scss'

export const getImage = (imgUrl) => new URL(`/src/assets/images/${imgUrl}`, import.meta.url).href

export const PrestrainImg = ({ imgUrl }) => {
  const [loadingOk, setLoadingOk] = useState(false)

  useEffect(()=>{
    var image = new Image()
    image.src = `/src/assets/images/${imgUrl}`
    image.onload = () => setLoadingOk(true)
  }, [])

  return <img src={ loadingOk ? getImage(imgUrl) : getImage('loading1.jpg')} style={{ height: '100%' }}/>
}

export const lazyLoad = component => {
  const LazyComponent = lazy(component)
  return (
    <Suspense fallback={
      <div className={styles.lazyLoad}>
        <img src={getImage('loading1.jpg')} className={styles.gifimg} />
      </div>
    }>
      <LazyComponent />
    </Suspense>
  )
}

export const routerIntercept = Component => {

  let authenticate = ()=> {
    const token = localStorage.getItem("token")
    return token ? true : false
  }

  return (authenticate() ? Component : <Navigate to="/login"/> )
}
