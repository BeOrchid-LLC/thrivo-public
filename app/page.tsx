export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">
          Weight loss that actually works.
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          No tricks, no fake coaches. Just honest pricing at $14.99/month.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            Download on App Store
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            Get it on Google Play
          </button>
        </div>
      </section>
    </main>
  );
}
