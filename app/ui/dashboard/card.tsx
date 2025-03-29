
export default async function Card({ title, value } : { title: string, value: number | string }) {
    return (
      <div className="rounded-xl bg-gray-50 p-2">
        <h3 className="text-md ml-2 p-2">{title}</h3>
        <p className="bg-white rounded-xl text-center truncate text-2xl px-4 py-8">
          {value}
        </p>
      </div>
    )
  }