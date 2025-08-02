import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Building Ephemeral Chat for production...');

try {
    // Instalar dependencias del servidor
    console.log('📦 Installing server dependencies...');
    execSync('npm install --include=dev', { stdio: 'inherit' });
    console.log('   ✓ Server dependencies installed');

    // Instalar dependencias del cliente
    console.log('📦 Installing client dependencies...');
    execSync('cd ../client && npm install --include=dev', { stdio: 'inherit' });
    console.log('   ✓ Client dependencies installed');

    // Limpiar builds anteriores
    console.log('🧹 Cleaning previous builds...');
    
    const serverDistDir = 'dist';
    if (fs.existsSync(serverDistDir)) {
        fs.rmSync(serverDistDir, { recursive: true });
        console.log('   ✓ Server dist cleaned');
    }

    // Build del cliente
    console.log('📦 Building client...');
    execSync('cd ../client && npm run build', { stdio: 'inherit' });
    console.log('   ✓ Client build completed');

    // Build del servidor
    console.log('🔧 Building server...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('   ✓ Server build completed');
    
    console.log('✅ Production build completed successfully!');
    console.log('📁 Ready for deployment!');
    console.log('');
    console.log('To test production build locally:');
    console.log('  npm run start:prod');
    
} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}