import Link from 'next/link';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Witamy w aplikacji z zadaniami</h1>
      <p>Przejdź do <Link href="/Task1">Task 1</Link></p>
    </div>
  );
};

export default Home;
