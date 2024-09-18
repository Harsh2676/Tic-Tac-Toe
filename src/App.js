import React, { useEffect, useState } from "react";
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import { toast } from "react-toastify";
import Title from "./components/Title";
import "./App.css";

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  // const Waterdrop = new Audio('../public/Audio/Water-drop.mp3');

  function playsfx () {
    new Audio('/Audio/Water-drop.mp3').play();
  }

  function Victorysfx() {
    new Audio('/Audio/Victory.mp3').play();
  }

  // Fetch scores from localStorage
  useEffect(() => {
    const score = JSON.parse(localStorage.getItem('score'));
    
    if (score) {
      setScores(score);
    }
    console.log(localStorage.getItem('score'));
    console.log(score, "from local storage");
    toast.success("Welcome to Tic Tac Toe Made By HARSH");
  }, []);

  // Save scores to localStorage when they change
  useEffect(() => {
    if (scores.xScore === 0 && scores.oScore === 0) {
      console.log("Hello !");
    } else {
      console.log(scores, "Set To Localstorage");
      localStorage.setItem('score', JSON.stringify(scores));
    }

  }, [scores]);

  const handleBoxClick = (boxIdx) => {
    
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    playsfx();

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
        Victorysfx();
        toast.success("Wow, O Won Game!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
        Victorysfx();
        toast.success("Wow, X Won Game!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: "light",
        });
      }
    }

    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setScores({ xScore: 0, oScore: 0 });
    localStorage.setItem('score', JSON.stringify({ xScore: 0, oScore: 0 }));
  };

  return (
    <div className="App">
      <Title/>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton text='Restart Game' resetBoard={resetBoard} />
      <ResetButton text='Reset Score' resetBoard={resetGame} />
    </div>
  );
};

export default App;
