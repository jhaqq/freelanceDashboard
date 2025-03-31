import { BoltIcon } from "@heroicons/react/24/solid"
import NavLinks from "./dashboard/nav-links"

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="h-20 md:h-30 mb-2 flex items-end justify-start rounded-md bg-[#FFBF1F] p-4">
        <BoltIcon className="h-20 w-20 text-white font-bold" />
        <h3 className="text-4xl text-white py-4">
          TwoQ!
        </h3>
      </div>
      <div className="flex grow flex-rwo justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  )
}
