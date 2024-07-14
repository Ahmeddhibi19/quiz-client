"use client"
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React from 'react';

const Login = dynamic(() => import('@/components/login'), { ssr: false });
const Page = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/quiz');
    };
    return (
        <main>
            <Login handleClick={handleClick} />
        </main>
    );
}

export default Page