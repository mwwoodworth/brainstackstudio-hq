"use client";

import { useState } from 'react';

export default function Memory() {
  
  const [query, setQuery] = useState('');
  type MemoryResult = {
  content_chunk?: string;
  content?: string;
};

const [results, setResults] = useState<MemoryResult[]>([]);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch('/api/memory/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data.results || []);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Memory</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="border px-3 py-2 mr-2" placeholder="Search" />
        <button className="bg-blue-600 text-white px-4 py-2" type="submit">Search</button>
      </form>
      <ul className="space-y-2">
        {results.map((r, i) => (
          <li key={i} className="border p-2">{r.content_chunk || r.content}</li>
        ))}
      </ul>
    </div>
  );
}
