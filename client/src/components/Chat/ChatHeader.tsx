import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  icon: React.ReactNode;
  connectedCount: number;
}

export const ChatHeader = ({ title, icon, connectedCount }: ChatHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="glass-strong md:rounded-t-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            type="button"
            className="mr-4 h-10 w-10 flex items-center justify-center rounded-xl glass hover:bg-white/30 transition-all duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <ArrowLeft className="h-5 w-5 text-slate-800" />
          </button>
          <div>
            <div className="flex items-center">
              <div className="text-slate-800 mr-3">{icon}</div>
              <h1 className="text-xl font-bold text-slate-800">{title}</h1>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
              <span className="text-sm text-slate-700 font-medium">
                {connectedCount} {connectedCount === 1 ? 'conectado' : 'conectados'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
