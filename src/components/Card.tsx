import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Styles from "../utils/Card.module.css";

interface Question {
  question: string;
  answers: string[];
  selectedAnswer: number | string | null;
  onAnswerChange: (answer: number | string) => void;
  type: 'multiple-choice' | 'text';
}

const Card: React.FC<Question> = ({ question, answers, selectedAnswer, onAnswerChange, type }) => {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });

  return (
    <animated.div
      className={`${Styles.card} p-4 md:p-8`}
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl text-gradient font-bold mb-5">{question}</h1>
      <div>
        {type === 'multiple-choice' ? (
          answers.map((answer, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`q-a${index}`}
                name={`question`}
                checked={selectedAnswer === index}
                onChange={() => onAnswerChange(index)}
                className="mr-2 ml-2"
              />
              <label htmlFor={`q-a${index}`} className="text-white text-sm md:text-lg lg:text-xl font-bold ml-4">{answer}</label>
            </div>
          ))
        ) : (
          <input
            type="text"
            value={selectedAnswer as string || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            className="text-black p-2 rounded w-full"
          />
        )}
      </div>
    </animated.div>
  );
};

export default Card;
