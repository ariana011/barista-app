import { useEffect, useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinkJson from "./drink.json";


const BaristaForm = () => {
    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const [currentDrink, setCurrentDrink] = useState("");
    const [trueRecipe, setTrueRecipe] = useState(null);

    const [correct_temp, setCorrectTemp] = useState("");
    const [correct_syrup, setCorrectSyrup] = useState("");
    const [correct_milk, setCorrectMilk] = useState("");
    const [correct_blended, setCorrectBlended] = useState("");

    const ingredients = {
        'temperature': ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    }

    useEffect(() => {
        getNextDrink();
    }, []);

    const onNewDrink = () => {
        setInputs({ temperature: '', milk: '', syrup: '', blended: '' });
        setCorrectTemp("");
        setCorrectSyrup("");
        setCorrectMilk("");
        setCorrectBlended("");
        getNextDrink();
    };

    const onCheckAnswer = (e) => {
        e?.preventDefault?.();
        if (!trueRecipe) return;

        if (trueRecipe.temperature !== inputs.temperature) setCorrectTemp("wrong");
        else setCorrectTemp("correct");

        if (trueRecipe.syrup !== inputs.syrup) setCorrectSyrup("wrong");
        else setCorrectSyrup("correct");

        if (trueRecipe.milk !== inputs.milk) setCorrectMilk("wrong");
        else setCorrectMilk("correct");

        if (trueRecipe.blended !== inputs.blended) setCorrectBlended("wrong");
        else setCorrectBlended("correct");

        if (!ingredients['temperature'].includes(inputs['temperature'])) {
            alert("For temperature, that isn't even an option!")
        }
    };

    const getNextDrink = () => {
        const randomDrinkIndex = Math.floor(Math.random() * drinkJson.drinks.length);
        setCurrentDrink(drinkJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinkJson.drinks[randomDrinkIndex].ingredients);
    };


    // Handle user input changes
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };



    return (
        <div className="mini-container">
            <h2>Hi, I'd like to order a:</h2>
            <h3>{currentDrink}</h3>
            <form>
                <h3>Temperature</h3>
                <div className="answer-space" id={correct_temp} >
                    {inputs["temperature"]}
                </div>
                <RecipeChoices
                    handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="temperature"
                    choices={ingredients["temperature"]}
                    currentVal={inputs["temperature"]}
                />
                <h3>Syrup</h3>
                <div className="answer-space" id="{correct_syrup}" >
                    {inputs["syrup"]}
                </div>
                <RecipeChoices
                    handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="syrup"
                    choices={ingredients["syrup"]}
                    currentVal={inputs["syrup"]}
                />
                <h3>Milk</h3>
                <div className="answer-space" id={correct_milk} >
                    {inputs["milk"]}
                </div>
                <RecipeChoices
                    handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="milk"
                    choices={ingredients["milk"]}
                    currentVal={inputs["milk"]}
                />
                <h3>Blended</h3>
                <div className="answer-space" id={correct_blended} >
                    {inputs["blended"]}
                </div>
                <RecipeChoices
                    handleChange={(e) => setInputs((prevState) => ({
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }))}
                    label="blended"
                    choices={ingredients["blended"]}
                    currentVal={inputs["blended"]}
                />
            </form>
            <button className="button submit" onClick={onCheckAnswer}>Check Answer</button>
            <button className="button newDrink" onClick={onNewDrink}>Next Drink</button>
            {trueRecipe && (
                <div className="correct-recipe">
                    <h3>Correct Recipe:</h3>
                    <ul>
                        <li>Temperature: {trueRecipe.temp}</li>
                        <li>Syrup: {trueRecipe.syrup}</li>
                        <li>Milk: {trueRecipe.milk}</li>
                        <li>Blended: {trueRecipe.blended}</li>
                    </ul>
                </div>
            )}

        </div>
    );

};

export default BaristaForm;