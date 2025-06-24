import React from 'react'
import { useCardHook } from '../../../hooks/useCardHook'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageCard from '../../../components/PageContents/PageCard';

const DashBoardPages = () => {
    const {getCardsByPage,cards} = useCardHook();
    const {page} = useParams();

    
	useEffect(() => {
		getCardsByPage(page);
	}, [getCardsByPage, page]);

	

  return (
    <div className='min-h-screen ml-[250px]'>
        <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
            <motion.h1
                className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {page.charAt(0).toUpperCase() + page.slice(1)}
            </motion.h1>

            <motion.div
                className='grid pl-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {cards?.length === 0 && (
                    <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                        No cards found
                    </h2>
                )}

                {cards?.map((card) => (
                    <PageCard key={card._id} card={card} />
                ))}
            </motion.div>
        </div>
    </div>
);
}

export default DashBoardPages