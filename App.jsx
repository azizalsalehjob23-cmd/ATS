import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/Card.jsx";
import { Button } from "./ui/Button.jsx";
import { Input, Textarea, Label } from "./ui/Input.jsx";
import { Switch } from "./ui/Switch.jsx";
import { Select, SelectItem } from "./ui/Select.jsx";
import { Calendar, CheckCircle2, Mail, CalendarClock, UserRound, Briefcase, Building2, Plus, ChevronRight } from "lucide-react";

// ---------- i18n ----------
const STR = {
  en: {
    appTitle: "ATS Lite — Hiring Flow",
    overview: "Overview",
    jobs: "Jobs",
    candidates: "Candidates",
    interviews: "Interviews",
    offers: "Offers",
    demo: "Single-file demo",
    createJob: "Create a Job",
    jobTitle: "Job Title",
    department: "Department",
    hmName: "Hiring Manager Name",
    hmEmail: "Hiring Manager Email",
    pipeline: "Pipeline Steps",
    create: "Create Job",
    jobsList: "Jobs",
    steps: {
      screen: "CV Screen",
      phone: "Phone Screen",
      interview: "Interview",
      feedback: "Feedback",
      offer: "Offer",
      join: "Joining",
    },
    hiringFlow: (t) => `Hiring Flow — ${t}`,
    candidate: "Candidate",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    resume: "Resume (optional)",
    interview: "Interview",
    dateTime: "Date & Time",
    duration: "Duration (mins)",
    mode: "Mode",
    select: "Select",
    online: "Online",
    onsite: "Onsite",
    phoneCall: "Phone",
    location: "Location / Link",
    sendInvite: "Send Interview Invite",
    feedbackTitle: "Post-Interview Feedback",
    rating: "Rating",
    notes: "Notes",
    submitFeedback: "Submit Feedback",
    offerJoin: "Offer & Joining",
    salary: "Salary",
    currency: "Currency",
    startDate: "Proposed Start Date",
    offerNotes: "Offer Notes",
    attachOffer: "Attach Offer (optional)",
    sendOffer: "Send Offer",
    createJoining: "Create Joining Reminder (.ics)",
    recentCandidates: "Recent Candidates",
    none: "No candidates yet.",
    footer: "This is a front-end demo: email sending opens your email client and calendar invites download as .ics files.",
    lang: "Language",
    ratings: {
      sy: "Strong Yes",
      y: "Yes",
      ly: "Leaning Yes",
      n: "Neutral",
      no: "No",
      sno: "Strong No",
    },
    inviteEmailSubject: (title)=>`Interview Invitation — ${title}`,
    inviteEmailBody: ({name, role, start, mode, location, hm})=>
      `Hello ${name},

We have scheduled your interview for ${start}.
Mode: ${mode}
Location/Link: ${location}

An .ics calendar invite has been downloaded for you. Please add it to your calendar.

Regards,
${hm || "Hiring Team"}`,
    inviteTitle: ({role, name})=>`${role} Interview — ${name}`,
    inviteDesc: ({name, role, mode, location, hm})=>
      `Dear ${name},

You are invited to an interview for the role: ${role}.
Mode: ${mode}
Location/Link: ${location}

Best regards,
${hm || "Hiring Team"}`,
    offerSubject: (role)=>`Job Offer — ${role}`,
    offerBody: ({name, role, salary, currency, start, notes, hm})=>
      `Dear ${name},

We are pleased to extend an offer for the role of ${role}.
Compensation: ${salary} ${currency}
Proposed Start Date: ${start}

Notes: ${notes}

Please reply to confirm.

Best regards,
${hm || "Hiring Team"}`,
    joiningTitle: (name)=>`Joining Day — ${name}`,
    joiningDesc: (name, role)=>`Reminder: ${name} joining ${role}.`,
    joiningSubject: (name, date)=>`Reminder: ${name} joins on ${date}`,
    joiningBody: (name, date)=>`This is a reminder that ${name} is scheduled to start on ${date}.`,
  },
  ar: {
    appTitle: "نظام توظيف مبسّط — سير التوظيف",
    overview: "نظرة عامة",
    jobs: "الوظائف",
    candidates: "المرشحون",
    interviews: "المقابلات",
    offers: "العروض",
    demo: "نسخة عرض بملف واحد",
    createJob: "إنشاء وظيفة",
    jobTitle: "المسمّى الوظيفي",
    department: "القسم",
    hmName: "اسم مدير التوظيف",
    hmEmail: "إيميل مدير التوظيف",
    pipeline: "خطوات التوظيف",
    create: "إنشاء الوظيفة",
    jobsList: "الوظائف",
    steps: {
      screen: "فرز السير الذاتية",
      phone: "مقابلة هاتفية",
      interview: "مقابلة",
      feedback: "تقييم",
      offer: "عرض وظيفي",
      join: "المباشرة",
    },
    hiringFlow: (t) => `سير التوظيف — ${t}`,
    candidate: "بيانات المرشح",
    fullName: "الاسم الكامل",
    email: "الإيميل",
    phone: "الجوال",
    resume: "السيرة الذاتية (اختياري)",
    interview: "المقابلة",
    dateTime: "التاريخ والوقت",
    duration: "المدة (دقائق)",
    mode: "الطريقة",
    select: "اختيار",
    online: "عن بُعد",
    onsite: "حضوري",
    phoneCall: "هاتف",
    location: "الموقع / الرابط",
    sendInvite: "إرسال دعوة مقابلة",
    feedbackTitle: "تقييم ما بعد المقابلة",
    rating: "التقييم",
    notes: "ملاحظات",
    submitFeedback: "حفظ التقييم",
    offerJoin: "العرض والمباشرة",
    salary: "الراتب",
    currency: "العملة",
    startDate: "تاريخ المباشرة المقترح",
    offerNotes: "ملاحظات العرض",
    attachOffer: "إرفاق العرض (اختياري)",
    sendOffer: "إرسال العرض",
    createJoining: "إنشاء تذكير المباشرة (.ics)",
    recentCandidates: "المرشحون حديثًا",
    none: "لا يوجد مرشحون بعد.",
    footer: "هذه نسخة واجهة أمامية فقط: الإرسال يفتح برنامج البريد لديك وملفات التقويم تُحمّل بصيغة .ics.",
    lang: "اللغة",
    ratings: {
      sy: "موافقة قوية",
      y: "موافقة",
      ly: "موافقة مائلة",
      n: "محايد",
      no: "رفض",
      sno: "رفض قوي",
    },
    inviteEmailSubject: (title)=>`دعوة مقابلة — ${title}`,
    inviteEmailBody: ({name, role, start, mode, location, hm})=>
      `مرحبًا ${name},

تم تحديد موعد المقابلة لوظيفة ${role} بتاريخ ${start}.
الطريقة: ${mode}
الموقع/الرابط: ${location}

تم تنزيل ملف تقويم .ics — فضلاً أضفه لتقويمك.

تحياتي،
${hm || "فريق التوظيف"}`,
    inviteTitle: ({role, name})=>`${role} — مقابلة ${name}`,
    inviteDesc: ({name, role, mode, location, hm})=>
      `عزيزي/عزيزتي ${name},

ندعوك لمقابلة على وظيفة: ${role}.
الطريقة: ${mode}
الموقع/الرابط: ${location}

مع خالص التحية،
${hm || "فريق التوظيف"}`,
    offerSubject: (role)=>`عرض وظيفي — ${role}`,
    offerBody: ({name, role, salary, currency, start, notes, hm})=>
      `عزيزي/عزيزتي ${name},

يسعدنا تقديم عرض لوظيفة ${role}.
التعويض: ${salary} ${currency}
تاريخ المباشرة المقترح: ${start}

ملاحظات: ${notes}

فضلاً الرد بالتأكيد.

تحياتنا،
${hm || "فريق التوظيف"}`,
    joiningTitle: (name)=>`يوم المباشرة — ${name}`,
    joiningDesc: (name, role)=>`تذكير: مباشرة ${name} على وظيفة ${role}.`,
    joiningSubject: (name, date)=>`تذكير: مباشرة ${name} بتاريخ ${date}`,
    joiningBody: (name, date)=>`تذكير بأن ${name} سيباشر بتاريخ ${date}.`,
  },
};

// ---------- helpers ----------
function fmtDateTimeLocal(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function toICS({ title, description = "", start, end, location = "", organizerEmail = "", attendees = [] }) {
  function toUTCString(dt) {
    const d = new Date(dt);
    return (
      d.getUTCFullYear().toString().padStart(4, "0") +
      String(d.getUTCMonth() + 1).padStart(2, "0") +
      String(d.getUTCDate()).padStart(2, "0") +
      "T" +
      String(d.getUTCHours()).padStart(2, "0") +
      String(d.getUTCMinutes()).padStart(2, "0") +
      String(d.getUTCSeconds()).padStart(2, "0") +
      "Z"
    );
  }
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@ats-lite`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ATS Lite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toUTCString(new Date())}`,
    `DTSTART:${toUTCString(start)}`,
    `DTEND:${toUTCString(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\\n/g, "\\\\n")}`,
    location ? `LOCATION:${location}` : "",
    organizerEmail ? `ORGANIZER:MAILTO:${organizerEmail}` : "",
    ...attendees.map(a => `ATTENDEE;CN=${a.name || "Attendee"}:MAILTO:${a.email}`),
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\\n");
  return ics;
}

function download(filename, content, mime = "text/calendar") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function mailto({ to, cc = [], subject, body }) {
  const addr = encodeURIComponent([].concat(to || []).filter(Boolean).join(","));
  const ccPart = cc.length ? `&cc=${encodeURIComponent(cc.join(","))}` : "";
  const sub = encodeURIComponent(subject || "");
  const b = encodeURIComponent(body || "");
  const href = `mailto:${addr}?subject=${sub}${ccPart}&body=${b}`;
  window.location.href = href;
}

// ---------- UI atoms ----------
const Section = ({ title, icon: Icon, children, right }) => (
  <Card>
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="w-5 h-5" /> : null}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {right}
    </div>
    <CardContent>{children}</CardContent>
  </Card>
);

const Row = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;

// ---------- main app ----------
export default function App() {
  const [lang, setLang] = useState("ar");
  const L = STR[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const align = lang === "ar" ? "text-right" : "text-left";

  const [jobs, setJobs] = useState([]);
  const [activeJobIdx, setActiveJobIdx] = useState(null);
  const [creatingJob, setCreatingJob] = useState({
    title: lang === "ar" ? "محلل مالي" : "Financial Analyst",
    department: lang === "ar" ? "المالية" : "Finance",
    managerName: "",
    managerEmail: "",
    steps: [
      { key: "screen", label: L.steps.screen, enabled: true },
      { key: "phone", label: L.steps.phone, enabled: true },
      { key: "interview", label: L.steps.interview, enabled: true },
      { key: "feedback", label: L.steps.feedback, enabled: true },
      { key: "offer", label: L.steps.offer, enabled: true },
      { key: "join", label: L.steps.join, enabled: true },
    ],
  });

  // Refresh step labels when language changes
  const syncSteps = () => setCreatingJob(v => ({
    ...v,
    steps: v.steps.map(s => ({ ...s, label: STR[lang].steps[s.key] }))
  }));

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    resumeFile: null,
    interviewDate: fmtDateTimeLocal(new Date(Date.now() + 24 * 3600 * 1000)),
    interviewDurationMins: 60,
    interviewMode: lang === "ar" ? "عن بُعد" : "Online",
    location: lang === "ar" ? "Microsoft Teams" : "Microsoft Teams",
  });

  const [feedback, setFeedback] = useState({ rating: STR[lang].ratings.sy, notes: "" });
  const [offer, setOffer] = useState({ salary: "", currency: "SAR", startDate: fmtDateTimeLocal(new Date(Date.now() + 7 * 24 * 3600 * 1000)), notes: "", attachment: null });

  const activeJob = useMemo(() => (activeJobIdx == null ? null : jobs[activeJobIdx]), [activeJobIdx, jobs]);

  function addJob() {
    const job = {
      ...creatingJob,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      pipeline: creatingJob.steps.filter(s => s.enabled).map(s => s.key),
      candidates: [],
      status: "Open",
    };
    setJobs(j => [...j, job]);
    setActiveJobIdx(jobs.length);
  }

  function addCandidateToJob() {
    if (activeJobIdx == null) return;
    const c = {
      ...candidate,
      id: crypto.randomUUID(),
      status: lang === "ar" ? "تم تحديد مقابلة" : "Interview Scheduled",
      history: [],
    };
    setJobs(prev => {
      const clone = [...prev];
      clone[activeJobIdx] = {
        ...clone[activeJobIdx],
        candidates: [...clone[activeJobIdx].candidates, c],
      };
      return clone;
    });
  }

  function toICSFile({title, description, start, end, location, managerEmail, attendees}){
    const toUTC = (d)=>{
      const dt = new Date(d);
      const pad = (x)=>String(x).padStart(2,'0');
      return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth()+1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}${pad(dt.getUTCSeconds())}Z`;
    };
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@ats-lite`,
      `DTSTAMP:${toUTC(new Date())}`,
      `DTSTART:${toUTC(start)}`,
      `DTEND:${toUTC(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${(description||'').replace(/\\n/g,'\\\\n')}`,
      location?`LOCATION:${location}`:"",
      managerEmail?`ORGANIZER:MAILTO:${managerEmail}`:"",
      ...(attendees||[]).map(a=>`ATTENDEE;CN=${a.name||'Attendee'}:MAILTO:${a.email}`),
      "END:VEVENT",
      "END:VCALENDAR"
    ].filter(Boolean).join("\\n");
    return lines;
  }

  function handleSendInterviewInvite() {
    if (!activeJob) return;
    const start = new Date(candidate.interviewDate);
    const end = new Date(start.getTime() + Number(candidate.interviewDurationMins) * 60000);
    const title = STR[lang].inviteTitle({ role: activeJob.title, name: candidate.name });
    const description = STR[lang].inviteDesc({ name: candidate.name, role: activeJob.title, mode: candidate.interviewMode, location: candidate.location, hm: creatingJob.managerName });

    const ics = toICSFile({
      title,
      description,
      start,
      end,
      location: candidate.location,
      managerEmail: creatingJob.managerEmail,
      attendees: [
        { name: candidate.name, email: candidate.email },
        { name: creatingJob.managerName || (lang === "ar" ? "مدير التوظيف" : "Hiring Manager"), email: creatingJob.managerEmail },
      ],
    });
    const blob = new Blob([ics], {type: "text/calendar"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Interview-${candidate.name}.ics`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);

    const subject = STR[lang].inviteEmailSubject(activeJob.title);
    const body = STR[lang].inviteEmailBody({ name: candidate.name, role: activeJob.title, start: start.toString(), mode: candidate.interviewMode, location: candidate.location, hm: creatingJob.managerName });
    const mailHref = `mailto:${encodeURIComponent([candidate.email, creatingJob.managerEmail].join(','))}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailHref;
  }

  function handleSubmitFeedback() {
    if (activeJobIdx == null) return;
    setJobs(prev => {
      const clone = [...prev];
      const job = clone[activeJobIdx];
      const lastCandidate = job.candidates[job.candidates.length - 1];
      if (!lastCandidate) return prev;
      lastCandidate.history.push({ type: "feedback", date: new Date().toISOString(), ...feedback });
      lastCandidate.status = `${STR[lang].feedbackTitle}: ${feedback.rating}`;
      clone[activeJobIdx] = { ...job };
      return clone;
    });
  }

  function handleSendOffer() {
    if (!activeJob) return;
    const lastCandidate = activeJob.candidates[activeJob.candidates.length - 1];
    if (!lastCandidate) return;

    const subject = STR[lang].offerSubject(activeJob.title);
    const body = STR[lang].offerBody({ name: lastCandidate.name, role: activeJob.title, salary: offer.salary, currency: offer.currency, start: new Date(offer.startDate).toDateString(), notes: offer.notes, hm: creatingJob.managerName });
    const mailHref = `mailto:${encodeURIComponent(lastCandidate.email)}?cc=${encodeURIComponent(creatingJob.managerEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailHref;
  }

  function handleJoiningReminder() {
    if (!activeJob) return;
    const lastCandidate = activeJob.candidates[activeJob.candidates.length - 1];
    if (!lastCandidate) return;

    const start = new Date(offer.startDate);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const ics = toICSFile({
      title: STR[lang].joiningTitle(lastCandidate.name),
      description: STR[lang].joiningDesc(lastCandidate.name, activeJob.title),
      start,
      end,
      location: lang === "ar" ? "المكتب" : "Office",
      managerEmail: creatingJob.managerEmail,
      attendees: [{ name: creatingJob.managerName || (lang === "ar" ? "مدير التوظيف" : "Hiring Manager"), email: creatingJob.managerEmail }],
    });
    const blob = new Blob([ics], {type: "text/calendar"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Joining-${lastCandidate.name}.ics`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);

    const subject = STR[lang].joiningSubject(lastCandidate.name, start.toDateString());
    const body = STR[lang].joiningBody(lastCandidate.name, start.toDateString());
    const mailHref = `mailto:${encodeURIComponent(creatingJob.managerEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailHref;
  }

  const stats = useMemo(() => {
    let total = 0, scheduled = 0, offered = 0, joined = 0;
    jobs.forEach(j => {
      total += j.candidates.length;
      j.candidates.forEach(c => {
        if (c.status?.includes("Interview") || c.status?.includes("مقابلة")) scheduled++;
        if (c.status?.includes("Offer") || c.status?.includes("عرض")) offered++;
        if (c.status?.includes("Joined") || c.status?.includes("مباشرة")) joined++;
      });
    });
    return { total, scheduled, offered, joined };
  }, [jobs, lang]);

  return (
    <div dir={dir} className={`min-h-screen bg-neutral-50 p-4 md:p-8 ${align}`}>
      <div className="max-w-6xl mx-auto grid gap-6">
        <div className="flex items-center justify-between">
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Briefcase className="w-7 h-7" /> {L.appTitle}
          </motion.h1>
          <div className="flex items-center gap-2">
            <Label className="text-sm">{L.lang}</Label>
            <Select value={lang} onValueChange={(v)=>{ setLang(v); syncSteps(); }}>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </Select>
          </div>
        </div>

        {/* Dashboard */}
        <Section title={L.overview} icon={Building2} right={<span className="text-sm text-neutral-500">{L.demo}</span>}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="p-4 rounded-2xl text-center">
              <div className="text-sm text-neutral-500">{L.jobs}</div>
              <div className="text-2xl font-semibold">{jobs.length}</div>
            </Card>
            <Card className="p-4 rounded-2xl text-center">
              <div className="text-sm text-neutral-500">{L.candidates}</div>
              <div className="text-2xl font-semibold">{stats.total}</div>
            </Card>
            <Card className="p-4 rounded-2xl text-center">
              <div className="text-sm text-neutral-500">{L.interviews}</div>
              <div className="text-2xl font-semibold">{stats.scheduled}</div>
            </Card>
            <Card className="p-4 rounded-2xl text-center">
              <div className="text-sm text-neutral-500">{L.offers}</div>
              <div className="text-2xl font-semibold">{stats.offered}</div>
            </Card>
          </div>
        </Section>

        {/* Job creator */}
        <Section title={L.createJob} icon={Plus}>
          <Row>
            <div className="space-y-2">
              <Label>{L.jobTitle}</Label>
              <Input value={creatingJob.title} onChange={e => setCreatingJob(v => ({ ...v, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{L.department}</Label>
              <Input value={creatingJob.department} onChange={e => setCreatingJob(v => ({ ...v, department: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{L.hmName}</Label>
              <Input value={creatingJob.managerName} onChange={e => setCreatingJob(v => ({ ...v, managerName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>{L.hmEmail}</Label>
              <Input type="email" value={creatingJob.managerEmail} onChange={e => setCreatingJob(v => ({ ...v, managerEmail: e.target.value }))} />
            </div>
          </Row>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {creatingJob.steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2 p-3 rounded-xl border">
                <Switch checked={s.enabled} onCheckedChange={val => setCreatingJob(v => { const steps = [...v.steps]; steps[i] = { ...steps[i], enabled: val }; return { ...v, steps }; })} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button onClick={addJob} className="gap-2"><Briefcase className="w-4 h-4"/>{L.create}</Button>
          </div>
        </Section>

        {/* Jobs list */}
        {jobs.length > 0 && (
          <Section title={L.jobsList} icon={Briefcase}>
            <div className="grid md:grid-cols-2 gap-3">
              {jobs.map((j, idx) => (
                <Card key={j.id} className={`p-4 rounded-2xl cursor-pointer ${activeJobIdx===idx?"ring-2 ring-black/10": ""}`} onClick={() => setActiveJobIdx(idx)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-semibold">{j.title}</div>
                      <div className="text-sm text-neutral-500">{j.department} • {j.pipeline.length} steps</div>
                    </div>
                    <ChevronRight className="w-5 h-5"/>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {/* Candidate & flow */}
        {activeJob && (
          <Section title={L.hiringFlow(activeJob.title)} icon={UserRound}>
            <div className="grid gap-6">
              {/* Candidate form */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="rounded-2xl">
                  <CardContent className="p-4 space-y-3">
                    <div className="text-sm font-semibold">{L.candidate}</div>
                    <Row>
                      <div className="space-y-2">
                        <Label>{L.fullName}</Label>
                        <Input value={candidate.name} onChange={e=>setCandidate(v=>({...v,name:e.target.value}))}/>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.email}</Label>
                        <Input type="email" value={candidate.email} onChange={e=>setCandidate(v=>({...v,email:e.target.value}))}/>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.phone}</Label>
                        <Input value={candidate.phone} onChange={e=>setCandidate(v=>({...v,phone:e.target.value}))}/>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.resume}</Label>
                        <Input type="file" onChange={e=>setCandidate(v=>({...v,resumeFile:e.target.files?.[0]||null}))}/>
                      </div>
                    </Row>

                    <div className="text-sm font-semibold pt-2">{L.interview}</div>
                    <Row>
                      <div className="space-y-2">
                        <Label>{L.dateTime}</Label>
                        <Input type="datetime-local" value={candidate.interviewDate} onChange={e=>setCandidate(v=>({...v,interviewDate:e.target.value}))}/>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.duration}</Label>
                        <Input type="number" value={candidate.interviewDurationMins} onChange={e=>setCandidate(v=>({...v,interviewDurationMins:e.target.value}))}/>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.mode}</Label>
                        <Select value={candidate.interviewMode} onValueChange={val=>setCandidate(v=>({...v,interviewMode:val}))}>
                          <SelectItem value={lang === "ar" ? "عن بُعد" : "Online"}>{L.online}</SelectItem>
                          <SelectItem value={lang === "ar" ? "حضوري" : "Onsite"}>{L.onsite}</SelectItem>
                          <SelectItem value={lang === "ar" ? "هاتف" : "Phone"}>{L.phoneCall}</SelectItem>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.location}</Label>
                        <Input value={candidate.location} onChange={e=>setCandidate(v=>({...v,location:e.target.value}))}/>
                      </div>
                    </Row>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button onClick={()=>{addCandidateToJob(); handleSendInterviewInvite();}} className="gap-2"><CalendarClock className="w-4 h-4"/>{L.sendInvite}</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback & Offer */}
                <div className="grid gap-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-sm font-semibold">{L.feedbackTitle}</div>
                      <Row>
                        <div className="space-y-2">
                          <Label>{L.rating}</Label>
                          <Select value={feedback.rating} onValueChange={val=>setFeedback(v=>({...v,rating:val}))}>
                            <SelectItem value={STR[lang].ratings.sy}>{STR[lang].ratings.sy}</SelectItem>
                            <SelectItem value={STR[lang].ratings.y}>{STR[lang].ratings.y}</SelectItem>
                            <SelectItem value={STR[lang].ratings.ly}>{STR[lang].ratings.ly}</SelectItem>
                            <SelectItem value={STR[lang].ratings.n}>{STR[lang].ratings.n}</SelectItem>
                            <SelectItem value={STR[lang].ratings.no}>{STR[lang].ratings.no}</SelectItem>
                            <SelectItem value={STR[lang].ratings.sno}>{STR[lang].ratings.sno}</SelectItem>
                          </Select>
                        </div>
                        <div className="space-y-2 md:col-span-1">
                          <Label>{L.notes}</Label>
                          <Textarea rows={5} value={feedback.notes} onChange={e=>setFeedback(v=>({...v,notes:e.target.value}))}/>
                        </div>
                      </Row>
                      <Button onClick={handleSubmitFeedback} className="gap-2"><CheckCircle2 className="w-4 h-4"/>{L.submitFeedback}</Button>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-sm font-semibold">{L.offerJoin}</div>
                      <Row>
                        <div className="space-y-2">
                          <Label>{L.salary}</Label>
                          <Input placeholder={lang==="ar"?"مثال: 10,000":"e.g., 10,000"} value={offer.salary} onChange={e=>setOffer(v=>({...v,salary:e.target.value}))}/>
                        </div>
                        <div className="space-y-2">
                          <Label>{L.currency}</Label>
                          <Select value={offer.currency} onValueChange={val=>setOffer(v=>({...v,currency:val}))}>
                            <SelectItem value="SAR">SAR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="AED">AED</SelectItem>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>{L.startDate}</Label>
                          <Input type="datetime-local" value={offer.startDate} onChange={e=>setOffer(v=>({...v,startDate:e.target.value}))}/>
                        </div>
                        <div className="space-y-2">
                          <Label>{L.offerNotes}</Label>
                          <Input value={offer.notes} onChange={e=>setOffer(v=>({...v,notes:e.target.value}))}/>
                        </div>
                        <div className="space-y-2">
                          <Label>{L.attachOffer}</Label>
                          <Input type="file" onChange={e=>setOffer(v=>({...v,attachment:e.target.files?.[0]||null}))}/>
                        </div>
                      </Row>
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={handleSendOffer} className="gap-2"><Mail className="w-4 h-4"/>{L.sendOffer}</Button>
                        <Button onClick={handleJoiningReminder} variant="secondary" className="gap-2"><Calendar className="w-4 h-4"/>{L.createJoining}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Candidates timeline */}
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-sm font-semibold mb-3">{L.recentCandidates}</div>
                  {activeJob.candidates.length === 0 ? (
                    <div className="text-sm text-neutral-500">{L.none}</div>
                  ) : (
                    <div className="space-y-3">
                      {activeJob.candidates.map(c => (
                        <div key={c.id} className="p-3 border rounded-xl flex items-center justify-between">
                          <div>
                            <div className="font-medium">{c.name}</div>
                            <div className="text-xs text-neutral-500">{c.email} • {c.phone}</div>
                          </div>
                          <div className="text-xs md:text-sm">{c.status}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Section>
        )}

        {/* Footer note */}
        <div className="text-xs text-neutral-500 text-center py-6">{L.footer}</div>
      </div>
    </div>
  );
}
