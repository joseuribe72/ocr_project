import CardMenu from './components/CardMenu'
import './components/Navbar'
import Navbar from './components/Navbar'
import OutputBox from './components/OutputBox'

function App() {

  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className='mt-4'>
          <CardMenu />
        </div>
        <div className='mt-4'>
          <OutputBox />
        </div>
      </div>
    </>
  )
}

export default App
