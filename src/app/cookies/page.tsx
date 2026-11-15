export default function CookiesPage() {
  return (
    <div className="bg-sand min-h-screen px-5 py-24 md:px-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-poster text-6xl md:text-8xl uppercase mb-12 text-ink">Cookie Policy</h1>
        <div className="prose prose-lg text-ink/80">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
          <p className="mb-6">Cookies are small text files stored on your device to help websites function properly and remember your preferences.</p>
          <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
          <p className="mb-6">We only use strictly necessary cookies to keep you logged into your client dashboard securely (authentication tokens). We do not use tracking or advertising cookies.</p>
        </div>
      </div>
    </div>
  );
}