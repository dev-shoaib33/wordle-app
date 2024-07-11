import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { fetchWordleResult, WordleRequest, WordleRequestItem } from '../api/api';

interface GuessInputsProps {
  currentGuess: string;
  indexNum: number;
  lives: number;
  setError: (error: string) => void;
  setCurrentGuess: (currentGuess: string) => void;
  setLoading: (loading: boolean) => void;
  setSuccess: (success: boolean) => void;
  setLives: (lives: number) => void;
}

const GuessInputs = forwardRef(({
  currentGuess,
  setCurrentGuess,
  setSuccess,
  setLoading,
  setError,
  indexNum,
  setLives,
  lives
}: GuessInputsProps, ref) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [clue, setClue] = useState<string[]>(Array(5).fill(''));
  const [guesses, setGuesses] = useState<WordleRequest>([]);
  const [styles, setStyles] = useState<string[]>(Array(5).fill(''));
  const [showColors, setShowColors] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isMatch, setIsMatch] = useState<boolean>(false);

  const handleClueChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 1) {
      const newClue = [...clue];
      newClue[index] = value;
      setClue(newClue);
    }
  };

  const compareGuess = (newClue: string[]) => {
    const newStyles = Array(5).fill('');

    for (let i = 0; i < 5; i++) {
      if (newClue[i] === currentGuess[i]) {
        newStyles[i] = 'green';
      } else if (currentGuess.includes(newClue[i])) {
        newStyles[i] = 'yellow';
      } else {
        newStyles[i] = 'grey';
      }
    }
    setLives(lives + 1);

    setStyles(newStyles);
    setShowColors(true);
    if(newClue.join('') === currentGuess){
    setShowModal(true);
  }
    setIsMatch(newClue.join('') === currentGuess);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLInputElement>) => {
    try {
      setLives(0);
      setLoading(true);
      const newGuessItem: WordleRequestItem = {
        word: currentGuess,
        clue: 'gxyxx'
      };
      const newGuesses = [...guesses, newGuessItem];
      setGuesses(newGuesses);

      const response = await fetchWordleResult(newGuesses);
      if (response.guess) {
        setCurrentGuess(response.guess);
        setClue(Array(5).fill(''));
        setShowColors(false);
      } else {
        setSuccess(true);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch next guess');
      setLoading(false);
    }
  };

  const handleKeyUp = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && index === 4) {
      compareGuess(clue);
    } else if (event.key === 'Backspace' && index > 0) {
      document.querySelectorAll<HTMLInputElement>(`.otp__digit${indexNum}`)[index - 1]?.focus();
    } else if (index < 4 && event.key !== 'Backspace') {
      document.querySelectorAll<HTMLInputElement>(`.otp__digit${indexNum}`)[index + 1]?.focus();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isMatch) {
      handleSubmit();
    }
  };

  useImperativeHandle(ref, () => ({
    compareGuess: () => compareGuess(clue)
  }));

  return (
    <div className="otp-input-fields">
      {clue.map((digit, index) => (
        <input
          key={index}
          type="text"
          className={`otp__digit${indexNum} otp__field__${index + 1}`}
          maxLength={1}
          value={digit}
          onChange={handleClueChange(index)}
          onKeyUp={handleKeyUp(index)}
          ref={(el) => (inputsRef.current[index] = el)}
          style={{ backgroundColor: showColors ? styles[index] : 'white' }}
        />
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>Congratulations!</p>
            <button onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
});

export default GuessInputs
