import { useEffect, useState } from "react";
import "./App.css";
import { Users } from "./users";
import Table from "./Table";
import axios from "axios";
import useSWR from "swr";
import debounce from "debounce";

// const fetcher = (url) => fetch(url).then((res) => res.json());
const fetcher = (url) => axios(url).then((res) => res.data);

function App() {
  const [query, setQuery] = useState("");
  // const [data, setData] = useState([]);

  console.log(query);

  if (query.length > 2) {
    fetcher();
  }

  const keys = ["first_name", "last_name", "email"];

  console.log(Users[0]["email"]);

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query))
  //   );
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`http://localhost:3003?q=${query}`);
  //     setData(res.data);
  //   };
  //   if (query.length === 0 || query.length > 2) fetchData();
  // }, [query]);

  const { data, error, isLoading } = useSWR(
    `http://localhost:3003?q=${query}`,
    query.length === 0 || query.length > 2 && fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  console.log(data);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <ul>
        {Users.filter((user) =>
          user.first_name.toLowerCase().includes(query)
        ).map((user) => (
          <li key={user.id}>{uszzer.first_name}</li>
        ))}
      </ul> */}
      <Table data={data} />
    </div>
  );
}

export default App;
