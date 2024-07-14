import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuizAnswers, submitQuiz } from '../redux/quizSlice';
import { RootState } from '../redux/store';
import ProgressBar from './progressBar';
import Card from './Card';
import Carrousel from './Carousel';

interface QuizProps {
  handleClick: () => void;
}

const Quiz: React.FC<QuizProps> = ({ handleClick }) => {
  const dispatch = useDispatch();
  const quizQuestions = useSelector((state: RootState) => state.quiz.questions);
  const selectedAnswers = useSelector((state: RootState) => state.quiz.selectedAnswers);

  const handleAnswerChange = (questionIndex: number, answer: number | string) => {
    dispatch(saveQuizAnswers({ questionIndex, answer }));
  };

  const handleSubmit = () => {
    dispatch(submitQuiz());
    handleClick();
  };

  const cards = quizQuestions.map((question, index) => ({
    key: index,
    content: (
      <Card
        question={question.question}
        answers={question.answers}
        selectedAnswer={selectedAnswers[index]}
        onAnswerChange={(answer) => handleAnswerChange(index, answer)}
        type={question.type}
      />
    )
  }));

  return (
    <div className="w-full h-full p-4 gradient-background">
      <ProgressBar step={1} />
      <Carrousel
        cards={cards}
        width="60%"
        height="400px"
        margin="0 auto"
        offset={2}
        showArrows={true}
      />
      <div className="flex justify-center mt-20">
        <button onClick={handleSubmit} className="gradient-background2 text-white p-2 rounded cursor-pointer w-[300px]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;
