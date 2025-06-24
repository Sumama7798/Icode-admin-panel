import React from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion'

import WhoWeAreSection from './editAboutPageForm/WhoWeAreSection'
import LeadershipSection from './editAboutPageForm/LeadershipSection'
import ClientsSection from './editAboutPageForm/ClientsSection'

const tabs = [
  {id: "whoWeAre",title: 'WhoWeAre'},
  {id: "leadership",title: 'Leadership'},
  {id: "clients",title: 'Clients'},
  
       
]
const EditAboutPage = () => {

  const [activeTab, setActiveTab] = useState('whoWeAre')


return (
  <div className='pl-auto min-h-screen relative bg-gray-900 text-white overflow-hidden'>
      <div className='relative left-auto container'>
      <motion.div className='text-4xl  font-bold mb-8 mt-4 text-center text-emerald-400'
              initial={{opacity: 0 ,y: -20}}
              animate={{opacity: 1 ,y: 0}}
              transition={{duration: 0.8}}
      >
          Edit About Page

      </motion.div>

      <motion.div
      className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
  >

      <div className='flex justify-center mb-8'>

          {tabs.map((tab) => (
              <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200
                   ${activeTab === tab.id 
                      ? 'bg-emerald-400 text-white' 
                      : 'bg-gray-700 text-gray-300 hover-bg-gray-600'
                  }`}
                  >
                  {tab.title}
                  </button>))}
      </div>
      {activeTab === 'whoWeAre' && <WhoWeAreSection/>}
      {activeTab === 'leadership' && <LeadershipSection/>}
      {activeTab === 'clients' && <ClientsSection/>}
       </motion.div>
          
      </div> 

  </div>
)
}

export default EditAboutPage