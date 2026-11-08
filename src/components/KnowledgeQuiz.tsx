import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/transmissionMediaData';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const KnowledgeQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const hasAnsweredCurrent = selectedAnswers[currentQ.id] !== undefined;
  const selectedOption = selectedAnswers[currentQ.id];

  const handleSelectOption = (index: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Calculate score
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <section id="quiz-section" className="py-14 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
            <span>ASSESSMENT & RETENTION CHECK</span>
            <span aria-hidden="true">·</span>
            <span>OSI PHYSICAL LAYER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transmission Media Mastery Assessment
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Test your understanding of guided waveguides, optical reflection limits, and wireless propagation behaviors.
          </p>
        </div>

        {/* Quiz Body */}
        {!isCompleted ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Question Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">
                  {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-600 dark:bg-cyan-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400 block mb-1">
                Concept Challenge
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = currentQ.correctIndex === index;
                
                let buttonStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
                
                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    buttonStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium';
                  } else if (isSelected && !isCorrect) {
                    buttonStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  } else {
                    buttonStyle = 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${buttonStyle}`}
                  >
                    <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1 leading-relaxed">
                      {option}
                    </div>
                    {hasAnsweredCurrent && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Real-Time Explanation Callout */}
            {hasAnsweredCurrent && (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Technical Explanation:</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Next / Submit Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                Score: <strong className="text-slate-700 dark:text-slate-200 font-mono">{correctCount}</strong> / {QUIZ_QUESTIONS.length}
              </span>

              {hasAnsweredCurrent && (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Completion Scorecard */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Assessment Completed!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {scorePercentage >= 80
                  ? 'Outstanding! You have demonstrated exceptional mastery of physical networking transmission media and propagation physics.'
                  : scorePercentage >= 60
                  ? 'Solid effort! You have a good foundation in guided and unguided media. Review the interactive signal lab to sharpen weak points.'
                  : 'Good start. Explore the cable cross-sections and signal propagation simulator to strengthen your understanding.'}
              </p>
            </div>

            {/* Score Metric Ring / Pill */}
            <div className="inline-flex items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium">Final Score</div>
                <div className="text-3xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {scorePercentage}%
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <div className="text-xs text-slate-400 uppercase font-medium">Accuracy</div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                  {correctCount} / {QUIZ_QUESTIONS.length}
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
