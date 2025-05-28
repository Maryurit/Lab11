import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function CategoryPage() {
    const navigate = useNavigate();

    const defaultCategories = [
        { cod: 1, nom: "Horror" },
        { cod: 2, nom: "Comedy" },
        { cod: 3, nom: "Action" },
        { cod: 4, nom: "Drama" }
    ];

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("categories"));
        if (saved && saved.length > 0) {
            setCategories(saved);
        } else {
            setCategories(defaultCategories);
            localStorage.setItem("categories", JSON.stringify(defaultCategories));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const handleDelete = (id) => {
        const updated = categories.filter(cat => cat.cod !== id);
        setCategories(updated);
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>Categorías</h3>
                    <button
                        onClick={() => navigate('/categories/new')}
                        className="btn btn-primary"
                    >
                        Nueva Categoría
                    </button>
                </div>
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th className="text-center" style={{ width: "150px" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.cod}>
                                <td>{item.cod}</td>
                                <td>{item.nom}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => navigate(`/categories/edit/${item.cod}`)}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.cod)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        <i className="bi bi-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center">No hay categorías registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CategoryPage;

