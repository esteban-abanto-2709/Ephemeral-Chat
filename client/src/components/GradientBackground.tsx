
const GradientBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-violet-300">
      {children}
    </div>
  );
};

export default GradientBackground;