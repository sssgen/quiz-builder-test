import { Button } from "@/components/ui/button";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const Home = () => {
	return (
		<div
			className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 gap-16 sm:p-20`}
		>
			<main>Quiz App</main>
			<Link href='/quizzes'>
				<Button className='cursor-pointer'>To quiz page {"->"}</Button>
			</Link>
		</div>
	);
};

export default Home;
