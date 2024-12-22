import { useEffect, useState } from 'react';

export default function useCleaning() {
  const [cleaningData, setCleaningData] = useState({
    weight: 0,
    motionDetected: false,
    relayStatus: 'OFF',
    servoPosition: 0,
    time: '',
  });

  const [cleaningInfo, setCleaningInfo] = useState([]);

  // mengambil data dari `api/data`
  const fetchCleaningData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari api/data');
      }
      const result = await response.json();
      setCleaningData({
        weight: result.weight,
        motionDetected: result.motionDetected === 'true',
        relayStatus: result.relayStatus,
        servoPosition: result.servoPosition,
        time: result.time,
      });
    } catch (error) {
      console.error('Error fetching data from api/data:', error);
    }
  };

  // mengambil data dari `api/cleans`
  const fetchCleaningInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cleanings');
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari api/cleans');
      }
      const result = await response.json();
      setCleaningInfo(result);
    } catch (error) {
      console.error('Error fetching data from api/cleanings:', error);
    }
  };

  // pengambilan data secara berkala
  useEffect(() => {
    fetchCleaningData();
    fetchCleaningInfo();

    // pengambilan data `api/data` setiap 5 detik
    const dataInterval = setInterval(fetchCleaningData, 5000);

    // pengambilan data `api/cleanings` setiap 5 menit
    const cleansInterval = setInterval(fetchCleaningInfo, 5 * 60 * 1000);

    // Bersihkan interval saat komponen dibongkar
    return () => {
      clearInterval(dataInterval);
      clearInterval(cleansInterval);
    };
  }, []);

  return { cleaningData, cleaningInfo };
}
