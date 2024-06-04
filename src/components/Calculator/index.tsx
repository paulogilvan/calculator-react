import { useState } from 'react';
import * as C from './styles';
import { Display } from '../Display';
import { Button } from '../Button';

export const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState<string | null>(null);
    const [value, setValue] = useState<number | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
          setDisplayValue(digit);
          setWaitingForOperand(false);
        } else {
          setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
      };
    
      const inputDot = () => {
        if (waitingForOperand) {
          setDisplayValue('0.');
          setWaitingForOperand(false);
        } else if (!displayValue.includes('.')) {
          setDisplayValue(displayValue + '.');
        }
      };
    
      const clearDisplay = () => {
        setDisplayValue('0');
      };
    
      const toggleSign = () => {
        const newValue = parseFloat(displayValue) * -1;
        setDisplayValue(String(newValue));
      };
    
      const inputPercent = () => {
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;
        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = parseFloat(displayValue) / 100;
        setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
      };
    
      const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(displayValue);
    
        if (value === null) {
          setValue(inputValue);
        } else if (operator) {
          const currentValue = value || 0;
          const newValue = performCalculation[operator](currentValue, inputValue);
    
          setValue(newValue);
          setDisplayValue(String(newValue));
        }
    
        setWaitingForOperand(true);
        setOperator(nextOperator);
      };
    
      const performCalculation: { [key: string]: (prevValue: number, nextValue: number) => number } = {
        '/': (prevValue, nextValue) => prevValue / nextValue,
        '*': (prevValue, nextValue) => prevValue * nextValue,
        '+': (prevValue, nextValue) => prevValue + nextValue,
        '-': (prevValue, nextValue) => prevValue - nextValue,
        '=': (prevValue, nextValue) => nextValue,
      };
    
      const handleKeyDown = (event: React.KeyboardEvent) => {
        let { key } = event;
    
        if (key === 'Enter') key = '=';
    
        if ((/\d/).test(key)) {
          inputDigit(key);
        } else if (key in performCalculation) {
          performOperation(key);
        } else if (key === '.') {
          inputDot();
        } else if (key === 'Backspace') {
          if (displayValue.length === 1) {
            setDisplayValue('0');
          } else {
            setDisplayValue(displayValue.slice(0, -1));
          }
        } else if (key === 'Escape') {
          clearDisplay();
        }
      };
    

    return (
        <C.CalculatorContainer onKeyDown={handleKeyDown} tabIndex={0}>
            <Display value={displayValue} />
            <C.ButtonsContainer>
                <Button label="AC" onClick={clearDisplay} />
                <Button label="+/-" onClick={toggleSign} />
                <Button label="%" onClick={inputPercent} />
                <Button label="/" onClick={() => performOperation('/')} />
                <Button label="7" onClick={() => inputDigit('7')} />
                <Button label="8" onClick={() => inputDigit('8')} />
                <Button label="9" onClick={() => inputDigit('9')} />
                <Button label="*" onClick={() => performOperation('*')} />
                <Button label="4" onClick={() => inputDigit('4')} />
                <Button label="5" onClick={() => inputDigit('5')} />
                <Button label="6" onClick={() => inputDigit('6')} />
                <Button label="-" onClick={() => performOperation('-')} />
                <Button label="1" onClick={() => inputDigit('1')} />
                <Button label="2" onClick={() => inputDigit('2')} />
                <Button label="3" onClick={() => inputDigit('3')} />
                <Button label="+" onClick={() => performOperation('+')} />
                <Button label="0" onClick={() => inputDigit('0')} />
                <Button label="." onClick={inputDot} />
                <Button label="=" onClick={() => performOperation('=')} />
            </C.ButtonsContainer>
        </C.CalculatorContainer>
    );
}