# FocusKurs
Projekt bazowy utworzony dla kursu org. przez Focus Telecom, główne założenia tej wersji:

* Możliwe ograniczenie używania wersji ES5 Javascript.
* Możliwe ograniczenie wykorzystania biblioteki RxJS.

# Ficzery
* Zarówno backend jak i frontend zawarte są w ramach jednego środowiska współdzieją tym samym wspólnie node_modules.
* Aplikacja odpytuje serwer o status połączenia.
* Możliwość automatycznego wywołania dzwonienia po linku /call/(numer)
* Wykorzystanie routera (maksymalnie uproszczone)

# Uruchomienie
* Backend: node server.js
* Frontend: ng serve

# Co mozna poprawić:
Proste:

* odliczanie czasu w którym nawiazane zostanie połączenie (funkcja setInterval).
* Zmiana koloru wiadomości ze statusem (mozna uzyc isCallEnded w ringing component (tak jak to bylo przy walidacji numer) albo czegos bardziej złozonego)
* Zmiany stylistyczne całości, wyglada to brzydko jak chuj.

Nie trudne rzeczy:

* Poczytać o arrow functions w JS i zmienic te brzydkie funkcje gdzie uzywane jest var self = this; i dalej jest funkcja z self w then()  na wlasnie arrow functions - wtedy self nie będzie potrzebne.

Trudniejsze:

* Dodanie możliwości dzwonienia o wybranej godzinie i dacie (albo tylko godzinie) jakby ktoś porobil inne i czuł sie na siłach, pisać w tej sprawie do mnie


# Angular-Cli
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.
