import React from "react";
import { 
    Brain, 
    Upload,
    FileText,
    AlertCircle,
    CheckCircle2,
    HelpCircle,
    Settings,
    X
  } from 'lucide-react';

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
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Dashboard
                        </a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Evaluations
                        </a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Reports
                        </a>
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
