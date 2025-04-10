import { Handler, HandlerEvent, HandlerContext, HandlerResponse } from "@netlify/functions";

// Removed custom HandlerResponse type as it conflicts with the @netlify/functions package

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Sample data
const users: User[] = [
  { id: 1, name: "Jan Kowalski", email: "jan@example.com", role: "admin" },
  { id: 2, name: "Anna Nowak", email: "anna@example.com", role: "user" },
  { id: 3, name: "Piotr Wiśniewski", email: "piotr@example.com", role: "user" },
  { id: 4, name: "Marta Lis", email: "marta@example.com", role: "moderator" }
];

// Helper function for safe JSON parsing
const safeJsonParse = (str: string | null): any => {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
};

// Netlify function
const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  // Check environment and debug
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Event:", {
    path: event.path,
    httpMethod: event.httpMethod,
    headers: event.headers,
    queryStringParameters: event.queryStringParameters || {}
  });

  // Handle OPTIONS method for CORS preflight
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

  try {
    switch (event.httpMethod) {
      case "GET":
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
          const userData = safeJsonParse(event.body);
          
          if (!userData) {
            return {
              statusCode: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              },
              body: JSON.stringify({ message: "Nieprawidłowy format JSON" })
            };
          }

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

          const newUser: User = {
            id: users.length + 1,
            name: userData.name,
            email: userData.email,
            role: userData.role || "user"
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
          console.error("Error processing POST:", error);
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
      body: JSON.stringify({ 
        message: "Wystąpił błąd wewnętrzny serwera",
        error: error instanceof Error ? error.message : String(error)
      })
    };
  }
};

export { handler };