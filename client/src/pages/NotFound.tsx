// client/src/pages/NotFound.tsx
import { useNavigate } from 'react-router-dom';
import { Home, MessageCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';

function NotFound() {
  const navigate = useNavigate();

  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-lg mx-auto">
          
          {/* Icono principal */}
          <div className="mb-8">
            <div className="relative">
              <MessageCircle className="h-24 w-24 text-white/30 mx-auto mb-4" />
              <div className="absolute top-0 right-0 bg-red-500 rounded-full p-2">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Código de error */}
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-white/80 mb-2 drop-shadow-lg">
              404
            </h1>
            <div className="h-1 w-20 bg-white/50 mx-auto rounded-full"></div>
          </div>

          {/* Mensaje principal */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Página no encontrada
          </h2>

          {/* Descripción */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            La página que buscas se desvaneció como nuestros mensajes efímeros.
          </p>

          {/* Botones de acción */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full max-w-sm h-14 px-6 text-lg font-medium bg-white text-gray-800 hover:bg-gray-50 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center mx-auto"
            >
              <Home className="mr-3 h-5 w-5" />
              Ir al inicio
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full max-w-sm h-14 px-6 text-lg font-medium bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center mx-auto backdrop-blur-sm"
            >
              <ArrowLeft className="mr-3 h-5 w-5" />
              Volver atrás
            </button>
          </div>

          {/* Enlaces rápidos */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">
              O puedes ir directamente a:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/chat/global')}
                className="text-white/80 hover:text-white underline underline-offset-2"
              >
                Chat Global
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => navigate('/chat/private')}
                className="text-white/80 hover:text-white underline underline-offset-2"
              >
                Chat Privado
              </button>
              <span className="text-white/40">•</span>
              <button
                onClick={() => navigate('/chat/random')}
                className="text-white/80 hover:text-white underline underline-offset-2"
              >
                Chat Aleatorio
              </button>
            </div>
          </div>

        </div>

        {/* Mensaje adicional en la parte inferior */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/50 text-sm">
            Si crees que esto es un error, intenta refrescar la página
          </p>
        </div>

      </div>
    </GradientBackground>
  );
}

export default NotFound;