import Link from "next/link";

const Navbar = () => {
	return (
		<nav className='w-full bg-background border-b border-border px-4 py-3 flex items-center justify-between z-50 sticky top-0'>
			<div className='flex items-center gap-4'>
				<Link href='/' className='font-bold text-lg text-primary'>
					Quiz Builder
				</Link>
			</div>
			<div className='flex items-center gap-0.5 md:gap-4'>
				<Link
					href='/create'
					className='px-3 py-1.5 rounded transition-colors hover:bg-accent hover:text-accent-foreground text-foreground'
				>
					Create Quiz
				</Link>
				<Link
					href='/quizzes'
					className='px-3 py-1.5 rounded transition-colors hover:bg-accent hover:text-accent-foreground text-foreground'
				>
					Quizzes
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
