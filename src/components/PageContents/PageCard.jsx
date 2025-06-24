import React, { useState } from 'react'
import EditWindow from './EditWindow';
import { Trash2 } from 'lucide-react'
import { useCardHook } from '../../hooks/useCardHook'
import { toast } from 'react-hot-toast'

const PageCard = ({ card }) => {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // State for loading
    const { deleteCard } = useCardHook();

    const cardId = card._id;

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this card?");
        if (!confirmDelete) return;

        setIsDeleting(true); // Show loading state

        try {
            await deleteCard(cardId);
            toast.success('Card deleted successfully');
        } catch (error) {
            toast.error('Failed to delete card');
        } finally {
            setIsDeleting(false); // Reset loading state
        }
    };

    return (
        <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
            <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl' key={card._id}>
                <img className='object-cover w-full' src={card.image} alt='product image' />
                <div className='absolute inset-0 bg-black bg-opacity-20' />
            </div>

            <div className='mt-4 px-5 pb-5'>
                <h5 className='text-xl font-semibold tracking-tight text-white'>{card.heading}</h5>

                <div className='mt-2 mb-5 flex items-center justify-between'>
                    <p>
                        <span className='text-base font-bold text-emerald-400'>{card.description}</span>
                    </p>
                </div>

                <div className='mt-2 mb-5 flex items-center justify-between'>
                    <p>
                        <span className='text-base font-bold text-emerald-400'>{card.page}</span>
                    </p>
                </div>

                <div className='mt-2 mb-5 flex items-center justify-between'>
                    <p>
                        <span className='text-base font-bold text-emerald-400'>{card.section}</span>
                    </p>
                </div>

                <div className='mt-2 mb-5 flex items-center justify-between'>
                    <button
                        className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                        onClick={() => setOpen(true)}
                    >
                        Edit
                    </button>

                    <EditWindow open={open} onClose={() => setOpen(false)} cardId={card._id} initialData={card} />

                    <button
                        onClick={handleDelete}
                        className='flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300'
                        disabled={isDeleting} // Disable button while deleting
                    >
                        {isDeleting ? 'Deleting...' : <Trash2 />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PageCard;
