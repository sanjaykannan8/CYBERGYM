"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const handleCreateNewBattle = () => {
    router.push("/Newbattle");
  }
  const handleEnterTheBattle = () => {
    router.push("/EnterBattle");
  }
  return (
    <div className={styles.container}>
               <div className={styles.header}>
          <div className={styles.header_left}>
           <div className={styles.logo_container}>
            <Image src="/coin.png" alt="logo" width={50} height={50} />
            <p>: 1000 EXP</p>
            </div>
            <div className={styles.logo_container}>
            <Image src="/heart_no_bg.png" alt="logo" width={50} height={50} />
            <p>: 2x STREAK</p>
            </div><div className={styles.logo_container}>
            <Image src="/brain_no_bg.png" alt="logo" width={50} height={50} />
            <p>: 0x REQUESTS</p>
            </div>
          </div>
          
          <div className={styles.terminals_container}>
            <div className={styles.terminal_main}>
              <div className={styles.terminal_header}>
                <div className={styles.terminal_buttons}>
                  <span className={styles.btn_red}></span>
                  <span className={styles.btn_yellow}></span>
                  <span className={styles.btn_green}></span>
                </div>
                <span className={styles.terminal_title}>cyber-gym-main</span>
              </div>
              <div className={styles.terminal_body}>
                <div className={styles.terminal_line}>
                  <span className={styles.prompt}>root@cybergym:~#</span> 
                  <span className={styles.command}>./initialize_training.sh</span>
                </div>
                <div className={styles.terminal_line}>
                  <span className={styles.output}>Initializing CyberGym Environment...</span>
                </div>
                <div className={styles.terminal_line}>
                  <span className={styles.output}>✓ Neural networks loaded</span>
                </div>
                <div className={styles.terminal_line}>
                  <span className={styles.output}>✓ Security protocols activated</span>
                </div>
                <div className={styles.terminal_line}>
                  <span className={styles.success}>WELCOME TO THE CYBERGYM</span>
                </div>
                <div className={styles.terminal_line}>
                  <span className={styles.prompt}>root@cybergym:~#</span> 
                  <span className={styles.cursor}>_</span>
                </div>
              </div>
            </div>
            
            <div className={styles.terminals_side}>
              <div className={styles.terminal_small}>
                <div className={styles.terminal_header}>
                  <div className={styles.terminal_buttons}>
                    <span className={styles.btn_red}></span>
                    <span className={styles.btn_yellow}></span>
                    <span className={styles.btn_green}></span>
                  </div>
                  <span className={styles.terminal_title}>system-monitor</span>
                </div>
                <div className={styles.terminal_body}>
                  <div className={styles.terminal_line}>
                    <span className={styles.output}>CPU: 87% | RAM: 6.2GB/16GB</span>
                  </div>
                  <div className={styles.terminal_line}>
                    <span className={styles.output}>GPU: NVIDIA RTX 4090</span>
                  </div>
                  <div className={styles.terminal_line}>
                    <span className={styles.success}>Status: OPTIMAL</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.terminal_small}>
                <div className={styles.terminal_header}>
                  <div className={styles.terminal_buttons}>
                    <span className={styles.btn_red}></span>
                    <span className={styles.btn_yellow}></span>
                    <span className={styles.btn_green}></span>
                  </div>
                  <span className={styles.terminal_title}>network-log</span>
                </div>
                <div className={styles.terminal_body}>
                  <div className={styles.terminal_line}>
                    <span className={styles.output}>Connections: 1,247 active</span>
                  </div>
                  <div className={styles.terminal_line}>
                    <span className={styles.output}>Firewall: SECURED</span>
                  </div>
                  <div className={styles.terminal_line}>
                    <span className={styles.command}>Monitoring traffic...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.header_right}>
           <div className={styles.right_stats}>
              <h5>Model currently in use : Gemini 2.0 Pro</h5>
           </div>
           <div className={styles.right_stats}>
              <h5>No of Active Challenges : 10</h5>
           </div>
           <div className={styles.right_stats}>
              <h5>No of Completed Challenges : 5</h5>
           </div>
           <div className={styles.right_stats}>
              <h5>Difficulty : Medium</h5>
           </div>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.left_center}>
            <div className={styles.center_logo}>
             <Image  className={styles.imageglow} src="/cyber_trainer_no_bg.png" alt="logo" width={400} height={400} />
            </div>
            <div className={styles.center_text}>
              <div className={styles.center_text_container}>
              <h1>CYBER<span className={styles.cyber_gym_icon}>⚔️</span>GYM</h1>
              <p>“Your Cyber Playground, Your Hacker Gym.”</p>
              </div>
            <div className={styles.button_container}>
               <div className={styles.button_container_left} onClick={handleCreateNewBattle}>
                   <Image src="/enter_gym_icon_no_bg.png" alt="logo" width={150} height={150} />
                   <p>CREATE NEW BATTLE</p>
               </div>
               <div className={styles.button_container_right} onClick={handleEnterTheBattle}>
                <Image src="/prebuilt_challenge_icon_no_bg.png" alt="logo" width={150} height={150} />
                <p>ENTER THE BATTLE</p>
               </div>
            </div>
            </div>
            
            </div>
         </div>
         <div className={styles.footer}>
          <p>© 2025 CyberGym. All rights reserved.</p>
          <p>Developed by <a href="https://www.linkedin.com/in/kannan-in/">KANNAN K </a>with 💚 and some 🍵</p>
         </div>
      </div>
    );
}
