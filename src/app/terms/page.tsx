export default function TermsPage() {
  return (
    <div className="bg-sand min-h-screen px-5 py-24 md:px-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-poster text-6xl md:text-8xl uppercase mb-12 text-ink">Terms & Conditions</h1>
        <div className="prose prose-lg text-ink/80">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-2xl font-bold mb-4">1. Services</h2>
          <p className="mb-6">MMK provides AI-powered marketing and creative design services. All project scopes, timelines, and deliverables will be agreed upon in writing prior to commencement.</p>
          <h2 className="text-2xl font-bold mb-4">2. Intellectual Property</h2>
          <p className="mb-6">Upon full payment, the final deliverables provided to the client become their intellectual property. MMK retains the right to display the work in our portfolio unless otherwise agreed.</p>
          <h2 className="text-2xl font-bold mb-4">3. Limitation of Liability</h2>
          <p className="mb-6">MMK shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.</p>
        </div>
      </div>
    </div>
  );
}