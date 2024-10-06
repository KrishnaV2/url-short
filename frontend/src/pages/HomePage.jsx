import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

export default function HomePage() {
    const [url, setUrl] = useState("");
    let FE_URL = import.meta.env.VITE_FE_URL;
    const { isLoading, isSuccess, data, refetch } = useQuery({
        queryKey: ['writeURL'],
        queryFn: writeURLs,
        enabled: false
    })
    async function writeURLs() {
        const res = await fetch(`${import.meta.env.VITE_BE_URL}/url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url
            })
        });
        const dat = await res.json();
        // console.log(dat)
        return dat;
    }
    function copyToClipboard(e) {
        navigator.clipboard.writeText(e.target.textContent);
    }
    if (isSuccess) {
        console.log(data)
        FE_URL += `/${data.id}`
    }
    return (
        <div className='bg-gray-300 h-screen flex flex-col items-center'>
            <div className='pt-64 *:my-2'>
                <div className='text-2xl font-medium'>Enter URL to shorten it</div>
                <input type='url' placeholder='URL' onChange={(e) => setUrl(e.target.value)} className='py-5 px-7 text-xl mx-auto w-90% sm:w-[30rem]' />
                <div className='bg-blue-300 p-2 w-[12rem] mx-auto text-center hover:bg-blue-400 cursor-pointer' onClick={refetch}>Shorten URL</div>
                {isSuccess &&
                    <div className="group flex justify-center relative sm:w-full mx-auto">
                        <div className="hover:underline cursor-pointer hover:text-blue-500" onClick={copyToClipboard}>
                            {FE_URL}
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 absolute right-2">Copy</span>
                    </div>
                }
                {isLoading &&
                    <div className="flex justify-center">
                        Loading...
                    </div>
                }
            </div>
        </div>
    )
}
