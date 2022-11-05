/* eslint-disable react/jsx-key */
import React from 'react';
import type {
  Cell,
  Column,
  UseFiltersColumnProps,
  UseGlobalFiltersInstanceProps,
} from 'react-table';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import type { Transaction } from '../routes/dashboard/index';
import { formatCurrency } from '../utils/formatCurrency';

interface ColumnFilter {
  column: UseFiltersColumnProps<{}>;
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: ColumnFilter) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
      className="text-sm text-white bg-lime-600 outline-none focus:border-neutral-700 placeholder:text-gray-300 px-2 py-1 border rounded-md border-white"
    />
  );
}

interface GlobalFilterProps extends UseGlobalFiltersInstanceProps<{}> {
  globalFilter: any;
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: Partial<GlobalFilterProps>) {
  const count = preGlobalFilteredRows?.length;
  const [value, setValue] = React.useState(globalFilter);

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      setGlobalFilter?.(value || undefined);
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [setGlobalFilter, value]);

  return (
    <span className="mb-2">
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="border border-neutral-400 rounded-md ml-1 py-1 px-2 outline-none focus:border-lime-700"
      />
    </span>
  );
}

interface TableProps {
  columns: Column[];
  data: any;
}

function Table({ columns, data }: TableProps) {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    state,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      disableMultiSort: true,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div className="flex flex-col justify-between">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="min-h-full">
        <table {...getTableProps()} className="table-auto rounded-lg border-collapse w-full">
          <thead className="bg-lime-600 text-white py-2 text-lg text-left">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div>
                      <span {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length === 0 && <p className="my-2 text-center">No transactions to display.</p>}

      <div className="mt-2">
        <button
          className="p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          className="p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          className="p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          className="p-1 rounded-md bg-lime-600 font-bold text-white cursor-pointer"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '60px' }}
            className="border border-lime-600 rounded-md px-1 focus:border-lime-700 outline-none"
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: '',
        id: 'column-transactions',
        columns: [
          {
            Header: 'Beneficiary',
            accessor: 'beneficiary',
          },
          {
            Header: 'Amount',
            accessor: 'amount',
            disableFilters: true,
            Cell: ({ value }: Cell) => {
              return formatCurrency(value.value, value.currency);
            },
          },
          {
            Header: 'Date',
            accessor: 'date',
            disableFilters: true,
          },
          {
            Header: 'IBAN',
            accessor: 'iban',
          },
        ],
      },
    ],
    []
  );

  return <Table columns={columns} data={transactions} />;
};
