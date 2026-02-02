import AdminShell from '@/components/AdminShell';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ArrowLeft, CheckCircle, XCircle, Volume2, Puzzle, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LessonPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      words: {
        orderBy: { orderIndex: 'asc' },
        include: { introduction: true, ayahHighlights: true },
      },
      activities: { orderBy: { orderIndex: 'asc' } },
      midLessonMessage: true,
      celebrationStat: true,
    },
  });

  if (!lesson) notFound();

  const midPoint = Math.ceil(lesson.words.length / 2);

  const checks = [
    { ok: lesson.words.length >= lesson.wordCount, label: `Words: ${lesson.words.length}/${lesson.wordCount}` },
    { ok: lesson.words.every(w => w.introduction !== null), label: 'All words have introductions' },
    { ok: lesson.words.every(w => !!w.audioUrl), label: 'All words have audio' },
    { ok: lesson.activities.length > 0, label: `Activities: ${lesson.activities.length}` },
    { ok: !!lesson.midLessonMessage, label: 'Mid-lesson message' },
    { ok: !!lesson.celebrationStat, label: 'Celebration stat' },
  ];

  // Create a map for quick word lookup to ensure fresh data in activities
  const wordMap = new Map(lesson.words.map(w => [w.orderIndex, w]));

  const timeline: Array<{ type: string; data: any; label: string }> = [];

  // ... (timeline construction same as before)
  // 1. Lesson Start
  timeline.push({ type: 'LESSON_START', data: lesson, label: 'Lesson Start' });

  // 2. First half of words
  const firstHalf = lesson.words.slice(0, midPoint);
  firstHalf.forEach((w, i) => {
    timeline.push({ type: 'WORD', data: w, label: `Word ${i + 1}` });
  });

  // 3. Mid-Lesson Message
  if (lesson.midLessonMessage) {
    timeline.push({ type: 'MID_LESSON', data: lesson.midLessonMessage, label: 'Mid-Lesson Checkpoint' });
  }

  // 4. Second half of words
  const secondHalf = lesson.words.slice(midPoint);
  secondHalf.forEach((w, i) => {
    timeline.push({ type: 'WORD', data: w, label: `Word ${midPoint + i + 1}` });
  });

  // 5. Activities Transition
  if (lesson.activities.length > 0) {
    timeline.push({ type: 'ACTIVITIES_INTRO', data: null, label: 'Transition' });
    
    // 6. Activities
    lesson.activities.forEach((act, i) => {
      timeline.push({ type: 'ACTIVITY', data: act, label: `Activity ${i + 1}` });
    });
  }

  // 7. Celebration
  if (lesson.celebrationStat) {
    timeline.push({ type: 'CELEBRATION', data: lesson.celebrationStat, label: 'Completion' });
  }

  return (
    <AdminShell>
      <PageHeader
        title={`Preview: Lesson ${lesson.orderIndex}`}
        breadcrumbs={[
          { label: 'Lessons', href: '/lessons' },
          { label: lesson.title, href: `/lessons/${id}` },
          { label: 'Preview' },
        ]}
        actions={
          <Button href={`/lessons/${id}`} variant="secondary" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>
            Back to Editor
          </Button>
        }
      />

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-6xl mx-auto items-start">
         <div className="space-y-6 order-2 lg:order-1">
           <Card className="p-6">
             <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
               <CheckCircle className="h-4 w-4 text-teal-600" />
               Quality Checklist
             </h3>
             <div className="grid sm:grid-cols-2 gap-4">
               {checks.map((check, i) => (
                 <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${check.ok ? 'bg-teal-50/50 border-teal-100' : 'bg-red-50/50 border-red-100'}`}>
                   {check.ok ? (
                     <CheckCircle className="h-5 w-5 text-teal-500 shrink-0" />
                   ) : (
                     <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                   )}
                   <span className={`text-sm font-medium ${check.ok ? 'text-teal-900' : 'text-red-900'}`}>{check.label}</span>
                 </div>
               ))}
             </div>
           </Card>

           <div className="prose prose-slate max-w-none">
             <h3>Preview Notes</h3>
             <p className="text-gray-500">This flow simulates the exact sequence a user will experience. Scroll through the phone frame to review every step.</p>
           </div>
         </div>

         <div className="flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-[360px] border-[8px] border-slate-900 rounded-[3rem] overflow-hidden bg-gray-100 shadow-2xl ring-1 ring-slate-900/5 relative">
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none opacity-50 mix-blend-multiply" />
              <div className="bg-slate-900 h-8 w-full flex justify-center items-center z-20 relative">
                 <div className="w-20 h-4 bg-slate-800 rounded-full"></div>
              </div>
              
              <div className="h-[700px] overflow-y-auto no-scrollbar scroll-smooth bg-gray-100">
                 <div className="pb-20">
                    {timeline.map((step, index) => (
                      <div key={index} className="relative mb-2">
                        {/* Step Marker */}
                        <div className="absolute -left-2 top-4 transform -translate-x-full pr-4 hidden lg:block w-32 text-right">
                          <span className="text-[10px] uppercase font-bold text-gray-400">{step.label}</span>
                        </div>

                        {/* Screen Content */}
                        {step.type === 'LESSON_START' && (
                          <div className="bg-white p-8 min-h-[300px] flex flex-col justify-center items-center text-center shadow-sm mb-4">
                             <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
                               <BookOpen className="h-8 w-8" />
                             </div>
                             <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">Lesson {step.data.orderIndex}</p>
                             <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-3">{step.data.title}</h1>
                             <p className="text-base text-gray-500 leading-relaxed">{step.data.subtitle}</p>
                             <div className="mt-8">
                               <Button size="sm">Start Lesson</Button>
                             </div>
                          </div>
                        )}

                        {step.type === 'WORD' && (
                          <div className="bg-white p-6 shadow-sm border-y border-gray-100 space-y-8">
                            {/* Header / Badge */}
                            <div className="flex justify-between items-start">
                               <Badge variant="gray" className="text-[10px]">New Word</Badge>
                               {step.data.introduction && (
                                 <Badge variant="teal" className="text-[10px] shadow-none bg-teal-50 text-teal-700">{step.data.introduction.style}</Badge>
                               )}
                            </div>
                            
                            {/* Main Word Display */}
                            <div className="text-center space-y-4">
                               <p className="text-5xl font-bold text-slate-900 font-heading leading-relaxed" dir="rtl">{step.data.arabic}</p>
                               <div className="space-y-1">
                                 <p className="text-xl font-medium text-slate-800">{step.data.meaning}</p>
                                 <p className="text-sm text-gray-400 font-mono">{step.data.transliteration}</p>
                               </div>
                            </div>

                            {/* Introduction Content */}
                            {step.data.introduction && (
                              <div className="bg-slate-50 rounded-xl p-5 space-y-4 text-left">
                                <div className="space-y-2">
                                  <h4 className="font-bold text-slate-900 leading-snug">{step.data.introduction.headline}</h4>
                                  <p className="text-sm text-slate-600 leading-relaxed">{step.data.introduction.body}</p>
                                </div>

                                {/* Conditional Content based on Style */}
                                {(step.data.introduction.ayahRef || step.data.introduction.ayahText) && (
                                  <div className="bg-white p-3 rounded-lg border border-gray-200 text-xs">
                                    {step.data.introduction.ayahText && <p className="font-heading text-right text-slate-800 text-lg mb-2" dir="rtl">{step.data.introduction.ayahText}</p>}
                                    {step.data.introduction.ayahRef && <p className="text-gray-400 font-medium">— {step.data.introduction.ayahRef}</p>}
                                  </div>
                                )}

                                {step.data.introduction.factStat && (
                                  <div className="flex gap-3 bg-teal-50 p-3 rounded-lg text-teal-800 text-xs leading-relaxed border border-teal-100">
                                    <span className="font-bold shrink-0">Did you know?</span>
                                    {step.data.introduction.factStat}
                                  </div>
                                )}
                              </div>
                            )}

                            {step.data.audioUrl && (
                              <div className="flex justify-center">
                                 <button className="h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-100 transition-colors">
                                   <Volume2 className="h-5 w-5" />
                                 </button>
                              </div>
                            )}
                          </div>
                        )}

                        {step.type === 'MID_LESSON' && (
                          <div className="bg-teal-600 p-8 text-center text-white min-h-[250px] flex flex-col justify-center shadow-sm">
                             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                               <CheckCircle className="h-6 w-6 text-white" />
                             </div>
                             <h3 className="text-xl font-bold mb-2">{step.data.headline}</h3>
                             <p className="text-teal-100 text-sm leading-relaxed">{step.data.body}</p>
                             <div className="mt-6">
                               <Button variant="secondary" size="sm" className="bg-white/10 border-transparent text-white hover:bg-white/20">Continue</Button>
                             </div>
                          </div>
                        )}

                        {step.type === 'ACTIVITIES_INTRO' && (
                          <div className="bg-slate-900 p-8 text-center text-white min-h-[200px] flex flex-col justify-center shadow-sm">
                             <Puzzle className="h-8 w-8 text-teal-400 mx-auto mb-4" />
                             <h3 className="text-xl font-bold mb-2">Practice Time!</h3>
                             <p className="text-slate-400 text-sm">Let's test what you've learned so far.</p>
                          </div>
                        )}

                        {step.type === 'ACTIVITY' && (
                          <div className="bg-white p-6 shadow-sm border-y border-gray-100">
                             <div className="flex items-center justify-between mb-4">
                               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{step.data.type.replace(/_/g, ' ')}</span>
                               <span className="text-xs font-mono text-gray-300">Question 1/3</span>
                             </div>

                             {/* Render Mock UI based on Type */}
                             {step.data.type === 'MATCH' && (
                               <div className="grid grid-cols-2 gap-3">
                                 {(step.data.payload.pairs || []).slice(0, 4).map((pair: any, i: number) => {
                                   const w = wordMap.get(pair.wordOrderIndex);
                                   return (
                                     <div key={i} className="contents">
                                       <div className="p-3 bg-gray-50 rounded-xl text-center text-sm font-bold text-slate-700 border-b-2 border-gray-200">{w ? w.arabic : pair.arabic}</div>
                                       <div className="p-3 bg-white border border-gray-200 rounded-xl text-center text-sm text-gray-600">{w ? w.meaning : pair.meaning}</div>
                                     </div>
                                   );
                                 })}
                               </div>
                             )}

                             {step.data.type === 'QUICK_FIRE' && (
                               <div className="space-y-4">
                                  {(() => {
                                    const round = step.data.payload.rounds?.[0];
                                    if (!round) return null;
                                    const w = wordMap.get(round.wordOrderIndex);
                                    return (
                                      <>
                                        <div className="p-6 bg-gray-50 rounded-2xl text-center">
                                          <p className="text-2xl font-bold text-slate-800" dir="rtl">{w ? w.arabic : round.arabic}</p>
                                        </div>
                                        <div className="grid gap-2">
                                          {(round.options || ['Option A', 'Option B']).map((opt: string, i: number) => (
                                            <div key={i} className="p-3 border border-gray-200 rounded-xl text-center text-sm font-medium text-gray-600 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700">
                                              {opt}
                                            </div>
                                          ))}
                                        </div>
                                      </>
                                    );
                                  })()}
                               </div>
                             )}

                             {step.data.type === 'FILL_MEANING' && (
                               <div className="space-y-6 pt-4">
                                 {(() => {
                                    const w = wordMap.get(step.data.payload.wordOrderIndex);
                                    const arabic = w ? w.arabic : step.data.payload.arabic;
                                    const prompt = step.data.payload.prompt?.replace(step.data.payload.arabic || '', arabic).replace('___', '________');
                                    
                                    return (
                                      <>
                                         <p className="text-lg text-center font-medium text-slate-800">
                                           {prompt || `${arabic} means ________`}
                                         </p>
                                         <div className="flex flex-wrap gap-2 justify-center">
                                           {(step.data.payload.options || []).map((opt: string, i: number) => (
                                              <span key={i} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 border-b-2 border-gray-200">
                                                {opt || 'Option'}
                                              </span>
                                           ))}
                                         </div>
                                      </>
                                    );
                                 })()}
                               </div>
                             )}
                          </div>
                        )}

                        {step.type === 'CELEBRATION' && (
                          <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-8 text-center text-white min-h-[400px] flex flex-col justify-center items-center shadow-sm">
                             <div className="text-6xl mb-6">🎉</div>
                             <h2 className="text-3xl font-bold mb-2">Lesson Complete!</h2>
                             <p className="text-teal-100 mb-8">You're making great progress.</p>
                             
                             <div className="bg-white/10 rounded-2xl p-4 w-full backdrop-blur-sm border border-white/20 mb-6">
                               <p className="text-3xl font-bold">{step.data.cumulativeWords}</p>
                               <p className="text-xs text-teal-100 uppercase tracking-wider">Words Learned</p>
                             </div>
                             
                             <p className="text-xs text-teal-100/60 max-w-[200px] leading-relaxed">
                               {step.data.ayahCoverage}
                             </p>
                          </div>
                        )}
                      </div>
                    ))}
                 </div>
              </div>

              <div className="h-4 bg-slate-900 w-full mb-[2px]"></div>
            </div>
         </div>
      </div>
    </AdminShell>
  );
}
