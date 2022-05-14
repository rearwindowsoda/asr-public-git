# ASR Licznik

Aplikacja powstała po to, by ułatwić pracownikom firmy, w której obecnie pracuję, naliczanie sobie punktów za opracowane segmenty radiowe. Pracownicy mają możliwość zapisywać swoje punkty lokalnie do pamięci przeglądarki lub mogą też założyć konto i zapisywać punkty do bazy danych.

## Uruchomienie aplikacji

> Do uruchomienia potrzebujesz serwera Node w wersji 17. Konieczne jest też zainstalowanie wymaganych paczek (wskazanych w package.json). Możesz to zrobić za pomocą npm / yarn / pnpm.

1. Utwórz folder _utils_
2. Utwórz folder _db_ w folderze _utils_
3. Utwórz plik _db.js_ w folderze _db_
4. Zainicjuj połączenie z bazą danych _MongoDB_
5. W twojej bazie danych powinna znajdować się kolekcja o nazwie _users_

Przykład kodu umieszczonego w pliku ./utils/db/db.js

```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://CONNECT_TO_YOUR_DB');
const db = client.db('USER');
const users = db.collection('users');

module.exports = {
	MongoClient,
	client,
	db,
	users,
};
```

6. Utwórz plik _salt.js_ w folderze _utils_

Przykład kodu umieszczonego w pliku ./utils/salt.js

```javascript
const AUTH_SALT = 'YOUR_SALT_HERE';
module.exports = {
	AUTH_SALT,
};
```

7. Do zmiennej AUTH_SALT przypisz ciąg znaków, który będzie stanowił sól.

## **Uwaga!** Nie podawaj nikomu swojej soli i nie nigdzie jej nie wyświetlaj

Mateusz Owczarek

mat.owc@o2.pl
