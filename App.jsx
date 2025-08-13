import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./Card.jsx";
import { Button } from "./Button.jsx";
import { Input, Textarea, Label } from "./Input.jsx";
import { Switch } from "./Switch.jsx";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue
} from "./Select.jsx";
import {
  Calendar, CheckCircle2, Mail, CalendarClock,
  UserRound, Briefcase, Building2, Plus, ChevronRight, Trash
} from "lucide-react";

/* ============================= i18n ============================= */
const STR = {
  en: {
    appTitle: "ATS Lite — Hiring Flow",
    overview: "Overview",
    jobs: "Jobs",
    candidates: "Candidates",
    interviews: "Interviews",
    offers: "Offers",
    demo: "Single‑file demo",
    createJob: "Create a Job",
    jobTitle: "Job Title",
    department: "Department",
    hmName: "Hiring Manager Name",
    hmEmail: "Hiring Manager Email",
    extraManagers: "Additional Managers (up to 3)",
    addManager: "Add manager",
    remove: "Remove",
    pipeline: "Pipeline Steps",
    create: "Create Job",
    jobsList: "Jobs",
    deleteJob: "Delete",
    confirmDeleteJob: "Delete this job?",
    steps: {
      screen: "CV Screen",
      phone: "Phone Screen",
      interview: "Interview",
      feedback: "Feedback",
      offer: "Offer",
      join: "Onboarding",
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
    preview: "Preview",
    send: "Send",
    cancel: "Cancel",
    to: "To",
    subject: "Subject",
    body: "Body",
    feedbackTitle: "Post‑Interview Feedback",
    rating: "Rating",
    notes: "Notes",
    submitFeedback: "Request Feedback",
    feedbackRecipient: "Feedback Recipient (manager email)",
    offerJoin: "Offer & Onboarding",
    salary: "Salary",
    currency: "Currency",
    startDate: "Proposed Start Date",
    offerNotes: "Offer Notes",
    attachOffer: "Attach Offer (optional)",
    sendOffer: "Send Offer",
    onboarding: "Onboarding",
    joinDate: "Joining Date",
    onboardingTeam: "Onboarding Team Emails (comma‑separated)",
    notifyMeEmail: "Notify me at (for reminder .ics)",
    sendOnboarding: "Send Onboarding",
    createJoining: "Create Joining Reminder (.ics)",
    recentCandidates: "Recent Candidates",
    none: "No candidates yet.",
    footer:
      "Front‑end demo: sending opens your email client; calendar invites download as .ics files.",
    lang: "Language",
    ratings: {
      sy: "Strong Yes",
      y: "Yes",
      ly: "Leaning Yes",
      n: "Neutral",
      no: "No",
      sno: "Strong No",
    },
    inviteEmailSubject: (title) => `Interview Invitation — ${title}`,
    inviteEmailBody: ({ name, role, start, mode, location, hm }) =>
      `Hello ${name},

We have scheduled your interview for ${start}.
Mode: ${mode}
Location/Link: ${location}

An .ics calendar invite has been downloaded for you. Please add it to your calendar.

Regards,
${hm || "Hiring Team"}`,
    inviteTitle: ({ role, name }) => `${role} Interview — ${name}`,
    inviteDesc: ({ name, role, mode, location, hm }) =>
      `Dear ${name},

You are invited to an interview for the role: ${role}.
Mode: ${mode}
Location/Link: ${location}

Best regards,
${hm || "Hiring Team"}`,
    offerSubject: (role) => `Job Offer — ${role}`,
    offerBody: ({ name, role, salary, currency, start, notes, hm }) =>
      `Dear ${name},

We are pleased to extend an offer for the role of ${role}.
Compensation: ${salary} ${currency}
Proposed Start Date: ${start}

Notes: ${notes}

Please reply to confirm.

Best regards,
${hm || "Hiring Team"}`,
    onboardingSubject: (name) => `Onboarding details — ${name}`,
    onboardingBody: ({ name, role, date }) =>
      `Heads‑up: ${name} will join as ${role} on ${date}.
Please ensure laptop, access and workspace are ready.`,
    joiningTitle: (name) => `Joining Day — ${name}`,
    joiningDesc: (name, role) => `Reminder: ${name} joining ${role}.`,
    joiningSubject: (name, date) => `Reminder: ${name} joins on ${date}`,
    joiningBody: (name, date) =>
      `Reminder: ${name} is scheduled to start on ${date}.`,
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
    extraManagers: "مدراء إضافيون (حتى ٣)",
    addManager: "إضافة مدير",
    remove: "حذف",
    pipeline: "خطوات التوظيف",
    create: "إنشاء الوظيفة",
    jobsList: "الوظائف",
    deleteJob: "حذف",
    confirmDeleteJob: "هل تريد حذف هذه الوظيفة؟",
    steps: {
      screen: "فرز السير الذاتية",
      phone: "مقابلة هاتفية",
      interview: "مقابلة",
      feedback: "تقييم",
      offer: "عرض وظيفي",
      join: "الأونبوردنق",
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
    preview: "معاينة",
    send: "إرسال",
    cancel: "إلغاء",
    to: "إلى",
    subject: "العنوان",
    body: "المحتوى",
    feedbackTitle: "طلب تقييم ما بعد المقابلة",
    rating: "التقييم",
    notes: "ملاحظات",
    submitFeedback: "طلب التقييم",
    feedbackRecipient: "مستلم التقييم (إيميل المدير)",
    offerJoin: "العرض والأونبوردنق",
    salary: "الراتب",
    currency: "العملة",
    startDate: "تاريخ المباشرة المقترح",
    offerNotes: "ملاحظات العرض",
    attachOffer: "إرفاق العرض (اختياري)",
    sendOffer: "إرسال العرض",
    onboarding: "الأونبوردنق",
    joinDate: "تاريخ الانضمام",
    onboardingTeam: "إيميلات فريق الأونبوردنق (مفصولة بفواصل)",
    notifyMeEmail: "نبّهني على (للتذكير .ics)",
    sendOnboarding: "إرسال الأونبوردنق",
    createJoining: "إنشاء تذكير المباشرة (.ics)",
    recentCandidates: "المرشحون حديثًا",
    none: "لا يوجد مرشحون بعد.",
    footer:
      "هذه واجهة أمامية: الإرسال يفتح برنامج البريد، وملفات التقويم تُحمّل بصيغة .ics.",
    lang: "اللغة",
    ratings: {
      sy: "موافقة قوية",
      y: "موافقة",
      ly: "موافقة مائلة",
      n: "محايد",
      no: "رفض",
      sno: "رفض قوي",
    },
    inviteEmailSubject: (title) => `دعوة مقابلة — ${title}`,
    inviteEmailBody: ({ name, role, start, mode, location, hm }) =>
      `مرحبًا ${name},

تم تحديد مقابلة لوظيفة ${role} بتاريخ ${start}.
الطريقة: ${mode}
الموقع/الرابط: ${location}

تم تنزيل ملف تقويم .ics — فضلاً أضفه لتقويمك.

تحياتي،
${hm || "فريق التوظيف"}`,
    inviteTitle: ({ role, name }) => `${role} — مقابلة ${name}`,
    inviteDesc: ({ name, role, mode, location, hm }) =>
      `عزيزي/عزيزتي ${name},

ندعوك لمقابلة على وظيفة: ${role}.
الطريقة: ${mode}
الموقع/الرابط: ${location}

مع التحية،
${hm || "فريق التوظيف"}`,
    offerSubject: (role) => `عرض وظيفي — ${role}`,
    offerBody: ({ name, role, salary, currency, start, notes, hm }) =>
      `عزيزي/عزيزتي ${name},

يسعدنا تقديم عرض لوظيفة ${role}.
التعويض: ${salary} ${currency}
تاريخ المباشرة المقترح: ${start}

ملاحظات: ${notes}

فضلاً الرد بالتأكيد.

تحياتنا،
${hm || "فريق التوظيف"}`,
    onboardingSubject: (name) => `تفاصيل الأونبوردنق — ${name}`,
    onboardingBody: ({ name, role, date }) =>
      `تنبيه: ${name} سينضم كـ ${role} بتاريخ ${date}.
يرجى تجهيز اللابتوب والصلاحيات ومكان العمل.`,
    joiningTitle: (name) => `يوم المباشرة — ${name}`,
    joiningDesc: (name, role) => `تذكير: مباشرة ${name} على وظيفة ${role}.`,
    joiningSubject: (name, date) => `تذكير: مباشرة ${name} بتاريخ ${date}`,
    joiningBody: (name, date) => `تذكير بأن ${name} سيباشر بتاريخ ${date}.`,
  },
};

/* ============================= helpers ============================= */
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
function fmtDateHuman(dt) {
  try {
    return new Date(dt).toLocaleString();
  } catch {
    return dt;
  }
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
    `DESCRIPTION:${(description || "").replace(/\n/g, "\\n")}`,
    location ? `LOCATION:${location}` : "",
    organizerEmail ? `ORGANIZER:MAILTO:${organizerEmail}` : "",
    ...attendees
      .filter(Boolean)
      .map((a) => `ATTENDEE;CN=${(a?.name || "Attendee").replace(/[,;]/g, " ")}:MAILTO:${a?.email || ""}`),
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
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

/* ============================= UI atoms ============================= */
const Section = ({ title, icon: Icon, children, right }) => (
  <Card className="rounded-2xl shadow-sm">
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="w-5 h-5" /> : null}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {right}
    </div>
    <CardContent className="p-4">{children}</CardContent>
  </Card>
);
const Row = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>;

/* ============================= Modal (Preview) ============================= */
function Modal({ open, onClose, title, to, subject, body, onSend, L }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-lg">
        <div className="p-4 border-b text-lg font-semibold">{title || L.preview}</div>
        <div className="p-4 space-y-3">
          <div>
            <Label className="text-sm">{L.to}</Label>
            <Input value={to} readOnly />
          </div>
          <div>
            <Label className="text-sm">{L.subject}</Label>
            <Input value={subject} readOnly />
          </div>
          <div>
            <Label className="text-sm">{L.body}</Label>
            <Textarea rows={8} value={body} readOnly />
          </div>
        </div>
        <div className="p-4 border-t flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>{L.cancel}</Button>
          <Button onClick={onSend}>{L.send}</Button>
        </div>
      </div>
    </div>
  );
}

/* ============================= App ============================= */
export default function App() {
  const [lang, setLang] = useState("ar");
  const L = STR[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const align = lang === "ar" ? "text-right" : "text-left";

  // === Create job ===
  const [jobs, setJobs] = useState([]);
  const [activeJobIdx, setActiveJobIdx] = useState(null);
  const [creatingJob, setCreatingJob] = useState({
    title: "",
    department: "",
    managerName: "",
    managerEmail: "",
    extraManagerEmails: [],
    steps: [
      { key: "screen", label: STR[lang].steps.screen, enabled: true },
      { key: "phone", label: STR[lang].steps.phone, enabled: true },
      { key: "interview", label: STR[lang].steps.interview, enabled: true },
      { key: "feedback", label: STR[lang].steps.feedback, enabled: true },
      { key: "offer", label: STR[lang].steps.offer, enabled: true },
      { key: "join", label: STR[lang].steps.join, enabled: true },
    ],
  });
  const syncSteps = () =>
    setCreatingJob((v) => ({
      ...v,
      steps: v.steps.map((s) => ({ ...s, label: STR[lang].steps[s.key] })),
    }));

  function addJob() {
    if (!creatingJob.title?.trim()) return;
    const job = {
      ...creatingJob,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      pipeline: creatingJob.steps.filter((s) => s.enabled).map((s) => s.key),
      candidates: [],
      status: "Open",
    };
    setJobs((j) => [job, ...j]);
    setActiveJobIdx(0);
    // clear
    setCreatingJob((v) => ({
      ...v,
      title: "",
      department: "",
      managerName: "",
      managerEmail: "",
      extraManagerEmails: [],
    }));
  }
  function deleteJob(id) {
    if (!confirm(L.confirmDeleteJob)) return;
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setActiveJobIdx(null);
  }

  // === Candidate + stages ===
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    resumeFile: null,
    interviewDate: fmtDateTimeLocal(new Date(Date.now() + 24 * 3600 * 1000)),
    interviewDurationMins: 60,
    interviewMode: lang === "ar" ? "عن بُعد" : "Online",
    location: "Microsoft Teams",
  });
  const [feedback, setFeedback] = useState({
    rating: STR[lang].ratings.sy,
    notes: "",
    recipient: "", // manager email override
  });
  const [offer, setOffer] = useState({
    salary: "",
    currency: "SAR",
    startDate: fmtDateTimeLocal(new Date(Date.now() + 7 * 24 * 3600 * 1000)),
    notes: "",
    attachment: null,
  });
  const [onboarding, setOnboarding] = useState({
    joinDate: fmtDateTimeLocal(new Date(Date.now() + 14 * 24 * 3600 * 1000)),
    teamEmails: "",
    notifyMeEmail: "",
  });

  // === Modal (Preview) ===
  const [preview, setPreview] = useState({
    open: false,
    title: "",
    to: "",
    subject: "",
    body: "",
    onSend: null,
  });

  const activeJob = useMemo(
    () => (activeJobIdx == null ? null : jobs[activeJobIdx]),
    [activeJobIdx, jobs]
  );
  const managersAll = activeJob
    ? [activeJob.managerEmail, ...(activeJob.extraManagerEmails || [])].filter(Boolean)
    : [];

  // === Actions ===
  function addCandidateToJob() {
    if (activeJobIdx == null) return;
    const c = {
      ...candidate,
      id: crypto.randomUUID(),
      status: lang === "ar" ? "تم تحديد مقابلة" : "Interview Scheduled",
      history: [],
    };
    setJobs((prev) => {
      const clone = [...prev];
      clone[activeJobIdx] = {
        ...clone[activeJobIdx],
        candidates: [c, ...clone[activeJobIdx].candidates],
      };
      return clone;
    });
  }

  function showPreview({ title, to, subject, body, onSend }) {
    setPreview({ open: true, title, to, subject, body, onSend });
  }
  function closePreview() {
    setPreview((p) => ({ ...p, open: false }));
  }

  // Invite (with ICS)
  function onInvitePreview() {
    if (!activeJob) return;
    const start = new Date(candidate.interviewDate);
    const subj = STR[lang].inviteEmailSubject(activeJob.title);
    const body = STR[lang].inviteEmailBody({
      name: candidate.name,
      role: activeJob.title,
      start: start.toString(),
      mode: candidate.interviewMode,
      location: candidate.location,
      hm: activeJob.managerName,
    });
    const to = [candidate.email, ...managersAll].filter(Boolean).join(", ");
    const onSend = () => {
      // ICS
      const end = new Date(
        start.getTime() + Number(candidate.interviewDurationMins) * 60000
      );
      const ics = toICS({
        title: STR[lang].inviteTitle({
          role: activeJob.title,
          name: candidate.name,
        }),
        description: STR[lang].inviteDesc({
          name: candidate.name,
          role: activeJob.title,
          mode: candidate.interviewMode,
          location: candidate.location,
          hm: activeJob.managerName,
        }),
        start,
        end,
        location: candidate.location,
        organizerEmail: activeJob.managerEmail,
        attendees: [
          { name: candidate.name, email: candidate.email },
          ...managersAll.map((m) => ({ name: "Manager", email: m })),
        ],
      });
      download(`Interview-${candidate.name}.ics`, ics);
      mailto({
        to: [candidate.email, ...managersAll].filter(Boolean),
        subject: subj,
        body,
      });
      closePreview();
    };
    showPreview({
      title: L.preview,
      to,
      subject: subj,
      body,
      onSend,
    });
  }

  // Feedback (to manager you choose)
  function onFeedbackPreview() {
    if (!activeJob) return;
    const recipient =
      feedback.recipient?.trim() ||
      activeJob.managerEmail ||
      managersAll[0] ||
      "";
    const subj = `${L.feedbackTitle} — ${activeJob.title}`;
    const body = `${L.rating}: ${feedback.rating}

${L.notes}:
${feedback.notes || "-"}

${activeJob.managerName ? `Regards,\n${activeJob.managerName}` : ""}`;
    const to = recipient;
    const onSend = () => {
      mailto({ to: [recipient], subject: subj, body });
      // update status
      setJobs((prev) => {
        const clone = [...prev];
        const job = clone[activeJobIdx];
        const lastCandidate = job.candidates[0];
        if (lastCandidate) {
          lastCandidate.history.push({
            type: "feedback",
            date: new Date().toISOString(),
            ...feedback,
          });
          lastCandidate.status = `${L.feedbackTitle}: ${feedback.rating}`;
        }
        clone[activeJobIdx] = { ...job };
        return clone;
      });
      closePreview();
    };
    showPreview({ title: L.preview, to, subject: subj, body, onSend });
  }

  // Offer (to candidate)
  function onOfferPreview() {
    if (!activeJob) return;
    const subj = STR[lang].offerSubject(activeJob.title);
    const body = STR[lang].offerBody({
      name: candidate.name,
      role: activeJob.title,
      salary: offer.salary,
      currency: offer.currency,
      start: new Date(offer.startDate).toDateString(),
      notes: offer.notes,
      hm: activeJob.managerName,
    });
    const to = candidate.email;
    const onSend = () => {
      mailto({
        to: [candidate.email],
        cc: managersAll,
        subject: subj,
        body,
      });
      closePreview();
    };
    showPreview({ title: L.preview, to, subject: subj, body, onSend });
  }

  // Onboarding (to team emails) + reminder ICS to me
  function onOnboardingPreview() {
    if (!activeJob) return;
    const joinDate = new Date(onboarding.joinDate);
    const toList = (onboarding.teamEmails || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const subj = STR[lang].onboardingSubject(candidate.name || "-");
    const body = STR[lang].onboardingBody({
      name: candidate.name,
      role: activeJob.title,
      date: fmtDateHuman(onboarding.joinDate),
    });
    const to = toList.join(", ");
    const onSend = () => {
      // email team
      if (toList.length) {
        mailto({ to: toList, subject: subj, body });
      }
      // reminder ICS to me
      if (onboarding.notifyMeEmail) {
        const end = new Date(joinDate.getTime() + 60 * 60 * 1000);
        const ics = toICS({
          title: STR[lang].joiningTitle(candidate.name || "-"),
          description: STR[lang].joiningDesc(candidate.name || "-", activeJob.title),
          start: joinDate,
          end,
          location: lang === "ar" ? "المكتب" : "Office",
          organizerEmail: onboarding.notifyMeEmail,
          attendees: [{ name: "Me", email: onboarding.notifyMeEmail }],
        });
        download(`Joining-${candidate.name || "candidate"}.ics`, ics);
      }
      closePreview();
    };
    showPreview({ title: L.preview, to, subject: subj, body, onSend });
  }

  // === Stats ===
  const stats = useMemo(() => {
    let total = 0,
      scheduled = 0,
      offered = 0;
    jobs.forEach((j) => {
      total += j.candidates.length;
      j.candidates.forEach((c) => {
        if (c.status?.includes("Interview") || c.status?.includes("مقابلة"))
          scheduled++;
        if (c.status?.includes("Offer") || c.status?.includes("عرض")) offered++;
      });
    });
    return { total, scheduled, offered };
  }, [jobs, lang]);

  return (
    <div dir={dir} className={`min-h-screen bg-white p-4 md:p-8 ${align}`}>
      {/* Modal */}
      <Modal
        open={preview.open}
        onClose={closePreview}
        title={preview.title}
        to={preview.to}
        subject={preview.subject}
        body={preview.body}
        onSend={preview.onSend}
        L={L}
      />

      <div className="max-w-6xl mx-auto grid gap-6">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2"
          >
            <Briefcase className="w-7 h-7" /> {L.appTitle}
          </motion.h1>

          <div className="flex items-center gap-2">
            <Label className="text-sm">{L.lang}</Label>
            <Select
              value={lang}
              onValueChange={(v) => {
                setLang(v);
                syncSteps();
              }}
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dashboard */}
        <Section
          title={L.overview}
          icon={Building2}
          right={<span className="text-sm text-neutral-500">{L.demo}</span>}
        >
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

        {/* Create job */}
        <Section title={L.createJob} icon={Plus}>
          <Row>
            <div className="space-y-2">
              <Label>{L.jobTitle}</Label>
              <Input
                value={creatingJob.title}
                onChange={(e) =>
                  setCreatingJob((v) => ({ ...v, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{L.department}</Label>
              <Input
                value={creatingJob.department}
                onChange={(e) =>
                  setCreatingJob((v) => ({ ...v, department: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{L.hmName}</Label>
              <Input
                value={creatingJob.managerName}
                onChange={(e) =>
                  setCreatingJob((v) => ({ ...v, managerName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>{L.hmEmail}</Label>
              <Input
                type="email"
                value={creatingJob.managerEmail}
                onChange={(e) =>
                  setCreatingJob((v) => ({ ...v, managerEmail: e.target.value }))
                }
              />
            </div>
          </Row>

          <div className="mt-3">
            <Label className="text-sm">{L.extraManagers}</Label>
            <div className="space-y-2 mt-2">
              {creatingJob.extraManagerEmails.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="email"
                    value={m}
                    onChange={(e) =>
                      setCreatingJob((v) => {
                        const arr = [...v.extraManagerEmails];
                        arr[i] = e.target.value;
                        return { ...v, extraManagerEmails: arr };
                      })
                    }
                    placeholder={`manager${i + 1}@company.com`}
                  />
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setCreatingJob((v) => {
                        const arr = [...v.extraManagerEmails];
                        arr.splice(i, 1);
                        return { ...v, extraManagerEmails: arr };
                      })
                    }
                  >
                    {L.remove}
                  </Button>
                </div>
              ))}
              {creatingJob.extraManagerEmails.length < 3 && (
                <Button
                  variant="secondary"
                  onClick={() =>
                    setCreatingJob((v) => ({
                      ...v,
                      extraManagerEmails: [...v.extraManagerEmails, ""],
                    }))
                  }
                >
                  {L.addManager}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {creatingJob.steps.map((s, i) => (
              <div
                key={s.key}
                className="flex items-center gap-2 p-3 rounded-xl border"
              >
                <Switch
                  checked={s.enabled}
                  onCheckedChange={(val) =>
                    setCreatingJob((v) => {
                      const steps = [...v.steps];
                      steps[i] = { ...steps[i], enabled: val };
                      return { ...v, steps };
                    })
                  }
                />
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button onClick={addJob} className="gap-2">
              <Briefcase className="w-4 h-4" />
              {L.create}
            </Button>
          </div>
        </Section>

        {/* Jobs list */}
        {jobs.length > 0 && (
          <Section title={L.jobsList} icon={Briefcase}>
            <div className="grid md:grid-cols-2 gap-3">
              {jobs.map((j, idx) => (
                <Card
                  key={j.id}
                  className={`p-4 rounded-2xl ${
                    activeJobIdx === idx ? "ring-2 ring-black/10" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => setActiveJobIdx(idx)}
                    >
                      <div className="text-base font-semibold">{j.title}</div>
                      <div className="text-sm text-neutral-500">
                        {j.department} • {j.pipeline.length} steps
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => deleteJob(j.id)}
                      title={L.deleteJob}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {/* Flow */}
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
                        <Input
                          value={candidate.name}
                          onChange={(e) =>
                            setCandidate((v) => ({ ...v, name: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{L.email}</Label>
                        <Input
                          type="email"
                          value={candidate.email}
                          onChange={(e) =>
                            setCandidate((v) => ({ ...v, email: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{L.phone}</Label>
                        <Input
                          value={candidate.phone}
                          onChange={(e) =>
                            setCandidate((v) => ({ ...v, phone: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{L.resume}</Label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            setCandidate((v) => ({
                              ...v,
                              resumeFile: e.target.files?.[0] || null,
                            }))
                          }
                        />
                      </div>
                    </Row>

                    <div className="text-sm font-semibold pt-2">
                      {L.interview}
                    </div>
                    <Row>
                      <div className="space-y-2">
                        <Label>{L.dateTime}</Label>
                        <Input
                          type="datetime-local"
                          value={candidate.interviewDate}
                          onChange={(e) =>
                            setCandidate((v) => ({
                              ...v,
                              interviewDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{L.duration}</Label>
                        <Input
                          type="number"
                          value={candidate.interviewDurationMins}
                          onChange={(e) =>
                            setCandidate((v) => ({
                              ...v,
                              interviewDurationMins: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{L.mode}</Label>
                        <Select
                          value={candidate.interviewMode}
                          onValueChange={(val) =>
                            setCandidate((v) => ({ ...v, interviewMode: val }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={L.select} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={lang === "ar" ? "عن بُعد" : "Online"}>
                              {L.online}
                            </SelectItem>
                            <SelectItem value={lang === "ar" ? "حضوري" : "Onsite"}>
                              {L.onsite}
                            </SelectItem>
                            <SelectItem value={lang === "ar" ? "هاتف" : "Phone"}>
                              {L.phoneCall}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{L.location}</Label>
                        <Input
                          value={candidate.location}
                          onChange={(e) =>
                            setCandidate((v) => ({
                              ...v,
                              location: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </Row>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        onClick={() => {
                          addCandidateToJob();
                          onInvitePreview();
                        }}
                        className="gap-2"
                      >
                        <CalendarClock className="w-4 h-4" />
                        {L.sendInvite}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback + Offer + Onboarding */}
                <div className="grid gap-4">
                  <Card className="rounded-2xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-sm font-semibold">{L.feedbackTitle}</div>
                      <Row>
                        <div className="space-y-2">
                          <Label>{L.rating}</Label>
                          <Select
                            value={feedback.rating}
                            onValueChange={(val) =>
                              setFeedback((v) => ({ ...v, rating: val }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={STR[lang].ratings.sy}>
                                {STR[lang].ratings.sy}
                              </SelectItem>
                              <SelectItem value={STR[lang].ratings.y}>
                                {STR[lang].ratings.y}
                              </SelectItem>
                              <SelectItem value={STR[lang].ratings.ly}>
                                {STR[lang].ratings.ly}
                              </SelectItem>
                              <SelectItem value={STR[lang].ratings.n}>
                                {STR[lang].ratings.n}
                              </SelectItem>
                              <SelectItem value={STR[lang].ratings.no}>
                                {STR[lang].ratings.no}
                              </SelectItem>
                              <SelectItem value={STR[lang].ratings.sno}>
                                {STR[lang].ratings.sno}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>{L.feedbackRecipient}</Label>
                          <Input
                            type="email"
                            placeholder={activeJob.managerEmail || "manager@company.com"}
                            value={feedback.recipient}
                            onChange={(e) =>
                              setFeedback((v) => ({
                                ...v,
                                recipient: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="space-y-2 md:col-span-1">
                          <Label>{L.notes}</Label>
                          <Textarea
                            rows={5}
                            value={feedback.notes}
                            onChange={(e) =>
                              setFeedback((v) => ({ ...v, notes: e.target.value }))
                            }
                          />
                        </div>
                      </Row>

                      <Button onClick={onFeedbackPreview} className="gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {L.submitFeedback}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-sm font-semibold">{L.offerJoin}</div>
                      <Row>
                        <div className="space-y-2">
                          <Label>{L.salary}</Label>
                          <Input
                            placeholder={lang === "ar" ? "مثال: 10,000" : "e.g., 10,000"}
                            value={offer.salary}
                            onChange={(e) =>
                              setOffer((v) => ({ ...v, salary: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{L.currency}</Label>
                          <Select
                            value={offer.currency}
                            onValueChange={(val) =>
                              setOffer((v) => ({ ...v, currency: val }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAR">SAR</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="AED">AED</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>{L.startDate}</Label>
                          <Input
                            type="datetime-local"
                            value={offer.startDate}
                            onChange={(e) =>
                              setOffer((v) => ({ ...v, startDate: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{L.offerNotes}</Label>
                          <Input
                            value={offer.notes}
                            onChange={(e) =>
                              setOffer((v) => ({ ...v, notes: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{L.attachOffer}</Label>
                          <Input
                            type="file"
                            onChange={(e) =>
                              setOffer((v) => ({
                                ...v,
                                attachment: e.target.files?.[0] || null,
                              }))
                            }
                          />
                        </div>
                      </Row>

                      <div className="flex flex-wrap gap-2">
                        <Button onClick={onOfferPreview} className="gap-2">
                          <Mail className="w-4 h-4" />
                          {L.sendOffer}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-2xl">
                    <CardContent className="p-4 space-y-3">
                      <div className="text-sm font-semibold">{L.onboarding}</div>
                      <Row>
                        <div className="space-y-2">
                          <Label>{L.joinDate}</Label>
                          <Input
                            type="datetime-local"
                            value={onboarding.joinDate}
                            onChange={(e) =>
                              setOnboarding((v) => ({ ...v, joinDate: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{L.onboardingTeam}</Label>
                          <Input
                            placeholder="it@company.com, hr@company.com"
                            value={onboarding.teamEmails}
                            onChange={(e) =>
                              setOnboarding((v) => ({
                                ...v,
                                teamEmails: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{L.notifyMeEmail}</Label>
                          <Input
                            placeholder="me@company.com"
                            value={onboarding.notifyMeEmail}
                            onChange={(e) =>
                              setOnboarding((v) => ({
                                ...v,
                                notifyMeEmail: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </Row>

                      <div className="flex flex-wrap gap-2">
                        <Button onClick={onOnboardingPreview} className="gap-2">
                          <Calendar className="w-4 h-4" />
                          {L.sendOnboarding}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Candidates list */}
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="text-sm font-semibold mb-3">
                    {L.recentCandidates}
                  </div>
                  {activeJob.candidates.length === 0 ? (
                    <div className="text-sm text-neutral-500">{L.none}</div>
                  ) : (
                    <div className="space-y-3">
                      {activeJob.candidates.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 border rounded-xl flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{c.name}</div>
                            <div className="text-xs text-neutral-500">
                              {c.email} • {c.phone}
                            </div>
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

        {/* Footer */}
        <div className="text-xs text-neutral-500 text-center py-6">
          {L.footer}
        </div>
      </div>
    </div>
  );
}
