import { Outlet } from 'react-router-dom'


const PublicLayout = () => {
  return (
    <>
    <header>
        <nav className=''>
            {/* Haeder content */}
        </nav>
    </header>

    <main>
        <Outlet/>
    </main>

    <footer>
        {/* Footer content */}
    </footer>
    </>
  )
}

export default PublicLayout