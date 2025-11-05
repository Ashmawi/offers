"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">حدث خطأ!</h1>
        <p className="text-gray-600 mb-6">
          عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
        </p>
        {error.message && (
          <p className="text-sm text-gray-500 mb-6 p-4 bg-gray-100 rounded-lg">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
}
