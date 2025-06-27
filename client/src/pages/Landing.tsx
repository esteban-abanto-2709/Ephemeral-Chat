import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';

import { useNavigate } from 'react-router-dom';
import { MessageCircle, Link2, Users, Globe } from 'lucide-react';
import { Linkedin, Instagram, Github } from 'lucide-react';

import GradientBackground from '@/components/GradientBackground';

function Landing() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        if (!socket) return;

        socket.on('users:count', (count) => {
            setUserCount(count);
        });

        return () => {
            socket.off('users:count');
        };

    }, [socket]);

    return (
        <GradientBackground>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        {/* Logo/Icon */}
                        <div className="mb-8">
                            <MessageCircle className="h-16 w-16 text-white mx-auto mb-4 drop-shadow-lg" />
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            Ephemeral Chat
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
                            Conversaciones que desaparecen para siempre
                        </p>

                        {/* Action Buttons */}
                        <div className="space-y-4 mb-12">
                            <button
                                onClick={() => navigate('/chat/global')}
                                className="w-full max-w-sm h-14 px-6 text-lg font-medium bg-white text-gray-800 hover:bg-gray-50 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center"
                            >
                                <Globe className="mr-3 h-5 w-5" />
                                Ingresar al chat global
                            </button>

                            <button
                                onClick={() => navigate('/chat/private/abcde')}
                                className="w-full max-w-sm h-14 px-6 text-lg font-medium bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center backdrop-blur-sm"
                            >
                                <Link2 className="mr-3 h-5 w-5" />
                                Crear un enlace privado
                            </button>

                            <button
                                onClick={() => navigate('/chat/random/1234')}
                                className="w-full max-w-sm h-14 px-6 text-lg font-medium bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center backdrop-blur-sm"
                            >
                                <MessageCircle className="mr-3 h-5 w-5" />
                                Hablar con alguien al azar
                            </button>
                        </div>

                        {/* User Counter */}
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white shadow-lg">
                            <Users className="h-5 w-5 mr-2" />
                            <span className="font-medium">{userCount} usuarios conectados</span>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center py-8">
                    <p className="text-white/70 text-sm mb-4">
                        Proyecto personal hecho para portafolio
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                        <a
                            href="https://www.linkedin.com/in/esteban-abanto/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/esteban.abanto.2709/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="https://github.com/esteban-abanto-2709"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </footer>
            </div>
        </GradientBackground>
    );
}

export default Landing;