import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import Landing from '@/pages/Landing';
import GlobalChat from '@/pages/GlobalChat';
import PrivateChat from '@/pages/PrivateChat';
import RandomChat from '@/pages/RandomChat';

import { SocketContext } from '@/context/SocketContext';
const socket = io('http://localhost:3000'); // Cambia esto en producción

function App() {

	useEffect(() => {

		socket.on('connect', () => {
			console.log('[Socket] Connected with ID:', socket.id);
		});

		return () => {
			socket.off('connect');
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/chat/global" element={<GlobalChat />} />
					<Route path="/chat/private/*" element={<PrivateChat />} />
					<Route path="/chat/random/*" element={<RandomChat />} />
				</Routes>
			</Router>
		</SocketContext.Provider>
	);
}

export default App;