import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import Persons from "./Persons";

function App() {
  const All_PERSONS = gql`
    query {
      allPersons {
        id
        name
        phone
        address {
          street
          city
        }
      }
    }
  `;

  const { data, error, loading } = useQuery(All_PERSONS);
  console.log(data?.allPersons);
  if (error) return <span style="color:red">{error}</span>;
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      {loading ? (
        <p>Loading data</p>
      ) : (
        <div>
          <h1>Grapql + React</h1>
          <Persons persons={data?.allPersons} />
        </div>
      )}
    </div>
  );
}

export default App;
