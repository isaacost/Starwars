import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes Projeto Star Wars', () => {
  it('Testando se os filtros foram renderizados', () => {
    render(<App />);
    // testando a nova chave ssh

    const filterName = screen.getByTestId('name-filter');
    expect(filterName).toBeInTheDocument();

    const buttonFiltrar = screen.getByRole('button', { name: /filtar/i });
    expect(buttonFiltrar).toBeInTheDocument();

    const buttonOrdenar = screen.getByRole('button', { name: /ordenar/i });
    expect(buttonOrdenar).toBeInTheDocument();

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(1);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBe(3);
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(2);
  });
  it('Testando se a tabela de planetas renderiza', async () => {
    render(<App />);

    await waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()
     
      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas).toBeInTheDocument()
      })
    })
  });
  it('Testando a filtragem por nome', async () => {
    render(<App />);

    const filterName = screen.getByTestId('name-filter');
    userEvent.type(filterName, 'tatooine');

    await waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(1)
      })
    })
  })
  it('Testando filtro para population', async () => {
    render(<App />);
    const columFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    const buttonFiltrar = screen.getByRole('button', { name: /filtar/i });

    userEvent.selectOptions(columFilter, 'population');
    userEvent.selectOptions(compareFilter, 'maior que');
    userEvent.type(valueFilter, 1);
    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(8)
      })
    })
  });

  it('Testando filtro para orbital_period e diameter e botão excluir todos', async () => {
    render(<App />);
    const columFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    const buttonFiltrar = screen.getByRole('button', { name: /filtar/i });

    userEvent.selectOptions(columFilter, 'orbital_period');
    userEvent.selectOptions(compareFilter, 'menor que');
    userEvent.type(valueFilter, 500);
    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(7)
      })
    })
    userEvent.selectOptions(columFilter, 'diameter');
    userEvent.selectOptions(compareFilter, 'igual a');
    userEvent.type(valueFilter, 12500);
    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(1)
      })
    })

    const buttonExcluirTodos = screen.getByRole('button', {
      name: /excluir todos/i
    })

    expect(buttonExcluirTodos).toBeInTheDocument();

    userEvent.click(buttonExcluirTodos);

    await waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(10)
      })
    })
  });
  it('Testando filtro para rotation_period e surface_water e botão para excluir um filtro', () => {
    render(<App />);
    const columFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');

    const buttonFiltrar = screen.getByRole('button', { name: /filtar/i });

    userEvent.selectOptions(columFilter, 'rotation_period');
    userEvent.selectOptions(compareFilter, 'maior que');
    userEvent.type(valueFilter, 25);
    userEvent.click(buttonFiltrar);

    waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(2)
      })
    })
    userEvent.selectOptions(columFilter, 'surface_water');
    userEvent.selectOptions(compareFilter, 'maior que');
    userEvent.type(valueFilter, 50);
    userEvent.click(buttonFiltrar);

    waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(1);

      })
    })

    const buttonExcluir = screen.getByTestId('button-excluir-1');
    userEvent.click(buttonExcluir);

    waitFor(() => {
      const tabela = screen.getByTestId('tabela');
      expect(tabela).toBeInTheDocument()

      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(2);

      })
      const buttonExcluir0 = screen.getByTestId('button-excluir-0');
      userEvent.click(buttonExcluir0);
      waitFor(() => {
        const planetas = screen.getAllByTestId('planet-name');
        expect(planetas.length).toBe(10);
})
    })
  });
  it('Testando o botão ordenar', () => {
    render(<App />);

    const radios = screen.getAllByRole('radio');
    const buttonOrdenar = screen.getByRole('button', {
      name: /ordenar/i,
    });
    const columns = screen.getByTestId('column-sort');

    userEvent.selectOptions(columns, 'diameter');
    userEvent.click(buttonOrdenar);
    userEvent.click(radios[1]);
    userEvent.click(buttonOrdenar);

  })
});
