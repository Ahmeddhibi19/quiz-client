"use client";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

// Dynamically import PersonalInfo to ensure it only runs on the client side
const Quiz = dynamic(() => import('@/components/quizPage'), { ssr: false });

const Page: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/submit');
    };

    return (
        <div className='"w-full h-svh  p-4 gradient-background overflow-auto'>
            <Quiz handleClick={handleClick} />
        </div>
    );
};

export default Page;