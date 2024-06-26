import classNames from "classnames";
import Pagination from "components/Pagination";
import UserTable from "components/UserTable";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setCurrentPage, setSearchValue } from "../redux/slices/adminFilterSlice";
import { fetchUsers } from "../redux/slices/adminSlice";
import AddUser from "components/AddUser";
import Search from "components/Search";
import { useAuth } from "hooks/useAuth";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, amountPages } = useSelector(({ admin }) => admin);
  const { searchValue, currentPage } = useSelector(
    ({ adminFilter }) => adminFilter
  );
  const {role} = useAuth();

  useEffect(() => {
    updateTable();
  }, [searchValue, currentPage]);

  // Очистка фильтров после удаления компонента
  useEffect(() => {
    return () => dispatch(resetFilters());
  }, []);

  const setSearch = (value) => dispatch(setSearchValue(value));

  const updateTable = () => {
    dispatch(
      fetchUsers({
        searchValue,
        page: currentPage,
      })
    );
  };


  return (
    <div>
      <h2 className="mb-3">Список сотрудников</h2>
      <div className="filters">
        {role == "Director" || <AddUser updateTable={updateTable} />}
        <Search
          setSearchValue={setSearch}
          placeholder="Поиск пользователя по ФИО.."
        />
      </div>
      <UserTable role={role} items={users} status={status} />
      {amountPages < 2 ? (
        ""
      ) : (
        <Pagination
          currentPage={currentPage}
          amountPages={amountPages}
          setCurrentPage={(page) => dispatch(setCurrentPage(page))}
        />
      )}
    </div>
  );
};

export default UserList;
