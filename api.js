const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      return Promise.reject({ message: error.message });
    }
  }
}

export async function createTodo(todo, signal) {
  const url = `${API_BASE_URL}/todos`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: todo }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function listTodos(signal) {
  return [];
}
