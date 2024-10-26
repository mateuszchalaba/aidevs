import { useState } from 'react';

const Task1 = () => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      // Krok 1: Pobierz dane z pliku dane.txt
      const dataResponse = await fetch('https://poligon.aidevs.pl/dane.txt');
      const dataText = await dataResponse.text();

      // Załóżmy, że dane w pliku są oddzielone spacjami lub nowymi liniami
      const stringsArray = dataText.trim().split(/\s+/);

      if (stringsArray.length < 2) {
        setMessage('Błąd: Nie można znaleźć dwóch ciągów znaków');
        return;
      }

      // Krok 2: Wyślij POST request z tymi danymi
      const response = await fetch('https://poligon.aidevs.pl/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: 'POLIGON',
          apikey: process.env.NEXT_PUBLIC_KEY, // Podaj tutaj swój klucz API
          answer: stringsArray.slice(0, 2), // Używamy pierwszych dwóch ciągów
        }),
      });

      const result = await response.json();

      // Wyświetl wynik na stronie
      if (response.ok) {
        setMessage(`Kod: ${result.code}, Wiadomość: ${result.message}`);
      } else {
        setMessage(`Błąd: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Wystąpił błąd: ${error instanceof Error ? error.message : 'Nieznany błąd'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Task 1: Pobierz i wyślij dane</h1>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Przetwarzanie...' : 'Pobierz i wyślij'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Task1;
