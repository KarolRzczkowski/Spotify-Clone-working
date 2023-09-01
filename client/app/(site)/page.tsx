import Header from '../components/Header';
import Firstpage from '../components/Firstpage';
import Slider from '../components/Slider'; // Importuj komponent Slider
export default function Home() {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header />
      <Firstpage />
      <Slider/>
    </div>
  );
}
