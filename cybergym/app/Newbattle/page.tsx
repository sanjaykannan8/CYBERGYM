"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Creating from "./creating";
interface Challenge {
    challenge_name: string;
    description: string;
    build_command: string;
    run_command: string;
    remove_command: string;
}

export default function NewBattle() {
    const [battleInput, setBattleInput] = useState("");
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [creating, setCreating] = useState(false);
    const handleSubmit = () => {
        if (battleInput.trim()) {
            console.log("Creating battle:", battleInput);
            setCreating(true);
            fetch("http://localhost:8000/create_challenge", {
                method: "POST",
                body: JSON.stringify({ challenge_description: battleInput }),
            })
            .then(response => response.json())
            .then(data => setCreating(false))
            .catch(error => console.error("Error creating battle:", error));
        }
    };
    useEffect(() => {
        fetch("http://localhost:8000/challenges")
            .then(response => response.json())
            .then(data => setChallenges(data.challenges))
            .catch(error => console.error("Error fetching challenges:", error));
    }, []);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
            setCreating(true);
        }
    };
    const handleChallengeClick = (challenge: string) => {
        console.log("Selected challenge:", challenge);
        fetch("http://localhost:8000/run_challenge", {
            method: "POST",
            body: JSON.stringify({ challenge_description: challenge }),
        })
        .then(response => response.json())
        .then(data => console.log("Challenge running:", data))
        .catch(error => console.error("Error running challenge:", error));

    };
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <h1 className={styles.title}>New Battle</h1>
                <p className={styles.subtitle}>Create your custom cybersecurity challenge</p>
            </div>
            <div className={styles.battle_container}>
                {challenges.map((challenge, index) => (
                    <div className={styles.battle_card} key={index}>
                        <h2>{challenge.challenge_name}</h2>
                        <p>Challenge Description: {challenge.description}</p>
                        <p>Build Command: {challenge.build_command}</p>
                        <p>Run Command: {challenge.run_command}</p>
                        <p>Remove Command: {challenge.remove_command}</p>
                        <button onClick={() => handleChallengeClick(challenge.description)}>Run challenge</button>
                    </div>
                ))}
                
            </div>
            
            <div className={styles.input_container}>
                <div className={styles.input_wrapper}>
                    <input 
                        type="text" 
                        value={battleInput}
                        onChange={(e) => setBattleInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter the type of the battle you want to create..." 
                        className={styles.input}
                    />
                    <button 
                        onClick={handleSubmit}
                        className={styles.submit_button}
                        disabled={!battleInput.trim()}
                    >
                        <Image className={styles.arrow_icon} src="/arrow.png" alt="send" width={24} height={24} />
                    </button>
                </div>
            </div>
            {creating && <Creating />}
        </div>
    )
}