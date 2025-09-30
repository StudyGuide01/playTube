import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react'

const CreateChannel = () => {
    const [step, setStep] = useState(1); // start from step 1
    const [avatar, setAvatar] = useState(null);
    const [banner, setBanner] = useState(null);
    const [name, setName] =  useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    // Separate handlers for avatar & banner
    const handleAvatarFile = (e) => {
        setAvatar(e.target.files[0]);
    }

    const handleBannerFile = (e) => {
        setBanner(e.target.files[0]);
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Create Channel</h1>

            {/* Step One */}
            {step === 1 && (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <label htmlFor="avatarInput" className="flex flex-col items-center cursor-pointer">
                            {avatar ?   
                                <img src={URL.createObjectURL(avatar)} alt="avatar image" width={50} height={50} className="rounded-full"/> 
                                :
                                <FaRegUserCircle size={50} />
                            }
                            <span className="mt-2 text-sm">Upload Image</span>
                        </label>
                        <input 
                            type="file" 
                            id="avatarInput"
                            className="opacity-0 w-0 h-0"
                            onChange={handleAvatarFile}
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder="Channel Name" 
                        className="border border-black p-2 rounded" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    
                    <div className="flex gap-4">
                        <button 
                            disabled={!name} 
                            className={`px-4 py-2 rounded bg-blue-500 text-white ${!name ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                            onClick={() => setStep(2)}
                        >
                            Continue
                        </button>
                        <button className="px-4 py-2 rounded border" onClick={() => console.log('Back to Home')}>
                            Back To Home
                        </button>
                    </div>
                </div>
            )}

            {/* Step Two */}
            {step === 2 && (
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <label htmlFor="bannerInput" className="flex flex-col items-center cursor-pointer">
                            {banner ?   
                                <img src={URL.createObjectURL(banner)} alt="banner image" width={50} height={50} className="rounded-full"/> 
                                :
                                <FaRegUserCircle size={50} />
                            }
                            <span className="mt-2 text-sm">Upload Banner</span>
                        </label>
                        <input 
                            type="file" 
                            id="bannerInput"
                            className="opacity-0 w-0 h-0"
                            onChange={handleBannerFile}
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder="Description" 
                        className="border border-black p-2 rounded" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="Category" 
                        className="border border-black p-2 rounded" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <div className="flex gap-4">
                        <button 
                            disabled={!description || !category} 
                            className={`px-4 py-2 rounded bg-blue-500 text-white ${(!description || !category) ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                            onClick={() => console.log('Step 2 Continue')}
                        >
                            Continue
                        </button>
                        <button className="px-4 py-2 rounded border" onClick={() => setStep(1)}>
                            Back To Step 1
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateChannel
