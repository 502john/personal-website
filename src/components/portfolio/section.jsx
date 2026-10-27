export function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="mt-16">
      <h2 id={id} className="mb-8 font-serif text-xl font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}
