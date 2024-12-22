import useBathing from "../hooks/useBathing.js"
import convertTime from "../utils/convertTime.js"

export default function DashboardBath() {
  const { bathinginfo } = useBathing()

  return (
    <div className='max-w-screen-sm min-h-screen bg-[#4FC284] p-5'>
      <h1 className="text-4xl text-white leading-relaxed font-bold text-center">MANDIKAN BURUNG</h1>

      <div className="bg-white rounded-lg px-4 py-8">
        {/* Tabel riwayat start */}
        <div className="h-[220px] overflow-y-auto border border-black">
          <table className="w-full table-auto border-collapse bg-[#4FC284]">
            <thead className="text-black sticky top-0">
              <tr className="text-xs border-b border-black ">
                <th className="p-2 text-left border-r border-black">Tanggal dimandikan</th>
                <th className="p-2 text-center border-r border-black">Jam</th>
                <th className="p-2 text-center border-black">Info</th>
              </tr>
            </thead>
            <tbody className="text-sm bg-white">
              {bathinginfo.length === 0 ? (
                <tr className="border-b border-black hover:bg-gray-100">
                  <td className="p-2 text-left border-r border-black">-</td>
                  <td className="p-2 text-left border-r border-black">-</td>
                  <td className="p-2 text-left ">-</td>
                </tr>
              ) : (
                bathinginfo.map((item, index) => (
                  <tr key={index} className="border-b border-black hover:bg-gray-100">
                    <td className="p-2 text-left border-r border-black">{item.date}</td>
                    <td className="p-2 text-center border-r border-black">{convertTime(item.time)}</td>
                    <td className="p-2 text-center ">{item.info}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Tabel riwayat end */}

        {/* Tabel jadwal start */}
        <table className="w-full table-auto border-collapse border border-black mt-10">
          <thead className="text-black">
            <tr className="text-xs border-b border-black ">
              <th className="p-2 text-left border-r border-black">Setting Jadwal Mandi</th>
              <th  className="p-2 text-left border-black" >Jam</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white">
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Minggu</td>
              <td className="p-2 text-left border-r border-black">08:00</td>
            </tr>
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Senin</td>
              <td className="p-2 text-left border-r border-black">15:00</td>
            </tr>
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Selasa</td>
              <td className="p-2 text-left border-r border-black">08:00</td>
            </tr>
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Rabu</td>
              <td className="p-2 text-left border-r border-black">15:00</td>
            </tr>
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Kamis</td>
              <td className="p-2 text-left border-r border-black">08:00</td>
            </tr>
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Jumat</td>
              <td className="p-2 text-left border-r border-black">15:00</td>
            </tr>
            <tr className="border-b border-black hover:bg-gray-100">
              <td className="p-2 text-left border-r border-black">Sabtu</td>
              <td className="p-2 text-left border-r border-black">08:00</td>
            </tr>
          </tbody>
        </table>
        {/* Tabel jadwal end */}

        <div className="mt-10">
          <p className="text-sm text-center">NYALAKAN POMPA SECARA</p>

          <div className="flex justify-between mt-5">
            <div>
              <p className="text-sm text-center">MANUAL</p>
              <button className="bg-red-600 text-white py-2 px-8 rounded-xl">OFF</button>
            </div>

            <div>
              <p className="text-sm text-center">AUTO</p>
              <button className="bg-blue-600 text-white py-2 px-8 rounded-xl">ON</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
