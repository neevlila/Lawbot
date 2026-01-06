import React from 'react';

const logos = [
  { name: 'Private' },
  { name: 'Secure' },
  { name: 'Local Storage' },
  { name: 'Encrypted' },
];

const ClientLogos: React.FC = () => {
  return (
    <section className="py-6 border-t border-light-border/30 dark:border-dark-border/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h3 className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest opacity-70">Built for Privacy & Security</h3>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
          {logos.map((l) => (
            <div key={l.name} className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border rounded-full px-4 py-1.5 bg-light-card/40 dark:bg-dark-card/40">
              {l.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
