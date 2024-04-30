export default function Loading() {
    return <div className="flex w-screen justify-center items-center h-screen w-screen relative">
        <div className="absolute bg-gray opacity-50"></div>
        <div className="spinner z-10 relative"></div>
    </div>
}