"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Next.js + PostgreSQL</h1>
      <h3 className="text-2xl">Users:</h3>
      <div className="flex flex-wrap justify-center">
        {users.map(user => (
          <div key={user.id} className="flex flex-col items-center justify-center w-64 h-64 m-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-black text-xl font-bold">{user.email}</h2>
            <p className="text-black text-xl font-bold">{user.id}</p>
          </div>
        ))}
      </div>
      <h3 className="text-2xl">Services:</h3>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center justify-center w-64 h-64 m-4 bg-white rounded-lg shadow-lg">
          <Image
            src="/discord.png"
            alt="Discord Logo"
            width={128}
            height={128}
          />
          <h2 className="text-black text-xl font-bold">Discord</h2>
        </div>
        <div className="flex flex-col items-center justify-center w-64 h-64 m-4 bg-white rounded-lg shadow-lg">
          <Image
            src="/github.png"
            alt="Github Logo"
            width={128}
            height={128}
          />
          <h2 className="text-black text-xl font-bold">Github</h2>
        </div>
      </div>
    </main>
  );
}
