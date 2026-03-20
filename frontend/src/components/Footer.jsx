function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-white text-xl font-bold mb-4">
            MockPrep
          </h3>
          <p className="text-sm">
            Practice smart. Track performance.
            Crack competitive exams with confidence.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">
            Exams
          </h4>
          <ul className="space-y-2 text-sm">
            <li>SSC CGL</li>
            <li>Banking</li>
            <li>Railways</li>
            <li>State Exams</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Mock Tests</li>
            <li>Practice Questions</li>
            <li>Performance Analytics</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>

      <div className="text-center py-4 border-t border-gray-700 text-sm">
        © {new Date().getFullYear()} MockPrep. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;