import useCleaning from "../hooks/useCleaning.js"
import convertTime from "../utils/convertTime.js"

export default function DashboardCleaning() {
  const { cleaningInfo, cleaningData } = useCleaning()

  return (
    <div className='max-w-screen-sm min-h-screen bg-[#4FC284] p-5'>
      <h1 className="text-4xl text-white leading-relaxed font-bold text-center">BERSHIKAN KOTORAN</h1>

      <div className="bg-white rounded-lg px-4 py-8">
        <div className="h-[220px] overflow-y-auto border border-black">
        <table className="w-full table-auto border-collapse bg-[#4FC284]">
          <thead className="text-black sticky top-0">
            <tr className="text-xs border-b border-black ">
              <th className="p-2 text-left border-r border-black">Tanggal dibersihkan</th>
              <th className="p-2 text-center border-r border-black">Jam</th>
              <th className="p-2 text-center border-black">Info</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white">
            {cleaningInfo.length === 0 ? (
              <tr className="border-b border-black hover:bg-gray-100">
                <td className="p-2 text-left border-r border-black">-</td>
                <td className="p-2 text-center border-r border-black">-</td>
                <td className="p-2 text-center ">-</td>
              </tr>
            ) : (
              cleaningInfo.map((item, index) => (
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

        <div className="rounded-2xl border-2 border-black p-2 mt-10">
          <h3 className="text-sm font-normal ml-3">Berat Kotoran</h3>
          <div className="text-4xl flex justify-center w-full relative mt-3">
            <h4 className="mb-10 mr-10">{Math.floor(cleaningData.weight)} <span className="text-sm">gr</span></h4>
            <span className="h-20 w-1 bg-black absolute rotate-45"></span>
            <h4 className="mt-10">500 <span className="text-sm">gr</span></h4>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm text-center">NYALAKAN PEMBERSIH SECARA</p>

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
