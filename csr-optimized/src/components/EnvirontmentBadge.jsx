export default function EnvironmentBadge({ mode = "Unknown" }) {
    return (
        <div className="fixed bottom-0 right-0 z-50 bg-primary text-white text-xs sm:text-sm px-3 py-1 rounded-tl-xl shadow-md opacity-90 pointer-events-none">
            {mode}
        </div>
    );
}
