import { useEffect, useState } from "react";
import { Women } from "../../../lib/types/types";
import { GirlCard } from "../../molecules/GirlCard/girlCard";
import axios from 'axios';

export const GirlList = () => {
    const [girls, setGirls] = useState<Women[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGirls = async () => {
        try {
            const response = await axios.get('https://backlatinassexcam.onrender.com/LatinasSexCam/women/womens');
            console.log("Response data:", response.data);

            if (Array.isArray(response.data)) {
                setGirls(response.data);
            } else {
                setError("La respuesta no es un array");
                setGirls([]);
            }
        } catch (err) {
            console.error("Error fetching girls: ", err);
            setError("Error fetching girls: " + (err.response?.data?.message || err.message));
            setGirls([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGirls();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        {girls.map((girl) => (
            <GirlCard
                key={girl.id_user} 
                user={girl}
                name={girl.name}
            />
        ))}
    </>
    );
};
