import React, { useState } from "react";
import "./GenreSelection.css";

function GenreSelection() {
    const [selected, setSelected] = useState([]);

    const genres = ["Music", "Food", "Art", "Technology", "Sports"];

    const toggleGenre = (genre) => {
        setSelected((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    return (
        <div className="genre-container">
            <h2>Select Your Preferred Genres</h2>
            <div className="genre-list">
                {genres.map((genre) => (
                    <div 
                       key={genre}
                       className={`genre-item ${selected.includes(genre) ? "active" : ""}`}
                       onClick={() => toggleGenre(genre)}
                    >
                        {genre}
                    </div>
                ))}
            </div>
            <button className="save-btn">Save Preferences</button>
        </div>
    )
}

export default GenreSelection;