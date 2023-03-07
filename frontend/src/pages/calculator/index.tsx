import { useEffect, useState } from 'react';
import Button from './Button';
import InputScreen from './InputScreen';

import styles from './Calculator.module.css'

function CalculatorComponent() {
  
  const operators = ['+', '-', 'x', '÷'];

  // Hooks
  const [screenOperationText, setScreenOperationText] = useState("");
  const [screenResultText, setsScreenResultText] = useState("0");
  
  useEffect(() => {
    window.addEventListener('keydown', onKeyPressedHandler)

    return () => {
      window.removeEventListener("keydown", onKeyPressedHandler);
    };
  })

  // Functions
  const addScreenDigit = (digit: string) => {
    let tempOperationText = screenOperationText;

    const newOpAfterAPreviousOne = 
      screenOperationText === "" && screenResultText !== "0";
    if(newOpAfterAPreviousOne) {
      tempOperationText = screenResultText;
    }
    
    const userInputsAnotherOperator =
      checkIfDigitIsOperator(digit) && checkIfLastCharIsOperator();

    if(userInputsAnotherOperator) {
      tempOperationText = screenOperationText.trim()
        .substring(0, (tempOperationText.length - 2));
    }
    
    setScreenOperationText(tempOperationText + digit);
  }

  const backspace = () => {
    const value = screenOperationText
      .substring(0, (screenOperationText.length -1));
    setScreenOperationText(value);
  }
  
  const operation = () => {
    let operationText = screenOperationText;

    operationText = operationText.replace("÷", "/");
    operationText = operationText.replace("x", "*");

    try {
      let result = eval(operationText);
      
      if (result === undefined)
        result = "0";

      setScreenOperationText("");
      setsScreenResultText(result);
    } catch (error) {
      setsScreenResultText("ERRO!");
    }
  }

  const cleanMemory = () => {
    setScreenOperationText("");
    setsScreenResultText("0");
  }

  const checkIfDigitIsOperator = (digit: string) => {
    let result = false;
    operators.forEach(op => {
      digit.trim() === op && (result = true);
    })

    return result;
  }

  const checkIfLastCharIsOperator = () => {
    let result = false;
    operators.forEach(op => {
      const lastCharIsOperator = (screenOperationText.trim().split(op).length - 1) > 0;
      lastCharIsOperator && (result = true);
    })

    return result;
  }
  
  const onKeyPressedHandler = (event: KeyboardEvent) => {
    const keyPressed = event.key

    const possibleKeys: Record<string, Function> = {
      'Delete': cleanMemory,
      'C': cleanMemory,
      '(': () => addScreenDigit('('),
      ')': () => addScreenDigit(')'),
      '/': () => addScreenDigit(' ÷ '),
      '7': () => addScreenDigit('7'),
      '8': () => addScreenDigit('8'),
      '9': () => addScreenDigit('9'),
      '*': () => addScreenDigit(' x '),
      '4': () => addScreenDigit('4'),
      '5': () => addScreenDigit('5'),
      '6': () => addScreenDigit('6'),
      '-': () => addScreenDigit(' - '),
      '1': () => addScreenDigit('1'),
      '2': () => addScreenDigit('2'),
      '3': () => addScreenDigit('3'),
      '+': () => addScreenDigit(' + '),
      '.': () => addScreenDigit('.'),
      '0': () => addScreenDigit('0'),
      'Backspace': backspace,
      'Enter': operation,
      '=': operation,
    }

    if (possibleKeys[keyPressed])
      possibleKeys[keyPressed]();
  }

  // View
  return (
    <div id={styles.container}>
      <div id={styles.box} >
        <InputScreen operationText={screenOperationText} resultText={screenResultText} />
        <div id={styles.buttonsContainer}>
          <Button label='AC' onClick={cleanMemory} />
          <Button label='(' onClick={() => addScreenDigit('(')} />
          <Button label=')' onClick={() => addScreenDigit(')')} />
          <Button label='÷' type='operator' onClick={() => addScreenDigit(' ÷ ')} />
          <Button label='7' onClick={() => addScreenDigit('7')} />
          <Button label='8' onClick={() => addScreenDigit('8')} />
          <Button label='9' onClick={() => addScreenDigit('9')} />
          <Button label='x' type='operator' onClick={() => addScreenDigit(' x ')} />
          <Button label='4' onClick={() => addScreenDigit('4')} />
          <Button label='5' onClick={() => addScreenDigit('5')} />
          <Button label='6' onClick={() => addScreenDigit('6')} />
          <Button label='-' type='operator' onClick={() => addScreenDigit(' - ')} />
          <Button label='1' onClick={() => addScreenDigit('1')} />
          <Button label='2' onClick={() => addScreenDigit('2')} />
          <Button label='3' onClick={() => addScreenDigit('3')} />
          <Button label='+' type='operator' onClick={() => addScreenDigit(' + ')} />
          <Button label='・' onClick={() => addScreenDigit('.')} />
          <Button label='0' onClick={() => addScreenDigit('0')} />
          <Button label='<' onClick={backspace} />
          <Button label='=' type='equals' onClick={operation} />
        </div>
      </div>
    </div>
  );
}

export default CalculatorComponent;
