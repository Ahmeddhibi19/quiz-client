"use client";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

// Dynamically import PersonalInfo to ensure it only runs on the client side
const Register = dynamic(() => import('@/components/register'), { ssr: false });

const Page: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/quiz');
    };

    return (
        <main>
            <Register handleClick={handleClick} />
        </main>
    );
};

export default Page;
