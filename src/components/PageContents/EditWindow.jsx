import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCardHook } from '../../hooks/useCardHook';
import { use } from 'react';

const EditWindow = ({ open, onClose, cardId, initialData }) => {
    const { updateCard } = useCardHook();

    const [heading, setHeading] = useState(initialData?.heading || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [image, setImage] = useState(initialData?.image || '');

    const handleSubmit = async () => {
        try {
            await updateCard(cardId, { heading, description ,image});
            window.location.reload();
            onClose();
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    return (
        <div
            onClick={onClose}
            className={`fixed top-0 left-0 right-0 bottom-0 z-50 min-w-20 flex justify-center items-center 
            transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all 
                ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-red-400"
                >
                    <X />
                </button>

                <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border-b-2 text-black border-gray-400 focus:outline-none focus:border-emerald-400 mb-4"
                    placeholder="Title"
                />

                <input
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    className="w-full border-b-2 text-black border-gray-400 focus:outline-none focus:border-emerald-400 mb-4"
                    placeholder="Title"
                />

                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border-b-2 text-black border-gray-400 focus:outline-none focus:border-emerald-400"
                    placeholder="Description"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-emerald-600 text-white rounded-lg p-2 mt-4 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditWindow;
