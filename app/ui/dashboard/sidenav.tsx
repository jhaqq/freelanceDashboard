import NavLinks from "./nav-links"

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="h-20 md:h-40 mb-2 flex items-end justify-center rounded-md bg-blue-600 p-4">
        <h3 className="text-2xl text-white p-4">
          Logo
        </h3>
      </div>
      <div className="flex grow flex-rwo justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  )
}
