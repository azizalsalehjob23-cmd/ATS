// api.js — تخزين محلي بدل باك-إند

const JOBS_KEY = 'ats_jobs';
const CANDS_KEY = 'ats_candidates';

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ===== Jobs =====
export async function fetchJobs() {
  return read(JOBS_KEY).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
}

export async function createJob(job) {
  const jobs = read(JOBS_KEY);
  const id = jobs.length ? Math.max(...jobs.map(j=>j.id)) + 1 : 1;
  const row = { id, ...job, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  jobs.push(row); write(JOBS_KEY, jobs);
  return row;
}

// ===== Candidates =====
export async function fetchCandidates(jobId) {
  const all = read(CANDS_KEY);
  if (!jobId) return all.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  return all.filter(c=>String(c.jobId)===String(jobId))
            .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
}

export async function createCandidate(cand) {
  const cands = read(CANDS_KEY);
  const id = cands.length ? Math.max(...cands.map(c=>c.id)) + 1 : 1;
  const row = {
    id,
    name: cand.name,
    email: cand.email,
    phone: cand.phone || '',
    resumeUrl: cand.resumeUrl || '',
    notes: cand.notes || '',
    stage: 'Applied',
    jobId: cand.jobId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  cands.push(row); write(CANDS_KEY, cands);
  return row;
}

export async function updateCandidate(id, patch) {
  const cands = read(CANDS_KEY);
  const i = cands.findIndex(c=>c.id===id);
  if (i === -1) return null;
  cands[i] = { ...cands[i], ...patch, updatedAt: new Date().toISOString() };
  write(CANDS_KEY, cands);
  return cands[i];
}

export async function deleteCandidate(id) {
  let cands = read(CANDS_KEY);
  cands = cands.filter(c=>c.id!==id);
  write(CANDS_KEY, cands);
  return { ok:true };
}
