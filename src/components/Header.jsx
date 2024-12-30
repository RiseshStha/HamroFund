import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <>
        <div className='min-h-screen mb-4 bg-cover bg-center flex
        items-center w-full overflow-hidden' style={{backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.photographylife.com%2Fwp-content%2Fuploads%2F2014%2F09%2FNikon-D750-Image-Samples-2.jpg&f=1&nofb=1&ipt=dee06b94e06325ee15ef797b2db0c2f404043930efde27381e5b17a7b460fee8&ipo=images')"}}
        id='Header'>
        <Navbar/>
        </div>
    </>
  )
}

export default Header