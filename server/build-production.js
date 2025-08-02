import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Building Ephemeral Chat for production...');

try {
    // 1. Limpiar builds anteriores
    console.log('🧹 Cleaning previous builds...');
    
    const serverDistDir = 'dist';
    if (fs.existsSync(serverDistDir)) {
        fs.rmSync(serverDistDir, { recursive: true });
        console.log('   ✓ Server dist cleaned');
    }

    // 2. Build del cliente
    console.log('📦 Building client...');
    execSync('cd ../client && npm run build', { stdio: 'inherit' });
    console.log('   ✓ Client build completed');
    
    // 3. Build del servidor
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