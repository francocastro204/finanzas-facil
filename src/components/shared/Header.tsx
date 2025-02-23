'use client';

import Link from "next/link";

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
				<Link href="/" className="text-xl font-bold">
					Finanzas Fácil
				</Link>
			</nav>
		</header>
	);
};

export default Header;
