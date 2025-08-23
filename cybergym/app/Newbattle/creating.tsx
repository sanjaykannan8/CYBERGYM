import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Creating() {
    const [currentStep, setCurrentStep] = useState(0);
    const [dots, setDots] = useState("");

    const steps = [
        "Initializing cyber environment...",
        "Deploying security protocols...",
        "Building Docker containers...",
        "Setting up network topology...",
        "Configuring challenge parameters...",
        "Activating neural networks...",
        "Battle arena ready! 🔥"
    ];

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < steps.length - 1) {
                    return prev + 1;
                } else {
                    clearInterval(stepInterval);
                    return prev;
                }
            });
        }, 800);

        const dotsInterval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return "";
                return prev + ".";
            });
        }, 300);

        return () => {
            clearInterval(stepInterval);
            clearInterval(dotsInterval);
        };
    }, []);

    return (
        <div className={styles.loading_overlay}>
            <div className={styles.loading_content}>
                <div className={styles.terminal_container}>
                    <div className={styles.terminal_header}>
                        <div className={styles.terminal_buttons}>
                            <span className={styles.btn_red}></span>
                            <span className={styles.btn_yellow}></span>
                            <span className={styles.btn_green}></span>
                        </div>
                        <span className={styles.terminal_title}>cyber-battle-builder</span>
                    </div>
                    <div className={styles.terminal_body}>
                        <div className={styles.terminal_line}>
                            <span className={styles.prompt}>root@cybergym:~#</span> 
                            <span className={styles.command}>./create_battle.sh</span>
                        </div>
                        {steps.slice(0, currentStep + 1).map((step, index) => (
                            <div key={index} className={styles.terminal_line}>
                                <span className={styles.output}>
                                    {index === currentStep && index < steps.length - 1 ? 
                                        `${step}${dots}` : 
                                        index === steps.length - 1 ? 
                                        step : 
                                        `✓ ${step}`
                                    }
                                </span>
                            </div>
                        ))}
                        {currentStep < steps.length - 1 && (
                            <div className={styles.terminal_line}>
                                <span className={styles.prompt}>root@cybergym:~#</span> 
                                <span className={styles.cursor}>_</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.progress_bar}>
                    <div 
                        className={styles.progress_fill} 
                        style={{width: `${((currentStep + 1) / steps.length) * 100}%`}}
                    ></div>
                </div>
                <h2 className={styles.loading_text}>Building Your Cyber Arena</h2>
            </div>
        </div>
    )
}