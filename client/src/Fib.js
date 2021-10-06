import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Fib() {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [results, setResults] = useState({});
    const [index, setIndex] = useState("");

    const fetchIndexes = async () => {
        const response = await axios.get("/api/values/all");
        setSeenIndexes(response.data);
    };

    const fetchValues = async () => {
        const response = await axios.get("/api/values/current");
        setResults({ ...response.data });
    };

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(", ");
    };

    const renderValues = () => {
        const entries = [];
        for (let key in results) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {results[key]}
                </div>,
            );
        }
        return entries;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post("/api/values", {
            index: index,
        });

        setIndex("");

        fetchValues();
        fetchIndexes();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your Index:</label>
                <input
                    value={index}
                    onChange={(event) => {
                        setIndex(event.target.value);
                    }}
                />
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}
            <h3>Calculated Values:</h3>
            {renderValues()}
        </div>
    );
}
