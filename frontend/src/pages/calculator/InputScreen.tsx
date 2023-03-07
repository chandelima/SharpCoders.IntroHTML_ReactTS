import styles from './InputScreen.module.css'

interface Props {
    operationText: string;
    resultText: string
}

const InputScreen = ({ operationText, resultText }: Props) => {

    return (
        <div id={styles.screen}>
            <div className={styles.title}>
                <span>Calculator</span>
                <span className={"material-symbols-rounded " + styles.titleIcon}>
                    more_vert
                </span>
            </div>
            <span id={styles.inputOperation}>{operationText}</span>
            <span id={styles.inputResult}>{resultText}</span>
        </div>
    )
}

export default InputScreen
