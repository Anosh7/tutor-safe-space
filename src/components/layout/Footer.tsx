
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-educational-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="text-xl font-montserrat font-bold text-educational-purple">
                TutorSafeSpace
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Privacy-First Educational Platform connecting students with tutors while protecting personal information.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/courses" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-base text-gray-600 hover:text-educational-purple hover-effect">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} TutorSafeSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
