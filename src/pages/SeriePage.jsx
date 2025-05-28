import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function SeriePage() {
    const [series, setSeries] = useState([]);

    // Inicializar series
    useEffect(() => {
        const savedSeries = JSON.parse(localStorage.getItem("series"));
        
        // Si no hay series guardadas, inicializar con las por defecto
        if (!savedSeries || savedSeries.length === 0) {
            const defaultSeries = [
                { cod: 1, nom: "Friends", cat: "Comedy", img: "friends.png" },
                { cod: 2, nom: "Law & Order", cat: "Drama", img: "law-and-order.png" },
                { cod: 3, nom: "The Big Bang Theory", cat: "Comedy", img: "the-big-bang.png" },
                { cod: 4, nom: "Stranger Things", cat: "Horror", img: "stranger-things.png" },
                { cod: 5, nom: "Dr. House", cat: "Drama", img: "dr-house.png" },
                { cod: 6, nom: "The X-Files", cat: "Drama", img: "the-x-files.png" }
            ];
            localStorage.setItem("series", JSON.stringify(defaultSeries));
            setSeries(defaultSeries);
        } else {
            setSeries(savedSeries);
        }
    }, []);

    const handleDelete = (cod) => {
        const updatedSeries = series.filter(serie => serie.cod !== cod);
        localStorage.setItem("series", JSON.stringify(updatedSeries));
        setSeries(updatedSeries);
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>Series</h3>
                    <Link to="/series/new" className="btn btn-primary">Nueva Serie</Link>
                </div>
                
                <div className="row">
                    {series.map(serie => (
                        <div key={serie.cod} className="col-md-4 mb-4">
                            <div className="card">
                                <img 
                                    src={`https://dummyimage.com/400x250/000/fff&text=${serie.img || "Imagen"}`} 
                                    className="card-img-top" 
                                    alt={serie.nom}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{serie.nom}</h5>
                                    <p className="card-text">{serie.cat}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link 
                                            to={`/series/edit/${serie.cod}`} 
                                            className="btn btn-warning"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(serie.cod)}
                                            className="btn btn-danger"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SeriePage;