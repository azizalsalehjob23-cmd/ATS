import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Pipeline from './Pipeline'; // سننشئه لاحقاً
import { fetchJobs, fetchCandidates, createJob, createCandidate } from './api'; // API functions

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');

  useEffect(() => {
    loadJobs();
    loadCandidates();
  }, []);

  const loadJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  const loadCandidates = async () => {
    const data = await fetchCandidates(selectedJob);
    setCandidates(data);
  };

  const handleCreateJob = async (job) => {
    await createJob(job);
    loadJobs();
  };

  const handleCreateCandidate = async (candidate) => {
    await createCandidate(candidate);
    loadCandidates();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Applicant Tracking System</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Create Job">
          <Input placeholder="Job Title" />
          {/* باقي الحقول وأزرار الإرسال */}
        </Card>
        <Card title="Add Candidate">
          <Input placeholder="Candidate Name" />
          {/* باقي الحقول وأزرار الإرسال */}
        </Card>
      </div>
      <Pipeline candidates={candidates} />
    </div>
  );
}
