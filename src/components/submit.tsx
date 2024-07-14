"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitDataToServer } from '../redux/quizSlice';
import { RootState, AppDispatch } from '../redux/store';
import { motion } from 'framer-motion';
import Spinner from './spinner';
import ProgressBar from './progressBar';

const Submit: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Correctly type the useDispatch hook
  const loading = useSelector((state: RootState) => state.quiz.loading);
  const response = useSelector((state: RootState) => state.quiz.response);

  const handleSubmit = () => {
    dispatch(submitDataToServer());
  };

  return (
    <div className="container mx-auto p-4">
        <ProgressBar step={2} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Submit Your Data</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {response ? (
              <p>{response}</p>
            ) : (
              <button onClick={handleSubmit} className="w-full bg-green-500 text-white p-2 rounded mt-4">
                Submit
              </button>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Submit;
