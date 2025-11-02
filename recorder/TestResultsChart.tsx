import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Test 1', passed: 5, failed: 1 },
  { name: 'Test 2', passed: 4, failed: 2 },
  // Add more test data as needed
];

export default function TestResultsChart() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Test Results Overview</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="passed" fill="#4ade80" />
          <Bar dataKey="failed" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
