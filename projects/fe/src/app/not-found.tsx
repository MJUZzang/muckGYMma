import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className="border-2 px-2 py-1 rounded-full">
                Return Home
            </Link>
        </div>
    );
}
