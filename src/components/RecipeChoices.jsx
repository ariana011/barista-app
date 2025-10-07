import { useState } from "react";

const RecipeChoices = ({ handleChange, label, choices, currentVal }) => {
    return (
        <div className="recipe-section">
            {/* One text box for user input */}
            <input
                type="text"
                name={label}
                value={currentVal}
                placeholder="Guess the ingredient..."
                onChange={handleChange}
                className="textbox"
            />

            {/* List out the possible choices for reference */}
            <ul>
                {choices &&
                    choices.map((choice) => (
                        <li key={choice}>
                            {choice}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default RecipeChoices;

