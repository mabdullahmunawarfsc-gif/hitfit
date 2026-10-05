const rows = [
  ['06:00', 'CrossFit', 'Yoga', 'Weight Training', 'Boxing', 'Cardio Blast', 'CrossFit'],
  ['09:00', 'Cardio Blast', 'Weight Training', 'Yoga', 'CrossFit', 'Boxing', 'Yoga'],
  ['12:00', 'Yoga', 'Boxing', 'Weight Training', 'Cardio Blast', 'Weight Training', 'Cardio Blast'],
  ['17:00', 'Boxing', 'CrossFit', 'Cardio Blast', 'Yoga', 'CrossFit', 'Weight Training'],
  ['19:00', 'Weight Training', 'Yoga', 'Boxing', 'CrossFit', 'Yoga', 'Boxing'],
];
const days = ['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Timetable() {
  return (
    <section id="timetable" className="bg-panel/50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center">Class <span className="text-accent">Timetable</span></h2>
        <div className="overflow-x-auto mt-10">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>{days.map((d) => <th key={d} className="p-3 bg-accent text-white first:rounded-tl-xl last:rounded-tr-xl">{d}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="text-center">
                  {r.map((c, j) => <td key={j} className={`p-3 border border-line ${j === 0 ? 'font-bold text-accent' : 'text-muted'}`}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
