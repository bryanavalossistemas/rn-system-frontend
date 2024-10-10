export default function MainView() {
  return (
    <main className="flex-1 flex justify-center items-center bg-[url('/hero.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <h1 className="text-7xl text-white font-bold relative z-10 p-4 bg-black bg-opacity-60 rounded-lg shadow-lg select-text">
        R&N SYSTEM
      </h1>
    </main>
  );
}
