import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CanalMap from './pages/CanalMap'
import CanalMapDebug from './pages/CanalMapDebug'
import NavigationArchive from './pages/NavigationArchive'
import PassengerScroll from './pages/PassengerScroll'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CanalMap />} />
          <Route path="/canal-map" element={<CanalMap />} />
          <Route path="/canal-map-debug" element={<CanalMapDebug />} />
          <Route path="/navigation-archive/:city?" element={<NavigationArchive />} />
          <Route path="/passenger-scroll/:city?" element={<PassengerScroll />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
