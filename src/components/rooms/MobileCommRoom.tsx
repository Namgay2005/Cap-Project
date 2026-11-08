import React, { useState, useRef } from 'react';
import { X, Download, Check, Trash2, CheckCircle2, Award } from 'lucide-react';
import { MuseumRoom } from '../MuseumNavbar';

interface MobileCommRoomProps {
  onNavigateRoom?: (room: MuseumRoom) => void;
}

const CONCEPT_CARDS = [
  {
    title: 'What is Mobile Communication?',
    body: 'Mobile communication is the exchange of voice, text, and data between people using portable wireless devices like smartphones and tablets. It uses radio waves to transmit signals without physical cables.',
  },
  {
    title: 'How Mobile Devices Communicate',
    body: 'When you make a call or send a message, your phone converts the information into radio waves. These waves travel to the nearest cell tower, which forwards the signal through the network to reach the recipient.',
  },
  {
    title: 'Mobile Networks',
    body: 'Mobile networks (2G, 3G, 4G, 5G) are infrastructure systems that provide wireless communication services. Each generation has brought faster speeds and more reliable connections.',
  },
  {
    title: 'SIM Cards and Mobile Devices',
    body: 'A SIM (Subscriber Identity Module) card is a small chip that identifies your device on the mobile network. It stores your number, network information, and sometimes contacts.',
  },
];

const CALL_FLOW_STEPS = [
  {
    id: 'sender',
    icon: '📱',
    label: 'Your Phone',
    detail:
      'Your microphone or app converts voice/text into digital bits and transmits them as radio waves.',
  },
  {
    id: 'tower-1',
    icon: '📡',
    label: 'Cell Tower',
    detail:
      'The nearest base station antenna picks up your phone’s radio signal within your local cell zone.',
  },
  {
    id: 'network',
    icon: '🌐',
    label: 'Network',
    detail:
      'High-speed fibre-optic and switching centres route your call or data to the recipient’s region.',
  },
  {
    id: 'tower-2',
    icon: '📡',
    label: 'Cell Tower',
    detail:
      'The cell tower closest to your friend converts the data back into wireless radio waves.',
  },
  {
    id: 'recipient',
    icon: '📱',
    label: 'Recipient',
    detail:
      'The recipient’s smartphone receives the radio waves using its SIM identity and plays your voice or message!',
  },
];

const EVERYDAY_USES = [
  {
    icon: '📞',
    label: 'Phone Calls',
    detail: 'Instant voice conversations with family, classmates, and emergency services anywhere with coverage.',
  },
  {
    icon: '💬',
    label: 'SMS Messages',
    detail: 'Short text messages sent over cellular control channels even when mobile data is weak.',
  },
  {
    icon: '🌐',
    label: 'Mobile Internet',
    detail: 'Browsing learning websites, reading news, and researching school projects via 4G/5G.',
  },
  {
    icon: '📹',
    label: 'Video Calls',
    detail: 'Real-time face-to-face communication using high-bandwidth 4G LTE and 5G networks.',
  },
  {
    icon: '📲',
    label: 'Mobile Apps',
    detail: 'Educational, banking, messaging, and health apps connecting to cloud servers.',
  },
  {
    icon: '📍',
    label: 'GPS Navigation',
    detail: 'Combining satellite location signals with mobile maps for live directions and travel times.',
  },
];

interface RubricSection {
  title: string;
  marksLabel: string;
  items: string[];
}

const RUBRIC_SECTIONS: RubricSection[] = [
  {
    title: 'Content Coverage',
    marksLabel: '20 marks',
    items: [
      'Explains what mobile communication is',
      'Describes how mobile devices connect to networks',
      'Covers cell towers and their role',
      'Mentions SIM cards and mobile devices',
      'Includes real-life examples (calls, SMS, internet, etc.)',
    ],
  },
  {
    title: 'Visual Design',
    marksLabel: '15 marks',
    items: [
      'Slides are clear and easy to read',
      'Uses images, diagrams, or illustrations',
      'Includes a network flow diagram',
      'Colour scheme is consistent and appealing',
      'Not too much text on each slide',
    ],
  },
  {
    title: 'Presentation Delivery',
    marksLabel: '15 marks',
    items: [
      'Speaks clearly and confidently',
      'Explains concepts in own words',
      'Maintains eye contact with the audience',
      'Answers at least one question from the class',
      'Stays within the time limit',
    ],
  },
  {
    title: 'Creativity & Student Voice',
    marksLabel: '10 marks',
    items: [
      "Presentation reflects student's own understanding",
      'Uses creative formats (story, quiz, demo, etc.)',
      'Adds something beyond the textbook',
      'Shows evidence of research and effort',
    ],
  },
];

const PRESENTATION_TIPS_LEFT = [
  'Prepare 5–8 slides maximum',
  'Use your own words, not copy-paste',
  'Include a short quiz or question for the class',
];

const PRESENTATION_TIPS_RIGHT = [
  'Practise at least twice before presenting',
  'Add a real-life example from your daily life',
  'Time limit: 5–7 minutes',
];

const TEACHER_GUIDE_TEXT = `MOBILE COMMUNICATION PRESENTATION ACTIVITY GUIDE
(Class IX — Digital Technology & Innovation · Chapter 5)
====================================================================

1. ASSIGNED GROUP TOPICS
- Group A: How a Mobile Call Travels (Phone → Cell Tower → Network Backbone → Recipient)
- Group B: Evolution of Mobile Networks (2G, 3G, 4G, and 5G Compared)
- Group C: Inside Smartphones & SIM Cards (How Devices Identify & Authenticate)
- Group D: Mobile Communication in Everyday Life in Bhutan (Education, Banking, Navigation, Emergencies)

2. RESEARCH & SLIDE REQUIREMENTS
- Length: 5–8 clear, visual slides (PowerPoint, Keynote, or Google Slides).
- Must include at least one labelled Mobile Network Flow Diagram.
- Explain concepts in your own words with real-life examples.
- End with 1–2 quick review questions for your classmates.

3. SUBMISSION FORMAT
- Upload your completed .PPTX / .PDF slide deck in the Student Submissions panel.
- Optional: Attach a 1-page group reflection document (.DOCX / .PDF).

4. MARKING OVERVIEW
- Content Coverage: 20 marks
- Visual Design: 15 marks
- Presentation Delivery: 15 marks
- Creativity & Student Voice: 10 marks
- Total: 60 marks (also scalable to 20-mark classroom assessment weight)
`;

const MOBILE_QUIZ = [
  {
    question:
      'What type of wireless waves do smartphones use to communicate with the nearest cell tower?',
    options: [
      'Sound waves',
      'Radio waves',
      'Water waves',
      'Copper wires',
    ],
    correctIndex: 1,
    explanation:
      'Mobile devices convert voice, text, and data into radio waves that travel wirelessly to the nearest cell tower.',
  },
  {
    question: 'What does SIM stand for in a mobile phone?',
    options: [
      'Signal Internet Modem',
      'Subscriber Identity Module',
      'System Internal Memory',
      'Smart Information Chip',
    ],
    correctIndex: 1,
    explanation:
      'A SIM (Subscriber Identity Module) chip uniquely identifies your subscriber account and phone number on the mobile network.',
  },
  {
    question: 'Put the steps of a mobile call in the correct order:',
    options: [
      'Your Phone → Recipient → Cell Tower',
      'Your Phone → Cell Tower → Network Backbone → Cell Tower → Recipient',
      'Network → Your Phone → SIM Card',
      'Satellite → Copper Cable → TV Remote',
    ],
    correctIndex: 1,
    explanation:
      'Signals go from your phone to the nearest cell tower, across the core network backbone, to the recipient’s cell tower, and finally to their phone.',
  },
  {
    question:
      'Which mobile network generation introduced ultra-low latency and multi-gigabit wireless speeds in the 2020s?',
    options: ['2G', '3G', '4G', '5G'],
    correctIndex: 3,
    explanation:
      '5G is the fifth-generation mobile network providing the fastest speeds, higher capacity, and ultra-low latency.',
  },
];

const DEFAULT_MOBILE_KAHOOT_URL =
  'https://create.kahoot.it/details/0e91d60d-cd53-4857-8af9-c14e46ebede3';
const MOBILE_KAHOOT_STORAGE_KEY = 'mobile_comm_kahoot_url_v2';

export const MobileCommRoom: React.FC<MobileCommRoomProps> = ({
  onNavigateRoom,
}) => {
  const [selectedFlowIndex, setSelectedFlowIndex] = useState<number | null>(
    null
  );
  const [selectedEverydayIndex, setSelectedEverydayIndex] = useState<
    number | null
  >(null);

  // Interactive checklist state for student rubric
  const [checkedCriteria, setCheckedCriteria] = useState<
    Record<string, boolean>
  >({});

  // Teacher guide modal
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);

  // Student file upload
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeLabel: string }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kahoot URL + built-in quiz modal
  const [kahootUrl, setKahootUrl] = useState<string>(() => {
    try {
      return (
        localStorage.getItem(MOBILE_KAHOOT_STORAGE_KEY) ||
        DEFAULT_MOBILE_KAHOOT_URL
      );
    } catch {
      return DEFAULT_MOBILE_KAHOOT_URL;
    }
  });
  const [editingQuizLink, setEditingQuizLink] = useState(false);
  const [draftUrl, setDraftUrl] = useState(kahootUrl);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizPick, setQuizPick] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const toggleCriterion = (key: string) => {
    setCheckedCriteria((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const additions = Array.from(files).map((f) => {
      const mb = f.size / (1024 * 1024);
      const sizeLabel =
        mb >= 1
          ? `${mb.toFixed(1)} MB`
          : `${Math.max(1, Math.round(f.size / 1024))} KB`;
      return { name: f.name, sizeLabel };
    });
    setUploadedFiles((prev) => [...prev, ...additions]);
    e.target.value = '';
  };

  const handleDownloadGuide = () => {
    const blob = new Blob([TEACHER_GUIDE_TEXT], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mobile_Communication_Activity_Guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveQuizLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftUrl.trim();
    const nextUrl = cleaned || DEFAULT_MOBILE_KAHOOT_URL;
    setKahootUrl(nextUrl);
    try {
      if (cleaned) {
        localStorage.setItem(MOBILE_KAHOOT_STORAGE_KEY, cleaned);
      } else {
        localStorage.removeItem(MOBILE_KAHOOT_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
    setEditingQuizLink(false);
  };

  const startBuiltInQuiz = () => {
    setQuizIndex(0);
    setQuizPick(null);
    setQuizScore(0);
    setQuizDone(false);
    setQuizModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] pb-16">
      {/* 1. Violet Hero Banner */}
      <section className="bg-[#5e35b1] text-white py-12 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-4xl sm:text-5xl mb-3 leading-none"
            aria-hidden="true"
          >
            📱
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white">
            Mobile Communication Room
          </h1>
          <p className="text-violet-100 text-base sm:text-lg mt-2.5">
            Discover how mobile devices connect people across the world
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* 2. Understanding Mobile Communication (2x2 Grid) */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            Understanding Mobile Communication
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {CONCEPT_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#e5e0d5] border-t-4 border-t-[#5e35b1] p-6 shadow-2xs"
              >
                <h3 className="font-sans-body font-bold text-base text-[#5e35b1]">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* 3. How a Mobile Call Works Flow Card */}
          <div className="mt-6 bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-8 shadow-2xs text-center">
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#152847]">
              How a Mobile Call Works
            </h3>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {CALL_FLOW_STEPS.map((step, idx) => {
                const isSelected = selectedFlowIndex === idx;
                return (
                  <React.Fragment key={step.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedFlowIndex((prev) =>
                          prev === idx ? null : idx
                        )
                      }
                      className="flex flex-col items-center group focus:outline-none cursor-pointer"
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border transition-colors ${
                          isSelected
                            ? 'bg-[#5e35b1] text-white border-[#5e35b1] shadow-sm'
                            : 'bg-[#f5f3ff] border-[#ddd6fe] group-hover:border-[#5e35b1]'
                        }`}
                      >
                        <span aria-hidden="true">{step.icon}</span>
                      </div>
                      <span className="text-xs font-bold text-[#5e35b1] mt-2 whitespace-nowrap">
                        {step.label}
                      </span>
                    </button>

                    {idx < CALL_FLOW_STEPS.length - 1 && (
                      <span
                        className="text-[#5e35b1]/60 text-sm font-semibold pb-5"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {selectedFlowIndex !== null && (
              <div className="mt-4 max-w-xl mx-auto rounded-xl bg-[#f5f3ff] border border-[#ddd6fe] px-4 py-2.5 text-xs sm:text-sm text-[#152847]">
                <strong>{CALL_FLOW_STEPS[selectedFlowIndex].label}:</strong>{' '}
                {CALL_FLOW_STEPS[selectedFlowIndex].detail}
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-500 mt-5">
              Voice/data → radio waves → cell tower → network backbone → cell
              tower → recipient&apos;s phone
            </p>
          </div>
        </section>

        {/* 4. Mobile Communication in Everyday Life */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            Mobile Communication in Everyday Life
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-5">
            {EVERYDAY_USES.map((item, idx) => {
              const isSelected = selectedEverydayIndex === idx;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    setSelectedEverydayIndex((prev) =>
                      prev === idx ? null : idx
                    )
                  }
                  className={`rounded-2xl border p-5 text-center transition-colors shadow-2xs flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#f5f3ff] border-[#5e35b1]'
                      : 'bg-white border-[#e5e0d5] hover:border-[#5e35b1]'
                  }`}
                >
                  <span className="text-3xl leading-none" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="text-xs font-semibold text-[#152847] mt-3 whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedEverydayIndex !== null && (
            <div className="mt-3 rounded-xl bg-white border border-[#ddd6fe] px-4 py-3 text-xs sm:text-sm text-slate-700">
              <strong className="text-[#5e35b1]">
                {EVERYDAY_USES[selectedEverydayIndex].label}:
              </strong>{' '}
              {EVERYDAY_USES[selectedEverydayIndex].detail}
            </div>
          )}
        </section>

        {/* 5. Mobile Communication Presentation Activity */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            Mobile Communication Presentation Activity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            {/* Left: Teacher Reference & Activity Guide */}
            <div className="bg-white rounded-2xl border border-[#e5e0d5] overflow-hidden shadow-2xs flex flex-col justify-between">
              <div>
                <div className="bg-[#5e35b1] text-white px-6 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-200">
                    TEACHER REFERENCE
                  </p>
                  <h3 className="font-serif-title text-lg sm:text-xl font-bold mt-0.5">
                    Teacher Reference &amp; Activity Guide
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Read the assigned group topics, research instructions, slide
                    requirements, submission format, and 20-mark evaluation
                    criteria before creating your presentation.
                  </p>

                  <div className="rounded-xl border border-[#e5e0d5] bg-[#faf8f4] px-4 py-3">
                    <div className="text-sm font-bold text-[#152847]">
                      Mobile Communication Activity Guide.docx
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Teacher-provided material
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => setTeacherModalOpen(true)}
                  className="bg-[#152847] hover:bg-[#1e3a66] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Open or download file
                </button>
              </div>
            </div>

            {/* Right: Student Submissions */}
            <div className="bg-white rounded-2xl border border-[#e5e0d5] p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      STUDENT SUBMISSIONS
                    </p>
                    <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#152847] mt-0.5">
                      Submit Your Mobile Communication Presentation
                    </h3>
                  </div>
                  <span className="bg-[#f5f3ff] text-[#5e35b1] text-xs font-semibold px-3 py-1 rounded-full shrink-0">
                    Student area
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                  Choose your group&apos;s completed PowerPoint presentation and
                  any supporting PDF or reflection document.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".ppt,.pptx,.pdf,.doc,.docx"
                  onChange={handleFilesSelected}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 w-full rounded-xl border-2 border-dashed border-[#d6d0c4] hover:border-[#5e35b1] bg-[#faf8f4] hover:bg-[#f5f3ff]/40 py-9 px-4 text-center transition-colors cursor-pointer"
                >
                  <div className="text-sm font-bold text-[#152847]">
                    Choose files from this device
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Accepted formats: PPT,PPTX,PDF,DOC,DOCX
                  </div>
                </button>

                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={`${file.name}-${idx}`}
                        className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs"
                      >
                        <span className="font-medium text-slate-800 truncate">
                          {file.name}{' '}
                          <span className="text-slate-400">
                            ({file.sizeLabel})
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setUploadedFiles((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                          aria-label={`Remove ${file.name}`}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed mt-4">
                Prototype mode: files stay on this device and are not sent to
                the teacher. Shared classroom submissions require the project
                backend or a teacher-provided Drive folder.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Presentation Criteria & Marking Guide (60 Marks Interactive Rubric) */}
        <section className="bg-white rounded-2xl border border-[#e5e0d5] overflow-hidden shadow-2xs">
          {/* Header */}
          <div className="bg-[#5e35b1] text-white px-6 sm:px-8 py-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-violet-200">
              FOR STUDENTS
            </p>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold mt-0.5">
              Presentation Criteria &amp; Marking Guide
            </h2>
            <p className="text-xs sm:text-sm text-violet-100 mt-1">
              Use this rubric to plan and check your presentation before
              submitting.
            </p>
          </div>

          {/* 4 Criteria Sections */}
          <div className="divide-y divide-[#e5e0d5]">
            {RUBRIC_SECTIONS.map((sec) => (
              <div key={sec.title} className="px-6 sm:px-8 py-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-sans-body font-bold text-base text-[#5e35b1]">
                    {sec.title}
                  </h3>
                  <span className="bg-[#f5f3ff] text-[#5e35b1] border border-[#ddd6fe] text-xs font-bold px-3 py-1 rounded-full shrink-0">
                    {sec.marksLabel}
                  </span>
                </div>

                <ul className="mt-3.5 space-y-2.5">
                  {sec.items.map((item) => {
                    const key = `${sec.title}-${item}`;
                    const checked = Boolean(checkedCriteria[key]);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => toggleCriterion(key)}
                          className="flex items-start gap-3 text-left text-sm text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                        >
                          <span
                            className={`mt-0.5 w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                              checked
                                ? 'bg-[#5e35b1] border-[#5e35b1] text-white'
                                : 'border-[#c4b5fd] bg-white'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3" />}
                          </span>
                          <span
                            className={
                              checked ? 'line-through text-slate-400' : ''
                            }
                          >
                            {item}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Total Marks Row */}
          <div className="bg-[#f5f3ff] px-6 sm:px-8 py-4 border-t border-[#e5e0d5] flex items-center justify-between">
            <span className="font-bold text-sm sm:text-base text-[#5e35b1]">
              Total Marks
            </span>
            <span className="font-serif-title text-xl sm:text-2xl font-bold text-[#5e35b1] tabular-nums">
              60 marks
            </span>
          </div>

          {/* Presentation Tips */}
          <div className="bg-[#faf8f4] px-6 sm:px-8 py-5 border-t border-[#e5e0d5]">
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
              PRESENTATION TIPS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-3 text-xs sm:text-sm text-slate-600">
              <ul className="space-y-2">
                {PRESENTATION_TIPS_LEFT.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-[#5e35b1] font-bold" aria-hidden="true">
                      →
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {PRESENTATION_TIPS_RIGHT.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-[#5e35b1] font-bold" aria-hidden="true">
                      →
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Take the Mobile Communication Quiz CTA Card */}
        <section className="bg-[#5e35b1] rounded-2xl p-8 sm:p-10 text-center text-white shadow-sm">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
            Take the Mobile Communication Quiz
          </h2>
          <p className="text-violet-100 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Test what you have learned about mobile networks, cell towers, and
            everyday mobile technology.
          </p>

          <div className="mt-6 flex flex-col items-center">
            {kahootUrl ? (
              <a
                href={kahootUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors"
              >
                <span>🎯 Take the Mobile Communication Quiz</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={startBuiltInQuiz}
                className="inline-flex items-center gap-2 bg-[#e59b14] hover:bg-[#cf8a0e] text-[#152847] font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <span>🎯 Take the Mobile Communication Quiz</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setDraftUrl(kahootUrl);
                setEditingQuizLink((prev) => !prev);
              }}
              className="mt-3 text-xs text-violet-200 hover:text-white underline cursor-pointer"
            >
              Change quiz link
            </button>

            {editingQuizLink && (
              <form
                onSubmit={handleSaveQuizLink}
                className="mt-4 w-full max-w-md bg-white/10 border border-white/25 rounded-xl p-3 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="url"
                  value={draftUrl}
                  onChange={(e) => setDraftUrl(e.target.value)}
                  placeholder="https://create.kahoot.it/details/..."
                  className="flex-1 bg-white text-slate-900 text-sm rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#152847] hover:bg-[#1e3a66] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Save Link
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 8. Bottom 3-Button Room Navigation */}
        <nav
          aria-label="Room navigation"
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <button
            type="button"
            onClick={() => onNavigateRoom?.('netiquette')}
            className="px-5 py-2.5 rounded-xl border border-[#ded9ce] bg-white hover:bg-[#f2eee4] text-[#152847] text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Netiquette Room
          </button>

          <button
            type="button"
            onClick={() => onNavigateRoom?.('lobby')}
            className="px-5 py-2.5 rounded-xl bg-[#f2eee4] hover:bg-[#e6e0d2] border border-[#e5e0d5] text-[#152847] text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span aria-hidden="true">🏛️</span>
            <span>Back to Museum</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateRoom?.('explore')}
            className="px-5 py-2.5 rounded-xl bg-[#5e35b1] hover:bg-[#4d2996] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Back to Explore →
          </button>
        </nav>
      </div>

      {/* Teacher Activity Guide Modal */}
      {teacherModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setTeacherModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-[#e5e0d5]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#152847] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#f6c453]">
                  Teacher Reference &amp; Activity Guide
                </p>
                <h3 className="font-serif-title text-lg sm:text-xl font-bold">
                  Mobile Communication Presentation Activity
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTeacherModalOpen(false)}
                aria-label="Close guide"
                className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-[#faf8f4]">
              <pre className="whitespace-pre-wrap font-sans-body text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-5 rounded-xl border border-[#e5e0d5]">
                {TEACHER_GUIDE_TEXT}
              </pre>
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#e5e0d5] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleDownloadGuide}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#152847] hover:bg-[#1e3a66] text-white text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Activity Guide</span>
              </button>
              <button
                type="button"
                onClick={() => setTeacherModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#ded9ce] hover:bg-[#f2eee4] text-[#152847] text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Built-in Mobile Communication Quiz Modal */}
      {quizModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setQuizModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e5e0d5]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e0d5]">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#5e35b1]">
                  Mobile Communication Challenge
                </p>
                <h3 className="font-serif-title text-xl font-bold text-[#152847]">
                  Mobile Communication Quiz
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuizModalOpen(false)}
                aria-label="Close quiz"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!quizDone ? (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
                  <span>
                    Question {quizIndex + 1} of {MOBILE_QUIZ.length}
                  </span>
                  <span className="font-mono-code">Score: {quizScore}</span>
                </div>

                <p className="text-base font-semibold text-slate-900 leading-snug">
                  {MOBILE_QUIZ[quizIndex].question}
                </p>

                <div className="mt-4 space-y-2.5">
                  {MOBILE_QUIZ[quizIndex].options.map((opt, idx) => {
                    const isPicked = quizPick === idx;
                    const isCorrect =
                      idx === MOBILE_QUIZ[quizIndex].correctIndex;
                    let cls =
                      'border-[#e5e0d5] bg-white hover:border-[#5e35b1] text-slate-800';
                    if (quizPick !== null) {
                      if (isCorrect) {
                        cls =
                          'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isPicked) {
                        cls = 'border-rose-400 bg-rose-50 text-rose-900';
                      } else {
                        cls = 'border-slate-200 bg-slate-50 text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={quizPick !== null}
                        onClick={() => {
                          setQuizPick(idx);
                          if (isCorrect) setQuizScore((s) => s + 1);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm flex items-center justify-between gap-2 cursor-pointer ${cls}`}
                      >
                        <span>{opt}</span>
                        {quizPick !== null && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizPick !== null && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#f5f3ff] border border-[#ddd6fe] text-xs sm:text-sm text-[#152847]">
                    {MOBILE_QUIZ[quizIndex].explanation}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={quizPick === null}
                    onClick={() => {
                      if (quizIndex + 1 < MOBILE_QUIZ.length) {
                        setQuizIndex((q) => q + 1);
                        setQuizPick(null);
                      } else {
                        setQuizDone(true);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#5e35b1] hover:bg-[#4d2996] disabled:opacity-40 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {quizIndex + 1 < MOBILE_QUIZ.length
                      ? 'Next Question →'
                      : 'See Results →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#f5f3ff] text-[#5e35b1] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-serif-title text-2xl font-bold text-[#152847] mt-3">
                  You scored {quizScore} / {MOBILE_QUIZ.length}!
                </h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  {quizScore >= 3
                    ? 'Mobile Communication Stamp Unlocked! You have completed all four museum wings.'
                    : 'Great try! Review How a Mobile Call Works and try again.'}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={startBuiltInQuiz}
                    className="px-5 py-2.5 rounded-xl border border-[#ded9ce] hover:bg-[#f2eee4] text-[#152847] text-sm font-semibold cursor-pointer"
                  >
                    Retry Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#5e35b1] hover:bg-[#4d2996] text-white text-sm font-semibold cursor-pointer"
                  >
                    Back to Room
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
