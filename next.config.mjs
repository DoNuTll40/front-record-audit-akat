/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
  //   webpack(config) {
  //     // กำหนด fallback สำหรับ dependencies ที่ไม่ได้ใช้ใน SSR เช่น crypto
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false, // ปิดการใช้งาน fs สำหรับ client-side
  //       crypto: false, // เปิดให้สามารถใช้งาน crypto ในฝั่ง client
  //     };
  //     return config;
  //   },
  };
  
  export default nextConfig;
  
