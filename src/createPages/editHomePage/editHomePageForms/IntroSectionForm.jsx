import React, { useState } from 'react';
import { useCardHook } from '../../../hooks/useCardHook';

const IntroSectionForm = () => {
    // Define initial state for file URLs
    const [introImage, setIntroImage] = useState({
        fileUrl1: '',
        fileUrl2: '',
    });

    const { uploadImage } = useCardHook();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Pass the individual file URLs as arguments to uploadImage function
        await uploadImage(introImage.fileUrl1, introImage.fileUrl2);

        // Reset the state after submission
        setIntroImage({
            fileUrl1: '',
            fileUrl2: '',
        });
    };

    return (
        <div className="">
            <div className="flex flex-col justify-center items-center">
                <div className="text-3xl font-bold">Intro Section</div>
                <div className="text-sm text-gray-500">Edit the Intro Section of the Home Page</div>

                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-slate-500 rounded-md p-4">
                    {/* Input for Background Image 1 */}
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-sm text-black">Background Img 1</div>
                        <input
                            className="bg-gray-700 rounded-md p-2 w-80"
                            type="text"
                            placeholder="Background Img"
                            id="fileUrl1"
                            value={introImage.fileUrl1}
                            onChange={(e) => setIntroImage({ ...introImage, fileUrl1: e.target.value })}
                        />
                    </div>

                    {/* Input for Background Image 2 */}
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-sm text-black">Background Img 2</div>
                        <input
                            className="bg-gray-700 rounded-md p-2 w-80"
                            type="text"
                            placeholder="Background Img"
                            id="fileUrl2"
                            value={introImage.fileUrl2}
                            onChange={(e) => setIntroImage({ ...introImage, fileUrl2: e.target.value })}
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 rounded-md p-2 w-80 mt-4">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IntroSectionForm;
