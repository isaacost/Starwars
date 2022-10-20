import { useContext } from 'react';
import ContextTable from '../context/ContextTable';

function Table() {
  const { data, planeta } = useContext(ContextTable);

  return (
    <table border="1 px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Films</th>
          <th>Gravity</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Created</th>
          <th>Terrain</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {
          (data
            .filter((element) => element.name.toLowerCase()
              .includes(planeta.toLowerCase()))
            .map((element) => (
              <tr key={ element.name }>
                <td data-testid="planet-name">
                  {element.name}
                </td>
                <td>
                  {element.climate}
                </td>
                <td>
                  {element.diameter}
                </td>
                <td>
                  {element.edited}
                </td>
                <td>
                  {element.films.map((e, i) => (
                    <ul key={ i }>
                      <li>{e}</li>
                    </ul>
                  ))}
                </td>
                <td>
                  {element.gravity}
                </td>
                <td>
                  {element.orbital_period}
                </td>
                <td>
                  {element.population}
                </td>
                <td>
                  {element.rotation_period}
                </td>
                <td>
                  {element.surface_water}
                </td>
                <td>
                  {element.created}
                </td>
                <td>
                  {element.terrain}
                </td>
                <td>
                  {element.url}
                </td>
              </tr>
            )))
        }
      </tbody>
    </table>
  );
}

export default Table;
