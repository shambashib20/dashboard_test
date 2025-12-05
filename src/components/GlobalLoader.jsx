

export default function GlobalLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">

                {/* Rotating Glow Ring */}
                <div className="absolute w-28 h-28 rounded-full border-4 border-[#003b8e]/20 border-t-[#003b8e] animate-spin"></div>

                {/* Logo */}
                <img
                    src="../assets/fab.png"
                    alt="Loading..."
                    className="w-16 h-16 animate-pulse drop-shadow-md"
                />

            </div>
        </div>
    );
}
