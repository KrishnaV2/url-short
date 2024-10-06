import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom"

export default function Redirect() {
    const location = useLocation()
    const id = location.pathname.split('/')[1].split('?')[0];
    const navigate = useNavigate();
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
        const dat = await res.json();
        // console.log(dat)
        return dat;
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
