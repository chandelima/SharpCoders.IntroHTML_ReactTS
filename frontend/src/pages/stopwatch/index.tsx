import { useState } from "react";

import styles from "./Stopwatch.module.css";

enum enumStatus { Stopped, Running, Paused };
enum enumElement { Minutes, Seconds, Milisseconds };

const Stopwatch = () => {
    // Consts, Variables;
    const increaseValue = 1000;
    let isPaused: boolean;
    let interval;
    let status = enumStatus.Stopped;

    // Hooks
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [milisseconds, setMilisseconds] = useState("000");

    // Functions
    const startTimer = () => {
        interval = setInterval(() => {
            if (isPaused) return;

            status = enumStatus.Running;

            setMilisseconds((parseInt(milisseconds) + increaseValue).toString());

            if (parseInt(milisseconds) >= 1000) {
                setSeconds((parseInt(milisseconds) + 1).toString());
                setMilisseconds("000")
            }

            if (parseInt(seconds) >= 60) {
                setMinutes(minutes + 1);
                setSeconds("00");
            }
        }, increaseValue)
    }



    return (
        <div className={styles.container}>
            <h1>Cronômetro</h1>
            <div className={styles.card}>
                <div className={styles.timer}>
                    <div className={styles.time} id={styles.minutes}>
                        {minutes}
                    </div>
                    <div className={styles.separator}>:</div>
                    <div className={styles.time} id={styles.seconds}>
                        {seconds}
                    </div>
                    <div className={styles.separator}>:</div>
                    <div className={styles.time} id={styles.milliseconds}>
                        {milisseconds}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button 
                      className={styles.btn} onClick={startTimer}
                      id={status === enumStatus.Stopped ? styles.startBtn : styles.hidden}>
                        Iniciar
                    </button>
                    <button className={styles.btn}>
                        Pausar
                    </button>
                    <button className={styles.hidden}>
                        Continuar
                    </button>
                    <button className={styles.hidden}>
                        Resetar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;