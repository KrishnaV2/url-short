import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom"

export default function Redirect() {
    const location = useLocation()
    const id = location.pathname.split('/')[1].split('?')[0];
    const { isPending, isSuccess, data } = useQuery({
        queryKey: ['getURL'],
        queryFn: getOriginalURL,
    })
    async function getOriginalURL() {
        const res = await fetch(`${import.meta.env.VITE_BE_URL}/url/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await res.json();
    }
    if (isSuccess) {
        console.log(data)
        window.location.href = data.url;
    }
    if (isPending)
        return (
            <div className="h-screen bg-gray-300 text-3xl">Loading...</div>
        )
}
