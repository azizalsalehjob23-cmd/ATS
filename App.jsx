import React, { useEffect, useState } from 'react';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import Select from './Select';
import Pipeline from './Pipeline';
import {
  fetchJobs, fetchCandidates,
  createJob, createCandidate
} from './api';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [cands, setCands] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');

  // نماذج
  const [jobForm, setJobForm] = useState({
    title: '', department: '', managerName: '', managerEmail: '', description: ''
  });
  const [candForm, setCandForm] = useState({
    name: '', email: '', phone: '', resumeUrl: '', notes: '', jobId: ''
  });

  async function loadAll(jobId = selectedJob) {
    const js = await fetchJobs();
    setJobs(js);
    // افتراضي: أول وظيفة
    const firstJobId = js[0]?.id ? String(js[0].id) : '';
    const actualJob = jobId || firstJobId || '';
    setSelectedJob(actualJob);
    const cs = await fetchCandidates(actualJob);
    setCands(cs);
    // ربط نموذج المرشح بالوظيفة المختارة
    setCandForm(f => ({ ...f, jobId: actualJob }));
  }

  useEffect(() => { loadAll(); }, []);
  useEffect(() => { (async () => setCands(await fetchCandidates(selectedJob)))(); }, [selectedJob]);

  async function submitJob(e) {
    e.preventDefault();
    if (!jobForm.title || !jobForm.department || !jobForm.managerName || !jobForm.managerEmail || !jobForm.description) {
      alert('عبي كل حقول الوظيفة'); return;
    }
    await createJob(jobForm);
    setJobForm({ title:'', department:'', managerName:'', managerEmail:'', description:'' });
    await loadAll(); // يعيد التحميل ويختار أول وظيفة
  }

  async function submitCandidate(e) {
    e.preventDefault();
    if (!candForm.name || !candForm.email || !candForm.jobId) {
      alert('الاسم + الإيميل + اختيار الوظيفة مطلوب'); return;
    }
    await createCandidate({ ...candForm, jobId: Number(candForm.jobId) });
    setCandForm(f => ({ ...f, name:'', email:'', phone:'', resumeUrl:'', notes:'' }));
    setCands(await fetchCandidates(selectedJob));
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-2">Applicant Tracking System</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* إنشاء وظيفة */}
        <Card title="Create Job">
          <form onSubmit={submitJob} className="space-y-2">
            <Input placeholder="Job Title" value={jobForm.title} onChange={e=>setJobForm({...jobForm, title:e.target.value})} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Department" value={jobForm.department} onChange={e=>setJobForm({...jobForm, department:e.target.value})} />
              <Input placeholder="Manager Name" value={jobForm.managerName} onChange={e=>setJobForm({...jobForm, managerName:e.target.value})} />
            </div>
            <Input placeholder="Manager Email" value={jobForm.managerEmail} onChange={e=>setJobForm({...jobForm, managerEmail:e.target.value})} />
            <Input placeholder="Description" value={jobForm.description} onChange={e=>setJobForm({...jobForm, description:e.target.value})} />
            <Button type="submit">Create Job</Button>
          </form>
        </Card>

        {/* إضافة مرشح */}
        <Card title="Add Candidate">
          <form onSubmit={submitCandidate} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Full Name" value={candForm.name} onChange={e=>setCandForm({...candForm, name:e.target.value})} />
              <Input placeholder="Email" value={candForm.email} onChange={e=>setCandForm({...candForm, email:e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Phone (optional)" value={candForm.phone} onChange={e=>setCandForm({...candForm, phone:e.target.value})} />
              <Input placeholder="Resume URL (optional)" value={candForm.resumeUrl} onChange={e=>setCandForm({...candForm, resumeUrl:e.target.value})} />
            </div>
            <Input placeholder="Notes (optional)" value={candForm.notes} onChange={e=>setCandForm({...candForm, notes:e.target.value})} />

            <Select
              value={candForm.jobId}
              onChange={(e)=>{ setCandForm({...candForm, jobId: e.target.value}); setSelectedJob(e.target.value); }}
              options={[
                { value:'', label:'Select Job' },
                ...jobs.map(j=>({ value:String(j.id), label:j.title }))
              ]}
            />
            <Button type="submit">Add Candidate</Button>
          </form>
        </Card>
      </div>

      {/* فلتر حسب الوظيفة */}
      <div className="flex items-center gap-2">
        <span className="font-medium">Filter by job:</span>
        <select
          className="border rounded px-2 py-1"
          value={selectedJob}
          onChange={async (e)=>setSelectedJob(e.target.value)}
        >
          <option value="">All</option>
          {jobs.map(j=> <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>

      {/* Pipeline */}
      <Pipeline candidates={cands} onChange={async ()=>setCands(await fetchCandidates(selectedJob))} />
    </div>
  );
}
