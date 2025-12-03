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
    const [deleting, setDeleting] = useState<string | null>(null);
    const [stopping, setStopping] = useState<string | null>(null);
    
    const handleSubmit = () => {
        if (battleInput.trim()) {
            console.log("Creating battle:", battleInput);
            setCreating(true);
            fetch("http://localhost:4040/create_challenge", {
                method: "POST",
                body: JSON.stringify({ challenge_description: battleInput }),
            })
            .then(response => response.json())
            .then(data => {
                setCreating(false);
                setBattleInput("");
                window.location.reload();
            })
            .catch(error => console.error("Error creating battle:", error));
        }
    };
    
    const fetchChallenges = () => {
        fetch("http://localhost:4040/challenges")
            .then(response => response.json())
            .then(data => setChallenges(data.challenges))
            .catch(error => console.error("Error fetching challenges:", error));
    };
    
    useEffect(() => {
        fetchChallenges();
    }, []);
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
            setCreating(true);
        }
    };
    
    const handleChallengeClick = (challenge: string) => {
        console.log("Selected challenge:", challenge);
        fetch("http://localhost:4040/run_challenge", {
            method: "POST",
            body: JSON.stringify({ challenge_description: challenge }),
        })
        .then(response => response.json())
        .then(data => console.log("Challenge running:", data))
        .catch(error => console.error("Error running challenge:", error));
    };
    
    const handleDeleteChallenge = (challengeDescription: string) => {
        if (confirm(`Are you sure you want to delete ${challengeDescription}? This will remove the Docker image and all files.`)) {
            setDeleting(challengeDescription);
            fetch("http://localhost:4040/delete_challenge", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ challenge_description: challengeDescription }),
            })
            .then(response => response.json())
            .then(data => {
                console.log("Challenge deleted:", data);
                setDeleting(null);
                // Refresh challenges list
                fetchChallenges();
            })
            .catch(error => {
                console.error("Error deleting challenge:", error);
                setDeleting(null);
            });
        }
    };

    const handleStopChallenge = (challengeDescription: string) => {
        setStopping(challengeDescription);
        fetch("http://localhost:4040/stop_challenge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ challenge_description: challengeDescription }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Challenge stopped:", data);
            alert(`Stopped ${data.stopped} container(s) for ${challengeDescription}`);
            setStopping(null);
        })
        .catch(error => {
            console.error("Error stopping challenge:", error);
            alert("Failed to stop containers. Check console for details.");
            setStopping(null);
        });
    };
    
    return (
        <div className={styles.root}>
            <div className={styles.content_wrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Challenges</h1>
                    <p className={styles.subtitle}>Launch your cybersecurity training battles</p>
                </div>
                
                {challenges.length === 0 ? (
                    <div className={styles.empty_state}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <h3>No challenges yet</h3>
                        <p>Create your first cybersecurity challenge below</p>
                    </div>
                ) : (
                    <div className={styles.battle_container}>
                        {challenges.map((challenge, index) => (
                            <div className={styles.battle_card} key={index}>
                                <div className={styles.card_top}>
                                    <div className={styles.card_icon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                                        </svg>
                                    </div>
                                    <span className={styles.badge}>{challenge.description}</span>
                                </div>
                                
                                <h3 className={styles.card_title}>{challenge.challenge_name}</h3>
                                
                                <div className={styles.card_actions}>
                                    <button 
                                        className={styles.launch_btn}
                                        onClick={() => handleChallengeClick(challenge.description)}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                        Launch
                                    </button>
                                    <button 
                                        className={styles.stop_btn}
                                        onClick={() => handleStopChallenge(challenge.description)}
                                        disabled={stopping === challenge.description}
                                        title="Stop"
                                    >
                                        {stopping === challenge.description ? (
                                            <svg className={styles.spinner_icon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="6" width="12" height="12"/>
                                            </svg>
                                        )}
                                    </button>
                                    <button 
                                        className={styles.delete_btn}
                                        onClick={() => handleDeleteChallenge(challenge.description)}
                                        disabled={deleting === challenge.description}
                                        title="Delete"
                                    >
                                        {deleting === challenge.description ? (
                                            <svg className={styles.spinner_icon} width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className={styles.input_container}>
                <div className={styles.input_wrapper}>
                    <input 
                        type="text" 
                        value={battleInput}
                        onChange={(e) => setBattleInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe your challenge (e.g., SQL injection, buffer overflow...)" 
                        className={styles.input}
                    />
                    <button 
                        onClick={handleSubmit}
                        className={styles.submit_button}
                        disabled={!battleInput.trim()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </div>
            </div>
            {creating && <Creating />}
        </div>
    )
}