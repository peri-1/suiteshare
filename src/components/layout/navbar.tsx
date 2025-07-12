export function Navbar() {
  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏟️</span>
            <span className="text-xl font-bold text-gray-900">SuiteShare</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Beta</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
