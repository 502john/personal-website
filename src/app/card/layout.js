export default function CardLayout({ children }) {
  return (
    <div className="min-w-[400px] style={{ minWidth: '400px' }} overflow-x-auto">
      {children}
    </div>
  );
}