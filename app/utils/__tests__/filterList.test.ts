type Movement = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  account: string;
  pending: boolean;
};

type Sorted = "date" | "amount";

type FilterParams = {
  data: Movement[];
  searchText: string;
  category: string;
  sort: Sorted;
  direction: "ASC" | "DESC";
};

export function getFilteredList({
  data,
  searchText,
  category,
  sort,
  direction,
}: FilterParams): Movement[] {
  if (!data) return [];

  let result = [...data.filter((item) => !item.pending)];

  if (searchText.trim()) {
    result = result.filter((m) =>
      m.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (category !== "Todas") {
    result = result.filter((m) => m.category === category);
  }

  if (sort === "amount") {
    result.sort((a, b) =>
      direction === "DESC" ? b.amount - a.amount : a.amount - b.amount
    );
  } else {
    result.sort((a, b) =>
      direction === "DESC"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  return result;
}

const mockData = [
  {
    id: "1",
    description: "Café Starbucks",
    amount: 5,
    date: "2024-01-01",
    category: "Comida",
    account: "ES4851...0124",
    pending: false,
  },
  {
    id: "2",
    description: "Supermercado",
    amount: 50,
    date: "2024-01-02",
    category: "Comida",
    account: "ES4851...0124",
    pending: false,
  },
  {
    id: "3",
    description: "Netflix",
    amount: 10,
    date: "2024-01-03",
    category: "Entretenimiento",
    account: "ES4851...0124",
    pending: true,
  },
];

describe("getFilteredList", () => {
  it("filtra por texto de búsqueda", () => {
    const result = getFilteredList({
      data: mockData,
      searchText: "super",
      category: "Todas",
      sort: "date",
      direction: "ASC",
    });
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe("Supermercado");
  });

  it("filtra por categoría", () => {
    const result = getFilteredList({
      data: mockData,
      searchText: "",
      category: "Comida",
      sort: "date",
      direction: "ASC",
    });
    expect(result.every((m) => m.category === "Comida")).toBe(true);
  });

  it("ordena por importe DESC", () => {
    const result = getFilteredList({
      data: mockData,
      searchText: "",
      category: "Todas",
      sort: "amount",
      direction: "DESC",
    });
    expect(result[0].amount).toBe(50);
  });
});
