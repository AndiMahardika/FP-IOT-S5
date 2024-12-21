import { useState, useEffect } from 'react';

function Dashboard() {
  // State untuk data yang diterima dari API
  const [weight, setWeight] = useState(0);
  const [motionDetected, setMotionDetected] = useState(false);
  const [relayStatus, setRelayStatus] = useState('OFF');
  const [servoPosition, setServoPosition] = useState(0);
  const [time, setTime] = useState('');

  // Gunakan useEffect untuk mengambil data dari API saat komponen dimuat
  useEffect(() => {
    // Fungsi untuk mengambil data dari backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();
        
        // Menyimpan data dari API ke dalam state React
        setWeight(data.weight);
        setMotionDetected(data.motionDetected === 'true'); // Pastikan format boolean
        setRelayStatus(data.relayStatus);
        setServoPosition(data.servoPosition);
        setTime(data.time);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Panggil fungsi fetchData setiap kali komponen dimuat
    fetchData();

    // Opsi untuk menyegarkan data setiap 5 detik (sesuaikan sesuai kebutuhan)
    const intervalId = setInterval(fetchData, 5000); // refresh setiap 5 detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen dibersihkan
  }, []); // Hanya dijalankan sekali setelah komponen dimuat

  return (
    <div>
      <h1>Monitoring Kandang Burung</h1>
      <div>
        <p>Waktu: {time}</p>
        <p>Berat Pakan: {weight} kg</p>
        <p>Gerakan Terdeteksi: {motionDetected ? 'Ya' : 'Tidak'}</p>
        <p>Relay Status: {relayStatus}</p>
        <p>Posisi Servo: {servoPosition}°</p>
      </div>
    </div>
  );
}

export default Dashboard;