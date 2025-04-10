import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Definicja interfejsu dla użytkownika
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Przykładowe dane
const users: User[] = [
  { id: 1, name: "Jan Kowalski", email: "jan@example.com", role: "admin" },
  { id: 2, name: "Anna Nowak", email: "anna@example.com", role: "user" },
  { id: 3, name: "Piotr Wiśniewski", email: "piotr@example.com", role: "user" },
  { id: 4, name: "Marta Lis", email: "marta@example.com", role: "moderator" }
];

// Funkcja Netlify
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Obsługa metody OPTIONS dla CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Content-Type": "application/json"
      },
      body: ""
    };
  }

  // Obsługa różnych metod HTTP
  try {
    switch (event.httpMethod) {
      case "GET":
        // Sprawdzenie, czy szukamy konkretnego użytkownika po ID
        const userId = event.queryStringParameters?.id;
        
        if (userId) {
          const user = users.find(u => u.id === parseInt(userId));

          if (!user) {
            return {
              statusCode: 404,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({ message: "Użytkownik nie został znaleziony" })
            };
          }

          return {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(user)
          };
        }

        // Zwróć wszystkich użytkowników
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(users)
        };

      case "POST":
        if (!event.body) {
          return {
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ message: "Brak danych użytkownika" })
          };
        }

        try {
          const userData = JSON.parse(event.body) as Omit<User, "id">;

          // Prosta walidacja
          if (!userData.name || !userData.email) {
            return {
              statusCode: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({ message: "Imię i email są wymagane" })
            };
          }

          // Utworzenie nowego użytkownika
          const newUser: User = {
            id: users.length + 1,
            ...userData
          };
          users.push(newUser);

          return {
            statusCode: 201,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(newUser)
          };
        } catch (error) {
          return {
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ message: "Nieprawidłowy format JSON" })
          };
        }

      default:
        return {
          statusCode: 405,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({ message: "Metoda nie dozwolona" })
        };
    }
  } catch (error) {
    console.error("Błąd funkcji:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ message: "Wystąpił błąd wewnętrzny serwera" })
    };
  }
};

export { handler };