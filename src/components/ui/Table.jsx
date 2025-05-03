import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-200">
      {columns.map((column) => (
        <div key={column.dataIndex} className="flex-1 text-center font-bold">
          {column.title}
        </div>
      ))}
    </div>
  );
};

const Table = ({
  columns,
  dataSource,
  rowKey,
  loading,
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}) => {
  return (
    <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-100">
          <TableHeader columns={columns} />
        </tr>
      </thead>
      <tbody className="bg-white">
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              Loading...
            </td>
          </tr>
        ) : (
          dataSource.map((item) => (
            <tr key={item[rowKey]} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.dataIndex} className="text-center py-2">
                  {item[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
