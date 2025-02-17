import { 
    Brain
  } from 'lucide-react';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Brain className="w-8 h-8 text-indigo-600" />
                        <span className="text-xl font-semibold">Smart Grade</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link to={'home'} className="text-gray-600 hover:text-indigo-600">
                        Dashboard
                        </Link>
                        <Link to={'login'} className="text-gray-600 hover:text-indigo-600">
                        Login
                        </Link>
                        <Link to={'signup'} className="text-gray-600 hover:text-indigo-600">
                        Sign Up
                        </Link>
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Settings
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
