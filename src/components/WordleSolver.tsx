import React, { useState, useEffect, useRef } from 'react';
import { fetchWordleResult } from '../api/api';
import '../index.css';
import GuessInputs from './GuessInputs';

const WordleSolver: React.FC = () => {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(0);
  const childRef = useRef<{ compareGuess: () => void; handleSubmit: () => void }>(null);

  useEffect(() => {
    fetchInitialGuess();
  }, []);

  const fetchInitialGuess = async () => {
    try {
      setLoading(true);
      const response = await fetchWordleResult([]);
      setCurrentGuess(response.guess);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch initial guess');
      setLoading(false);
    }
  };

  const handleSubmitBtn = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    if (childRef.current) {
      childRef.current.compareGuess();
    }
  };

  return (
    <div>
      <h1>Wordle Solver</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !success && (
        <>
          {lives === 3 && <p>Word to Guess: {currentGuess}</p>}
          <form onSubmit={handleSubmitBtn}>
            <div>
              <GuessInputs
                ref={childRef}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                setSuccess={setSuccess}
                setLoading={setLoading}
                setError={setError}
                indexNum={0}
                setLives={setLives}
                lives={lives}
              />
              <GuessInputs
                ref={childRef}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                setSuccess={setSuccess}
                setLoading={setLoading}
                setError={setError}
                indexNum={1}
                setLives={setLives}
                lives={lives}
              />
              <GuessInputs
                ref={childRef}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                setSuccess={setSuccess}
                setLoading={setLoading}
                setError={setError}
                indexNum={2}
                setLives={setLives}
                lives={lives}
              />
            </div>
            <button type="submit" disabled={loading}>
              Submit
            </button>
          </form>
        </>
      )}
      {success && <p>Congratulations! You've solved the Wordle.</p>}
    </div>
  );
};

export default WordleSolver;