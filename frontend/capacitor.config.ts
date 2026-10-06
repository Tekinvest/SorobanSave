import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sorobansave.app',
  appName: 'SorobanSave',
  webDir: 'dist',
  server: {
    // Allow navigation to external URLs (for web fallback)
    allowNavigation: ['sorobansave.app', '*.sorobansave.app'],
  },
};

export default config;
