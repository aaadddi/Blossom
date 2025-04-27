import Navbar from '@/Components/Navbar';
import ProposalDisplay from '@/Components/proposal/proposalDisplay';

function HomeContent() {

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Proposals</h2>
          <ProposalDisplay />
        </>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <HomeContent />
  );
}
