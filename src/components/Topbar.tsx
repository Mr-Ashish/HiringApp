import { FaBell, FaQuestionCircle } from "react-icons/fa";

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between h-16 px-8 bg-white border-b shadow-sm sticky top-0 z-20 ml-72">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 hover:text-blue-600 focus:outline-none">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
        </button>
        <button className="text-gray-500 hover:text-blue-600 focus:outline-none">
          <FaQuestionCircle size={20} />
        </button>
      </div>
    </header>
  );
}
