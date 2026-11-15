export default function PrivacyPage() {
  return (
    <div className="bg-sand min-h-screen px-5 py-24 md:px-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-poster text-6xl md:text-8xl uppercase mb-12 text-ink">Privacy Policy</h1>
        <div className="prose prose-lg text-ink/80">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="mb-6">We only collect information you voluntarily provide to us through our contact forms and client dashboard, such as your name, email address, and project details.</p>
          <h2 className="text-2xl font-bold mb-4">2. How We Use It</h2>
          <p className="mb-6">We use your information strictly to communicate with you regarding your project inquiries and to deliver our services. We do not sell your data to third parties.</p>
          <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
          <p className="mb-6">We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
        </div>
      </div>
    </div>
  );
}