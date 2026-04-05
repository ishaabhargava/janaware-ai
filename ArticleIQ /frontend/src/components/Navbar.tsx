function Navbar() {
  return (
    <nav className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-wide text-blue-400">
          ArticleIQ 
        </h1>
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#home" className="hover:text-white">
            Home
          </a>
          <a href="#analyze" className="hover:text-white">
            Analyze
          </a>
          <a href="#about" className="hover:text-white">
            About
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar