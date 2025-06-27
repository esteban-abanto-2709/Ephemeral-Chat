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
    <header className="bg-card border-b p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            type="button"
            className="mr-3 h-9 w-9 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ArrowLeft className="h-5 w-5 text-gray-800" />
          </button>
          <div>
            <div className="flex items-center">
              {icon}
              <h1 className="text-lg font-semibold ml-2">{title}</h1>
            </div>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <span className="text-sm text-muted-foreground">
                {connectedCount} {connectedCount === 1 ? 'conectado' : 'conectados'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header >
  );
};
