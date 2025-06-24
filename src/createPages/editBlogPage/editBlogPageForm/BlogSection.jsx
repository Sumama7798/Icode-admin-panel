import React from 'react'
import { useState } from 'react'
import { useCardHook } from '../../../hooks/useCardHook'


const BlogSection = () => {
const [blogCard, setBlogCard] = useState({
             image: '',
             heading: '',
             description: '',
             blog: '',
         });
     
         const { createCard } = useCardHook();
     
         const handleSubmit = async (e) => {
             e.preventDefault();
     
             // Add hardcoded fields before submission
             const cardWithDefaults = {
                 ...blogCard,
                 page: 'blogPage',
                 section: 'blogSection',
             };
     
             await createCard(cardWithDefaults);
             setBlogCard({
                 image: '',
                 heading: '',
                 description: '',
                 blog: '',
             });
         };
     
         return (
             <div>
                 <div className="flex flex-col justify-center items-center">
                     <div className="text-3xl font-bold">Blog Section</div>
                     <div className="text-sm text-gray-500">Edit the Card for the Blog Section</div>
     
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
                                 value={blogCard.image}
                                 onChange={(e) =>
                                    setBlogCard({ ...blogCard, image: e.target.value })
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
                                 value={blogCard.heading}
                                 onChange={(e) =>
                                    setBlogCard({ ...blogCard, heading: e.target.value })
                                 }
                             />
                         </div>
     
                         <div className="flex flex-col justify-center items-center">
                             <div className="text-sm text-black">Description</div>
                             <textarea
                                 className="bg-gray-700 rounded-md p-2 w-80 h-48"
                                 placeholder="Description"
                                 id="description"
                                 value={blogCard.description}
                                 onChange={(e) =>
                                    setBlogCard({ ...blogCard, description: e.target.value })
                                 }
                             />
                         </div>


                         <div className="flex flex-col justify-center items-center">
                             <div className="text-sm text-black">Blog</div>
                             <textarea
                                 className="bg-gray-700 rounded-md p-2 w-80 h-48"
                                 placeholder="Blog"
                                 id="blog"
                                 value={blogCard.blog}
                                 onChange={(e) =>
                                    setBlogCard({ ...blogCard, blog: e.target.value })
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
}

export default BlogSection;