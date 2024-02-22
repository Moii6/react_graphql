import React, { useEffect, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const Persons = ({ persons }) => {
  const FIND_PERSON = gql`
    query findPersonByName($nombre: String!) {
      findPerson(name: $nombre) {
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
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
      console.log(result);
    }
  }, [result]);

  if (person)
    return (
      <div>
        <h2>Nombre {person.name}</h2>
        <p>Telefono {person.phone}</p>
        <p>
          {person.address.street},{person.address.city}
        </p>
        <button onClick={() => setPerson(null)}>cerrar</button>
      </div>
    );

  return (
    <div>
      <h2>Personas</h2>
      {/**persons.map((p) => p.name).join(",")**/}
      {persons.map((p) => (
        <div
          key={p.id}
          onClick={() => {
            getPerson({ variables: { nombre: p.name } });
          }}
        >
          <p>
            {p.name} : <span>{p.phone}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
