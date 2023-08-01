import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white px-8 py-4">
          <h1 className="text-3xl font-bold">DevTime</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-between bg-gray-200 px-8 py-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 rounded-md px-4 py-2"
          />
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
            + New Project
          </button>
        </div>

        {/* Project Card List Section */}
        <div className="bg-gray-100 px-8 py-8">
          <p className="text-xl text-gray-600">Your project cards go here...</p>
        </div>
      </main>
    </>
  );
}
