import React from 'react';
import PageContents from '../../components/PageContents/PageContent.jsx';
import { Wrench,Users ,House,MessageCircle,Mail} from 'lucide-react';
import { motion } from 'framer-motion';


const pages = [
	{ href: "/homePage", name: "Home", icon: <House size={50}/> },
	{ href: "/aboutPage", name: "About", icon: <Users size={50}/> },
	{ href: "/blogPage", name: "Blog", icon: <MessageCircle size={50}/> },
	{ href: "/servicesPage", name: "Services", icon: <Wrench size={50}/> },
	{ href: "/contactPage", name: "Contact", icon: <Mail size={50}/> },	
];

const DashBoard = () => {

 
  return (
    <div className='relative pl-2 min-h-screen text-white overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>

        <motion.div 
              initial={{opacity: 0 ,y: -20}}
              animate={{opacity: 1 ,y: 0}}
              transition={{duration: 0.8}}
        className='text-center text-5xl font-bold text-emerald-400'>
            DashBoard
        </motion.div>

        <motion.div
                
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
        >

      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {pages.map((page) => (
          <PageContents page={page} key={page.name}/>
        ))}

    
        </div>      

       </motion.div>
      </div>
    </div>
  );
};

export default DashBoard;