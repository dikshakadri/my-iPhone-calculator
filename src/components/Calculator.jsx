import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op) => {
    setOperation(op);
    setFirstNumber(parseFloat(display));
    setNewNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operation === null) return;
    
    const second = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case '+':
        result = firstNumber + second;
        break;
      case '-':
        result = firstNumber - second;
        break;
      case '×':
        result = firstNumber * second;
        break;
      case '÷':
        result = firstNumber / second;
        break;
    }
    
    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  const percentage = () => {
    setDisplay((parseFloat(display) / 100).toString());
  };

  const addDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`rounded-full text-2xl font-medium h-16 w-16 flex items-center justify-center transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center">
      <div className="w-[280px] p-4">
        <div className="h-24 flex items-end justify-end px-4">
          <span className="text-5xl font-light truncate">{display}</span>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          <Button
            onClick={clear}
            className="bg-gray-400 text-black hover:bg-gray-300"
          >
            {firstNumber === null ? 'AC' : 'C'}
          </Button>
          <Button
            onClick={toggleSign}
            className="bg-gray-400 text-black hover:bg-gray-300"
          >
            ±
          </Button>
          <Button
            onClick={percentage}
            className="bg-gray-400 text-black hover:bg-gray-300"
          >
            %
          </Button>
          <Button
            onClick={() => handleOperation('÷')}
            className={`bg-orange-500 hover:bg-orange-400 ${
              operation === '÷' ? 'bg-white text-orange-500' : ''
            }`}
          >
            ÷
          </Button>
          
          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-800 hover:bg-gray-700"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation('×')}
            className={`bg-orange-500 hover:bg-orange-400 ${
              operation === '×' ? 'bg-white text-orange-500' : ''
            }`}
          >
            ×
          </Button>
          
          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-800 hover:bg-gray-700"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation('-')}
            className={`bg-orange-500 hover:bg-orange-400 ${
              operation === '-' ? 'bg-white text-orange-500' : ''
            }`}
          >
            -
          </Button>
          
          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-800 hover:bg-gray-700"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation('+')}
            className={`bg-orange-500 hover:bg-orange-400 ${
              operation === '+' ? 'bg-white text-orange-500' : ''
            }`}
          >
            +
          </Button>
          
          <Button
            onClick={() => handleNumber('0')}
            className="col-span-2 w-auto bg-gray-800 hover:bg-gray-700 justify-start px-6"
          >
            0
          </Button>
          <Button
            onClick={addDecimal}
            className="bg-gray-800 hover:bg-gray-700"
          >
            .
          </Button>
          <Button
            onClick={calculate}
            className="bg-orange-500 hover:bg-orange-400"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}