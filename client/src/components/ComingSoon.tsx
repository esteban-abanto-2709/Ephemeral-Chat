import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Wrench } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const ComingSoon = ({ title, icon, description }: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-violet-300 flex justify-center items-center'>
      <div className="w-full max-w-md mx-4">
        
        {/* Header similar al chat */}
        <header className="glass-strong rounded-t-3xl p-6 shadow-2xl">
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
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse" />
                  <span className="text-sm text-slate-700 font-medium">
                    En desarrollo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Área principal */}
        <div className="glass flex-1 p-8 space-y-6 text-center">
          
          {/* Icono principal */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full glass-strong flex items-center justify-center">
              <Wrench className="h-10 w-10 text-slate-600" />
            </div>
          </div>

          {/* Título y descripción */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Próximamente disponible
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Estado de desarrollo */}
          <div className="glass-strong rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-center text-slate-600">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Estado: En desarrollo activo</span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
            
            <p className="text-xs text-slate-600">
              Esta funcionalidad se está desarrollando y estará disponible pronto
            </p>
          </div>

          {/* Características que vendrán */}
          <div className="text-left space-y-2">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Lo que incluirá:</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3"></div>
                Chat en tiempo real
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3"></div>
                Notificaciones de conexión
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3"></div>
                Sistema de salas dinámicas
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mr-3"></div>
                Efimeridad total de mensajes
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="glass-strong rounded-b-3xl p-6 shadow-2xl">
          <button
            onClick={() => navigate('/')}
            className="w-full h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </button>
        </div>

      </div>
    </div>
  );
};