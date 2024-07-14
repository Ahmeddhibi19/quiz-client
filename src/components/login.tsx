import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { loginUser } from '../redux/AuthSlice';
import { motion } from 'framer-motion';
import ProgressBar from './progressBar';
import Spinner from './spinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { emailVerification,passwordVerification } from '@/utils/validation';
import Link from 'next/link';

interface LoginProps {
  handleClick: () => void;
}

const Login: React.FC<LoginProps> = ({ handleClick }) => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!emailVerification(email)) {
      setFormError(true);
      setErrorMessage('Email is not valid');
    } else if(!passwordVerification(password)){
        setFormError(true);
        setErrorMessage('password require a minimum length of 8 characters and at least one  special characters (# & @ %).');
    }
     else  {
      setFormError(false);
      setErrorMessage('');
    }
  }, [email,password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formError){
        setShowOverlay(true);
        dispatch(loginUser({ email, password })).then(() => {
          setShowOverlay(true);
        });
    }
   
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!isClient) {
    return null;
  }

  if (isAuthenticated) {
    handleClick();
    return null;
  }

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {showOverlay && (
        <div className="absolute inset-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <Spinner />
          {error && (
            <div className="absolute text-red-600 text-center mt-4">{error}</div>
          )}
        </div>
      )}
      <div className="lg:w-1/3 w-full gradient-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg">Please log in to continue.</p>
        </motion.div>
      </div>
      <div className="lg:w-2/3 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <ProgressBar step={0} />
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            {formError && (
              <div>
                <p className='text-red-600'>{errorMessage}</p>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
              <span 
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </motion.form>
          <div className="flex justify-center mt-4">
            don't have an account? <Link href={"/register"} className='text-blue-500 underline ml-2'> Sign up</Link>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
