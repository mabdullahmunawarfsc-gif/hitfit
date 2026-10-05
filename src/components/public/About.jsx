import { Counter } from '../ui';

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop" alt="about" className="rounded-3xl shadow-2xl" />
      </div>
      <div>
        <p className="text-accent font-bold tracking-widest uppercase text-sm">About Us</p>
        <h2 className="text-4xl font-black mt-2">More Than a Gym. A Movement.</h2>
        <p className="text-muted mt-4">At HIT FIT GYM we combine world-class equipment, elite coaching and a community that pushes you further every single day. Your strongest chapter starts here.</p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[['Members', 2400, '+'], ['Trainers', 24, ''], ['Years', 12, '']].map(([l, v, s]) => (
            <div key={l} className="bg-panel border border-line rounded-2xl p-5 text-center">
              <p className="text-3xl font-black text-accent"><Counter to={v} suffix={s} /></p>
              <p className="text-muted text-xs uppercase tracking-wider mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
