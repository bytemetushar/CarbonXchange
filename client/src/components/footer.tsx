import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CarbonTrade</h3>
            <p className="text-gray-300 mb-4">
              The leading platform for transparent carbon credit trading and ESG compliance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/marketplace" className="hover:text-white transition-colors">
                  Browse Credits
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  List Credits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Verification
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Market Data
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ESG Reporting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carbon Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consulting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Live Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm">© 2024 CarbonTrade. All rights reserved.</div>
          <div className="flex space-x-6 text-sm text-gray-300 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
