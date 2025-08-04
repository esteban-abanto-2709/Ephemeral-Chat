import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Link2, Users, Globe, Linkedin, Instagram, Github } from 'lucide-react';

import GradientBackground from '@/components/GradientBackground';

function Landing() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        if (!socket) return;

        socket.on('users:count', setUserCount);
        socket.emit('users:count:get');

        return () => {
            socket.off('users:count', setUserCount);
        };
    }, [socket]);

    return (
        <GradientBackground>

            <div className="flex flex-col min-h-dvh">

                <main className="flex-1 flex items-center justify-center px-6 sm:px-12">

                    <div className="text-center max-w-2xl mx-auto py-6 sm:py-12 overflow-y-auto max-h-[659px] sm:max-h-none">

                        <div className="mb-6">
                            <MessageCircle className="h-20 w-20 text-white mx-auto drop-shadow-lg" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                            Ephemeral Chat
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 font-light">
                            Un chat. Sin memoria.
                        </p>

                        <div className="space-y-4 mb-6">

                            <button
                                onClick={() => navigate('/chat/global')}
                                className="w-full max-w-sm h-14 px-6 text-base font-medium bg-white text-gray-800 hover:bg-gray-50 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center"
                            >
                                <Globe className="mr-3 h-5 w-5" />
                                Ingresar al chat global
                            </button>

                            <button
                                onClick={() => navigate('/chat/private/abcde')}
                                className="w-full max-w-sm h-14 px-6 text-base font-medium bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center backdrop-blur-sm"
                            >
                                <Link2 className="mr-3 h-5 w-5" />
                                Crear un enlace privado
                            </button>

                            <button
                                onClick={() => navigate('/chat/random/1234')}
                                className="w-full max-w-sm h-14 px-6 text-base font-medium bg-white/20 border border-white/30 text-white hover:bg-white/30 shadow-lg transition-all duration-200 hover:shadow-xl rounded-md inline-flex items-center justify-center backdrop-blur-sm"
                            >
                                <MessageCircle className="mr-3 h-5 w-5" />
                                Hablar con alguien al azar
                            </button>
                            
                        </div>

                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white shadow-lg mb-4">
                            <Users className="h-5 w-5 mr-2" />
                            <span className="font-medium">{userCount} usuarios conectados</span>
                        </div>

                    </div>

                </main>

                <footer className="text-center py-4 sm:py-6">

                    <p className="text-white/70 text-sm mb-3">
                        Proyecto personal hecho para portafolio
                    </p>

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
