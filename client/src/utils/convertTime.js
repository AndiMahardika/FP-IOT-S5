const optionsTime = {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false, // Format 24 jam
}

export default function convertTime(time) {
  return new Date(time).toLocaleString("id-ID", optionsTime)
}