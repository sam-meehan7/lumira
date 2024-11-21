import * as React from "react";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { NavAuth } from "./nav-auth";

export function NavBar({ user }: { user: object | null }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2">
            <VideoCameraIcon className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold">Lumira</span>
          </a>
        </div>
        <nav className="ml-8">
          <ul className="flex space-x-4">
            {user && (
              <li>
                <a href="library" className="text-gray-600 hover:text-gray-900">
                  Video Library
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="ml-auto">
          <NavAuth user={user} />
        </div>
      </div>
    </header>
  );
}
