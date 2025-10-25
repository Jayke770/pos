/// <reference types="@capawesome/capacitor-android-edge-to-edge-support" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.master.pos',
  appName: 'Freetoh',
  webDir: 'out',
  appendUserAgent: "master",
  server: {
    cleartext: true,
    url: "http://192.168.1.13:3000"
  },
  plugins: {
    EdgeToEdge: {
      backgroundColor: "#ffffff",
    },
  },
};

export default config;
