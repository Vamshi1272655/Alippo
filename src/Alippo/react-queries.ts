import { useQuery } from "react-query";

export function TableDetails() {
  return useQuery("alippoTableDetails", async () => {
    const response = await fetch(
      "https://assets.alippo.com/catalog/static/data.json"
    );
    const data = await response.json();
    console.log(response);
    return data;
  });
}
