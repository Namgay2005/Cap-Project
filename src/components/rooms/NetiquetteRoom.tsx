import React, { useState, useRef } from 'react';
import { CheckCircle2, X, Award, Download, Trash2 } from 'lucide-react';
import { MuseumRoom } from '../MuseumNavbar';

interface NetiquetteRoomProps {
  onNavigateRoom?: (room: MuseumRoom) => void;
}

interface NetiquetteRule {
  icon: string;
  title: string;
  description: string;
}

const SIX_RULES: NetiquetteRule[] = [
  {
    icon: '🤝',
    title: 'Be respectful online.',
    description:
      'Treat others the way you would like to be treated, even behind a screen.',
  },
  {
    icon: '🚫',
    title: 'Do not use offensive language.',
    description:
      'Words can hurt. Keep your language kind and appropriate in all online spaces.',
  },
  {
    icon: '🔒',
    title: "Respect other people's privacy.",
    description:
      "Never share someone else's personal information, photos, or messages without their permission.",
  },
  {
    icon: '✅',
    title: 'Do not spread false information.',
    description:
      'Always check facts before sharing. Misinformation can cause real harm to people and communities.',
  },
  {
    icon: '🧠',
    title: 'Think before you post.',
    description:
      'Once something is online, it can be difficult to remove. Pause and reflect before hitting send.',
  },
  {
    icon: '📝',
    title: 'Use appropriate language.',
    description:
      'Match your language to the context — formal in class emails, polite in group chats, professional in presentations.',
  },
];

interface ScenarioOption {
  label: string;
  isCorrect: boolean;
  feedback: string;
}

interface ScenarioItem {
  number: number;
  question: string;
  options: ScenarioOption[];
}

const SCENARIO_GALLERY: ScenarioItem[] = [
  {
    number: 1,
    question:
      'You receive an angry message from a classmate. What should you do?',
    options: [
      {
        label: 'Reply with equally angry messages.',
        isCorrect: false,
        feedback:
          'This escalates the conflict and can make things much worse for both parties.',
      },
      {
        label: 'Ignore it and speak to a teacher or trusted adult.',
        isCorrect: true,
        feedback:
          'Staying calm, avoiding retaliation, and speaking to a teacher or trusted adult helps resolve the issue safely and respectfully.',
      },
      {
        label: 'Share the message with all your classmates.',
        isCorrect: false,
        feedback:
          'Forwarding private messages spreads conflict and violates privacy.',
      },
    ],
  },
  {
    number: 2,
    question:
      "A classmate shares another student's photo in a group chat without asking first. Is this appropriate?",
    options: [
      {
        label: 'Yes, it is just a photo — no big deal.',
        isCorrect: false,
        feedback:
          'Even casual photos belong to that individual. Posting without consent can embarrass or hurt them.',
      },
      {
        label:
          "No, sharing someone's photo without permission is a breach of privacy.",
        isCorrect: true,
        feedback:
          "Always ask for permission before sharing anyone's photo, contact details, or messages.",
      },
    ],
  },
];

interface ScriptLine {
  speaker: string;
  line: string;
}

interface RoleplayScript {
  id: string;
  title: string;
  scene: string;
  characters: string;
  dialogue: ScriptLine[];
  reflectionPrompt: string;
}

const ROLEPLAY_SCRIPTS: RoleplayScript[] = [
  {
    id: 'script-1',
    title: 'Script 1 — The Angry Message',
    scene:
      'Scene: A group chat. Student 1 receives an angry message from her classmate Dorji accusing her of spreading a rumour.',
    characters:
      'Characters: Student 1 (recipient) · Dorji (sender) · Teacher (mediator)',
    dialogue: [
      {
        speaker: 'Narrator',
        line: 'After school, the Class IX study group chat pings loudly. Dorji types an angry message in all caps.',
      },
      {
        speaker: 'Dorji (sender)',
        line: 'WHY DID YOU TELL EVERYONE I FAILED THE PRACTICE TEST?! STOP SPREADING RUMOURS ABOUT ME!',
      },
      {
        speaker: 'Student 1 (recipient)',
        line: '(Pauses before typing) Wait… I never said anything about Dorji’s test. Part of me wants to yell back, but that will only make our whole group chat worse.',
      },
      {
        speaker: 'Student 1 (recipient)',
        line: '(Takes a screenshot for reference, does not reply angrily in the group, and speaks calmly to the class teacher the next morning.)',
      },
      {
        speaker: 'Teacher (mediator)',
        line: 'Thank you for coming to me instead of fighting online. Dorji, let’s talk calmly. Why did you send that message before checking the facts?',
      },
      {
        speaker: 'Dorji (sender)',
        line: 'Someone told me it was her, and I reacted without thinking. I’m really sorry—I should have asked privately and respectfully first.',
      },
      {
        speaker: 'Teacher (mediator)',
        line: 'Remember two key Netiquette rules: Think before you post, and always stay respectful—even when you feel upset.',
      },
    ],
    reflectionPrompt:
      'Why was pausing and speaking with the teacher more effective than replying angrily in the group chat?',
  },
  {
    id: 'script-2',
    title: 'Script 2 — The Shared Photo',
    scene:
      'Scene: A class WhatsApp group. Student 2 sees Tashi sharing a photo of their classmate Sonam without permission.',
    characters:
      'Characters: Tashi (sender) · Student 2 (bystander) · Sonam (subject of photo)',
    dialogue: [
      {
        speaker: 'Narrator',
        line: 'During lunch break, Tashi snaps an unflattering candid photo of Sonam eating and posts it in the class WhatsApp group as a joke.',
      },
      {
        speaker: 'Tashi (sender)',
        line: 'Haha look at Sonam’s face in this photo! Everyone save this sticker!',
      },
      {
        speaker: 'Sonam (subject of photo)',
        line: '(Looks upset) Hey, Tashi, when did you take that? You didn’t ask me! Please delete it right now.',
      },
      {
        speaker: 'Student 2 (bystander)',
        line: 'Tashi, that’s not cool. Sharing someone’s photo without permission violates their privacy. Nobody forward it—let’s delete it right away.',
      },
      {
        speaker: 'Tashi (sender)',
        line: 'Oh… I thought it was just harmless fun. I didn’t realize how uncomfortable it made you feel, Sonam. Deleting it for everyone right now—I’m sorry.',
      },
      {
        speaker: 'Sonam (subject of photo)',
        line: 'Thank you for deleting it, and thanks for speaking up. Next time, please always ask before posting photos of anyone.',
      },
    ],
    reflectionPrompt:
      'How did Student 2 act as an upstander rather than a passive bystander in the group chat?',
  },
];

const TEACHER_ACTIVITY_DOCUMENT = `ROLE-PLAY: NETWORK ETIQUETTE (CLASS IX — DTI CHAPTER 5)
====================================================================

1. TEACHER INSTRUCTIONS
- Divide the class into small groups of 3–4 students.
- Assign each group one Netiquette scenario (including Script 1 featuring Dorji and Script 2 featuring Tashi & Sonam, or additional group scenarios below).
- Give groups 10 minutes to rehearse dialogue showing both the digital dilemma and the respectful Netiquette solution.
- Each group performs a 2–3 minute role-play or records their completed performance video to upload in the Student Submissions area.

2. SIX GROUP SCENARIOS OVERVIEW
- Group 1 (The Angry Message): Dorji accuses a classmate in a group chat; the recipient stays calm and consults the Teacher.
- Group 2 (The Shared Photo): Tashi posts Sonam's photo in WhatsApp without consent; a classmate speaks up for privacy.
- Group 3 (Unverified Rumour): Pema receives a fake holiday announcement; Karma checks the school noticeboard before forwarding.
- Group 4 (Formal vs Informal Tone): Choden drafts a respectful email to the Principal instead of using chat slang.
- Group 5 (Password & Account Safety): Ugyen reminds a friend never to share account passwords in shared lab computers.
- Group 6 (Constructive Group Feedback): Dechen gives polite, helpful feedback on a shared presentation slide.

3. REFLECTION PROMPTS (POST-PERFORMANCE)
- Which of the Six Rules of Netiquette applied most directly to your scene?
- How does the lack of tone and facial expressions make text messages easy to misunderstand?
- What should bystanders do when they witness disrespectful behaviour online?

4. EVALUATION CRITERIA (20 MARKS TOTAL)
- Understanding of Netiquette Rule (5 marks): Clearly demonstrates accurate digital citizenship principles.
- Realistic Dialogue & Resolution (5 marks): Shows practical, respectful problem-solving.
- Teamwork & Participation (5 marks): Every group member contributes meaningfully on stage or camera.
- Clarity, Expression & Reflection (5 marks): Clear delivery and thoughtful answers to reflection prompts.
`;

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const NETIQUETTE_QUIZ: QuizQuestion[] = [
  {
    question: 'What does the term "Netiquette" stand for?',
    options: [
      'Network + Etiquette (polite and responsible online behaviour)',
      'Internet + Speed Ticket',
      'New Ethernet Cable',
      'Network Encryption Key',
    ],
    correctIndex: 0,
    explanation:
      'Netiquette combines "Network" and "Etiquette" — the guidelines for respectful conduct in all online spaces.',
  },
  {
    question:
      'Before sharing a photo or message of a classmate in a group chat, what must you do?',
    options: [
      'Share it quickly before asking',
      'Ask for their permission and respect their privacy',
      'Add funny captions first',
      'Send it to another group instead',
    ],
    correctIndex: 1,
    explanation:
      "Respecting other people's privacy means never sharing personal photos or messages without permission.",
  },
  {
    question:
      'What is the best response if you receive an angry or hurtful message from a classmate?',
    options: [
      'Reply in ALL CAPS with insults',
      'Forward it to everyone at school',
      'Do not retaliate; stay calm and speak to a teacher or trusted adult',
      'Post a rumour about them',
    ],
    correctIndex: 2,
    explanation:
      'Replying angrily escalates conflict. Pausing and consulting a trusted adult resolves the issue safely.',
  },
  {
    question:
      'You see a shocking news post in a chat group with no reliable source. What rule applies?',
    options: [
      'Do not spread false information — verify facts before sharing',
      'Forward it to 10 people immediately',
      'Rewrite it in ALL CAPS',
      'Share your password to read more',
    ],
    correctIndex: 0,
    explanation:
      'Always verify facts with trusted sources before forwarding to prevent harmful misinformation.',
  },
  {
    question:
      'How should you adapt your language across different online spaces?',
    options: [
      'Use slang in formal emails to teachers',
      'Type everything in uppercase letters',
      'Match your language to the context — formal in emails, polite in chats, professional in presentations',
      'Never use punctuation',
    ],
    correctIndex: 2,
    explanation:
      'Using appropriate language means matching tone and formality to the audience and setting.',
  },
];

const DEFAULT_NETIQUETTE_KAHOOT_URL =
  'https://create.kahoot.it/details/0e91d60d-cd53-4857-8af9-c14e46ebede3';
const NETIQUETTE_KAHOOT_KEY = 'netiquette_room_kahoot_url_v2';

export const NetiquetteRoom: React.FC<NetiquetteRoomProps> = ({
  onNavigateRoom,
}) => {
  // Scenario choices: map scenario number -> selected option index
  const [scenarioSelections, setScenarioSelections] = useState<
    Record<number, number>
  >({});

  // Modals for Teacher Reference & Roleplay Scripts
  const [teacherDocOpen, setTeacherDocOpen] = useState(false);
  const [activeScript, setActiveScript] = useState<RoleplayScript | null>(null);

  // Student Role-Play Performance Submissions (local prototype)
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; sizeLabel: string }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kahoot quiz link + built-in quiz modal
  const [kahootUrl, setKahootUrl] = useState<string>(() => {
    try {
      return (
        localStorage.getItem(NETIQUETTE_KAHOOT_KEY) ||
        DEFAULT_NETIQUETTE_KAHOOT_URL
      );
    } catch {
      return DEFAULT_NETIQUETTE_KAHOOT_URL;
    }
  });
  const [editingQuizLink, setEditingQuizLink] = useState(false);
  const [draftUrl, setDraftUrl] = useState(kahootUrl);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizPick, setQuizPick] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleDownloadTeacherDoc = () => {
    const blob = new Blob([TEACHER_ACTIVITY_DOCUMENT], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Role_Play_Scripts_Network_Etiquette.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const next = Array.from(files).map((f) => {
      const mb = f.size / (1024 * 1024);
      const sizeLabel =
        mb >= 1
          ? `${mb.toFixed(1)} MB`
          : `${Math.max(1, Math.round(f.size / 1024))} KB`;
      return { name: f.name, sizeLabel };
    });
    setUploadedFiles((prev) => [...prev, ...next]);
    e.target.value = '';
  };

  const handleSaveQuizLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftUrl.trim();
    const nextUrl = cleaned || DEFAULT_NETIQUETTE_KAHOOT_URL;
    setKahootUrl(nextUrl);
    try {
      if (cleaned) {
        localStorage.setItem(NETIQUETTE_KAHOOT_KEY, cleaned);
      } else {
        localStorage.removeItem(NETIQUETTE_KAHOOT_KEY);
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
    setQuizFinished(false);
    setQuizModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] pb-16">
      {/* 1. Warm Amber Hero Banner */}
      <section className="bg-[#c46b08] text-white py-12 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div
            className="text-4xl sm:text-5xl mb-3 leading-none"
            aria-hidden="true"
          >
            💬
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white">
            Netiquette Room
          </h1>
          <p className="text-amber-50/95 text-base sm:text-lg mt-2.5">
            Responsible and respectful behaviour when communicating online
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* 2. What is Netiquette? Card */}
        <section className="bg-white rounded-2xl border border-[#e5e0d5] border-t-4 border-t-[#c46b08] p-6 sm:p-8 shadow-2xs">
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            What is Netiquette?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
            <strong className="font-bold text-[#152847]">Netiquette</strong>{' '}
            (Network + Etiquette) is the code of polite and responsible
            behaviour when interacting online. Just as we follow rules of
            conduct in person, we should follow the same guidelines in emails,
            social media, class group chats, and all other online spaces.
          </p>
        </section>

        {/* 3. The Six Rules of Netiquette */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847]">
            The Six Rules of Netiquette
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SIX_RULES.map((rule) => (
              <div
                key={rule.title}
                className="bg-white rounded-2xl border border-[#e5e0d5] border-t-4 border-t-[#c46b08] p-6 shadow-2xs flex flex-col"
              >
                <div className="text-3xl leading-none mb-4" aria-hidden="true">
                  {rule.icon}
                </div>
                <h3 className="font-sans-body font-bold text-base text-[#152847]">
                  {rule.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Scenario Gallery */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847] flex items-center gap-2.5">
            <span aria-hidden="true">🎭</span>
            <span>Scenario Gallery</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Read each scenario and choose the best response. Click a choice to
            see the feedback.
          </p>

          <div className="space-y-5 mt-5">
            {SCENARIO_GALLERY.map((scenario) => {
              const pickedIdx = scenarioSelections[scenario.number];
              const hasSelection = pickedIdx !== undefined;

              return (
                <div
                  key={scenario.number}
                  className="bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-7 shadow-2xs"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-[#c46b08] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      {scenario.number}
                    </span>
                    <h3 className="font-sans-body font-bold text-base sm:text-lg text-[#152847]">
                      {scenario.question}
                    </h3>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {scenario.options.map((opt, idx) => {
                      const isSelected = pickedIdx === idx;
                      let optionClasses =
                        'border-[#ded9ce] bg-[#faf8f4]/70 hover:border-[#c46b08] text-slate-800';

                      if (hasSelection) {
                        if (isSelected) {
                          optionClasses = opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                            : 'border-rose-500 bg-rose-50 text-rose-950';
                        } else {
                          optionClasses =
                            'border-slate-200 bg-slate-50/60 text-slate-400 hover:text-slate-700 hover:border-slate-300';
                        }
                      }

                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() =>
                            setScenarioSelections((prev) => ({
                              ...prev,
                              [scenario.number]: idx,
                            }))
                          }
                          className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-colors cursor-pointer ${optionClasses}`}
                        >
                          <div className="font-medium">{opt.label}</div>
                          {isSelected && (
                            <div
                              className={`mt-1.5 text-xs sm:text-sm font-medium flex items-start gap-1.5 ${
                                opt.isCorrect
                                  ? 'text-emerald-800'
                                  : 'text-rose-700'
                              }`}
                            >
                              <span className="font-bold shrink-0">
                                {opt.isCorrect ? '✓' : '✕'}
                              </span>
                              <span>{opt.feedback}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Roleplay Scripts & Student Submissions */}
        <section>
          <h2 className="font-serif-title text-2xl sm:text-[26px] font-bold text-[#152847] flex items-center gap-2.5">
            <span aria-hidden="true">📜</span>
            <span>Roleplay Scripts</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Start with the teacher&apos;s complete activity file, then click
            either script below to read the dialogue before performing.
          </p>

          {/* Teacher Reference Card */}
          <div className="mt-5 max-w-xl bg-white rounded-2xl border border-[#e5e0d5] overflow-hidden shadow-2xs">
            <div className="bg-[#c46b08] text-white px-6 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-100">
                TEACHER REFERENCE
              </p>
              <h3 className="font-serif-title text-lg sm:text-xl font-bold mt-0.5">
                Role-Play: Network Etiquette
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Teacher instructions, six group scenarios, reflection prompts,
                and the 20-mark evaluation criteria. Character names have been
                updated as requested.
              </p>

              <div className="rounded-xl border border-[#e5e0d5] bg-[#faf8f4] px-4 py-3">
                <div className="text-sm font-bold text-[#152847]">
                  Role Play Scripts.docx
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Teacher-provided material
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setTeacherDocOpen(true)}
                  className="bg-[#152847] hover:bg-[#1e3a66] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Open or download file
                </button>
              </div>
            </div>
          </div>

          {/* 2 Roleplay Script Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {ROLEPLAY_SCRIPTS.map((script) => (
              <button
                key={script.id}
                type="button"
                onClick={() => setActiveScript(script)}
                className="bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#c46b08] transition-colors p-6 text-left flex flex-col justify-between shadow-2xs group cursor-pointer"
              >
                <div>
                  <div className="text-3xl leading-none mb-4" aria-hidden="true">
                    🎭
                  </div>
                  <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#152847]">
                    {script.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                    {script.scene}
                  </p>
                  <p className="text-xs text-slate-500 mt-3">
                    {script.characters}
                  </p>
                </div>

                <span className="mt-4 inline-block text-sm font-bold text-[#c46b08] group-hover:text-[#a35806]">
                  Read Script →
                </span>
              </button>
            ))}
          </div>

          {/* Student Submissions Card */}
          <div className="mt-6 bg-white rounded-2xl border border-[#e5e0d5] p-6 sm:p-8 shadow-2xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  STUDENT SUBMISSIONS
                </p>
                <h3 className="font-serif-title text-xl font-bold text-[#152847] mt-0.5">
                  Upload Your Role-Play Performance
                </h3>
              </div>
              <span className="bg-[#fffbeb] text-[#c46b08] text-xs font-semibold px-3 py-1 rounded-full shrink-0">
                Student area
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
              Choose the completed video recorded by your group after following
              the teacher&apos;s script and performance instructions.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="video/*,.mp4,.mov,.webm,.mkv,.avi,.ppt,.pptx,.pdf,.doc,.docx"
              onChange={handleFilesSelected}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 w-full rounded-xl border-2 border-dashed border-[#d6d0c4] hover:border-[#c46b08] bg-[#faf8f4] hover:bg-[#fffbeb]/40 py-10 px-4 text-center transition-colors cursor-pointer"
            >
              <div className="text-sm font-bold text-[#152847]">
                Choose files from this device
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Accepted formats: MP4,MOV,WEBM,AVI,PPTX,PDF,DOCX
              </div>
            </button>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="flex items-center justify-between bg-[#faf8f4] border border-[#e5e0d5] rounded-lg px-3.5 py-2 text-xs"
                  >
                    <span className="font-medium text-slate-800 truncate">
                      {file.name}{' '}
                      <span className="text-slate-400">({file.sizeLabel})</span>
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

            <p className="text-xs text-slate-500 leading-relaxed mt-4">
              Prototype mode: files stay on this device and are not sent to the
              teacher. Shared classroom submissions require the project backend
              or a teacher-provided Drive folder.
            </p>
          </div>
        </section>

        {/* 6. Take the Netiquette Quiz CTA Card */}
        <section className="bg-[#c46b08] rounded-2xl p-8 sm:p-10 text-center text-white shadow-sm">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
            Take the Netiquette Quiz
          </h2>
          <p className="text-amber-50 text-sm sm:text-base mt-2">
            How well do you know the rules of responsible online behaviour?
          </p>

          <div className="mt-6 flex flex-col items-center">
            {kahootUrl ? (
              <a
                href={kahootUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#152847] hover:bg-[#1e3a66] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors"
              >
                <span>🎯 Take the Netiquette Quiz</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={startBuiltInQuiz}
                className="inline-flex items-center gap-2 bg-[#152847] hover:bg-[#1e3a66] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <span>🎯 Take the Netiquette Quiz</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setDraftUrl(kahootUrl);
                setEditingQuizLink((prev) => !prev);
              }}
              className="mt-3 text-xs text-amber-100 hover:text-white underline cursor-pointer"
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

        {/* 7. Bottom 3-Button Room Navigation */}
        <nav
          aria-label="Room navigation"
          className="flex flex-wrap items-center justify-between gap-4 pt-2"
        >
          <button
            type="button"
            onClick={() => onNavigateRoom?.('transmission-media')}
            className="px-5 py-2.5 rounded-xl border border-[#ded9ce] bg-white hover:bg-[#f2eee4] text-[#152847] text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Transmission Media Room
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
            onClick={() => onNavigateRoom?.('mobile-comm')}
            className="px-5 py-2.5 rounded-xl bg-[#c46b08] hover:bg-[#a35806] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Mobile Communication Room →
          </button>
        </nav>
      </div>

      {/* Teacher Activity Reference Modal */}
      {teacherDocOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setTeacherDocOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#152847] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#f6c453]">
                  Role Play Scripts.docx · Teacher Reference
                </p>
                <h3 className="font-serif-title text-lg sm:text-xl font-bold">
                  Role-Play: Network Etiquette
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTeacherDocOpen(false)}
                aria-label="Close document"
                className="p-1.5 rounded-lg hover:bg-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 bg-[#faf8f4] text-sm text-slate-700">
              <pre className="whitespace-pre-wrap font-sans-body text-xs sm:text-sm leading-relaxed bg-white p-5 rounded-xl border border-[#e5e0d5]">
                {TEACHER_ACTIVITY_DOCUMENT}
              </pre>
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#e5e0d5] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleDownloadTeacherDoc}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#152847] hover:bg-[#1e3a66] text-white text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Activity File</span>
              </button>
              <button
                type="button"
                onClick={() => setTeacherDocOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#ded9ce] hover:bg-[#faf8f4] text-[#152847] text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roleplay Script Dialogue Reader Modal */}
      {activeScript && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveScript(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-[#e5e0d5]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#152847] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#f6c453]">
                  Classroom Roleplay Dialogue
                </p>
                <h3 className="font-serif-title text-lg sm:text-xl font-bold">
                  {activeScript.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveScript(null)}
                aria-label="Close script"
                className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-4 text-xs sm:text-sm text-amber-950 space-y-1">
                <p className="font-semibold">{activeScript.scene}</p>
                <p className="text-amber-800">{activeScript.characters}</p>
              </div>

              <div className="space-y-3">
                {activeScript.dialogue.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#e5e0d5] bg-[#faf8f4] p-3.5"
                  >
                    <div className="text-xs font-bold text-[#c46b08] uppercase tracking-wide">
                      {item.speaker}
                    </div>
                    <p className="text-sm text-slate-800 mt-1 leading-relaxed">
                      {item.line}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 text-xs sm:text-sm text-[#152847]">
                <strong>Group Reflection Prompt:</strong>{' '}
                {activeScript.reflectionPrompt}
              </div>
            </div>

            <div className="px-6 py-4 bg-[#faf8f4] border-t border-[#e5e0d5] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveScript(null)}
                className="px-5 py-2 rounded-xl bg-[#c46b08] hover:bg-[#a35806] text-white text-sm font-semibold cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Built-in Netiquette Quiz Modal */}
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
                <p className="text-xs font-bold uppercase tracking-wider text-[#c46b08]">
                  Netiquette Stamp Challenge
                </p>
                <h3 className="font-serif-title text-xl font-bold text-[#152847]">
                  Take the Netiquette Quiz
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

            {!quizFinished ? (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
                  <span>
                    Question {quizIndex + 1} of {NETIQUETTE_QUIZ.length}
                  </span>
                  <span className="font-mono-code">Score: {quizScore}</span>
                </div>

                <p className="text-base font-semibold text-[#152847] leading-snug">
                  {NETIQUETTE_QUIZ[quizIndex].question}
                </p>

                <div className="mt-4 space-y-2.5">
                  {NETIQUETTE_QUIZ[quizIndex].options.map((opt, idx) => {
                    const isPicked = quizPick === idx;
                    const isCorrect =
                      idx === NETIQUETTE_QUIZ[quizIndex].correctIndex;
                    let cls =
                      'border-[#ded9ce] bg-white hover:border-[#c46b08] text-slate-800';
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
                  <div className="mt-4 p-3.5 rounded-xl bg-[#fffbeb] border border-[#fde68a] text-xs sm:text-sm text-[#152847]">
                    {NETIQUETTE_QUIZ[quizIndex].explanation}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={quizPick === null}
                    onClick={() => {
                      if (quizIndex + 1 < NETIQUETTE_QUIZ.length) {
                        setQuizIndex((q) => q + 1);
                        setQuizPick(null);
                      } else {
                        setQuizFinished(true);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#c46b08] hover:bg-[#a35806] disabled:opacity-40 text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {quizIndex + 1 < NETIQUETTE_QUIZ.length
                      ? 'Next Question →'
                      : 'See Results →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#fffbeb] text-[#c46b08] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-serif-title text-2xl font-bold text-[#152847] mt-3">
                  You scored {quizScore} / {NETIQUETTE_QUIZ.length}!
                </h4>
                <p className="text-sm text-slate-600 mt-1.5">
                  {quizScore >= 4
                    ? 'Netiquette Stamp Unlocked! You know how to communicate kindly, responsibly, and safely online.'
                    : 'Nice effort! Review the Six Rules of Netiquette and try again.'}
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={startBuiltInQuiz}
                    className="px-5 py-2.5 rounded-xl border border-[#ded9ce] hover:bg-[#faf8f4] text-[#152847] text-sm font-semibold cursor-pointer"
                  >
                    Retry Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuizModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#c46b08] hover:bg-[#a35806] text-white text-sm font-semibold cursor-pointer"
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
