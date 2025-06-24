import React from 'react'
import { useState } from 'react';
import { useCardHook } from '../../../hooks/useCardHook';

const LeadershipSection = () => {
  const [leadershipCard, setLeadershipCard] = useState({
            image: '',
            heading: '',
            description: '',
        });
    
        const { createCard } = useCardHook();
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            // Add hardcoded fields before submission
            const cardWithDefaults = {
                ...leadershipCard,
                page: 'aboutPage',
                section: 'LeadershipSection',
            };
    
            await createCard(cardWithDefaults);
            setLeadershipCard({
                image: '',
                heading: '',
                description: '',
            });
        };
    
        return (
            <div>
                <div className="flex flex-col justify-center items-center">
                    <div className="text-3xl font-bold">Leadership Section</div>
                    <div className="text-sm text-gray-500">Edit the Card for the Leadership Section</div>
    
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center bg-slate-500 rounded-md p-4"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-sm text-black">Image</div>
                            <input
                                className="bg-gray-700 rounded-md p-2 w-80"
                                type="text"
                                placeholder="Image URL"
                                id="image"
                                value={leadershipCard.image}
                                onChange={(e) =>
                                    setLeadershipCard({ ...leadershipCard, image: e.target.value })
                                }
                            />
                        </div>
    
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-sm text-black">Heading</div>
                            <input
                                className="bg-gray-700 rounded-md p-2 w-80"
                                type="text"
                                placeholder="Heading"
                                id="heading"
                                value={leadershipCard.heading}
                                onChange={(e) =>
                                    setLeadershipCard({ ...leadershipCard, heading: e.target.value })
                                }
                            />
                        </div>
    
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-sm text-black">Description</div>
                            <textarea
                                className="bg-gray-700 rounded-md p-2 w-80 h-48"
                                placeholder="Description"
                                id="description"
                                value={leadershipCard.description}
                                onChange={(e) =>
                                    setLeadershipCard({ ...leadershipCard, description: e.target.value })
                                }
                            />
                        </div>
    
                        <button
                            type="submit"
                            className="bg-blue-500 rounded-md p-2 w-80 mt-4"
                        >
                            Create Card
                        </button>
                    </form>
                </div>
            </div>
        );
    };

export default LeadershipSection