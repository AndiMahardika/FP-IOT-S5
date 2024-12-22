import { useEffect, useState } from "react"

export default function useBathing() {
  const [bathinginfo, setBathinginfo] = useState([])

  async function fetchBathingInfo() {
    try {
      const response = await fetch('http://localhost:5000/api/bathings');
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari api/bathings');
      }
      const result = await response.json();
      setBathinginfo(result);

    } catch (error) {
      console.error('Error fetching bathing info:', error);
    }
  }  

  useEffect(() => {
    fetchBathingInfo();

    const interval = setInterval(() => {
      fetchBathingInfo();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
    
  return { bathinginfo }
}
