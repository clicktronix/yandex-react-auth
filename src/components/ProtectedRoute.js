import React from 'react';
import { Route, Redirect } from "react-router-dom";

// Мы переименовываем пропс component в Component,
// потому что в jsx все компоненты должны называться с большой буквы
const ProtectedRoute = ({ component: Component, ...props }) => {
  // В этом компоненте мы смотрим на пропс loggedIn
  // Если он равен true, то мы даем доступ к компоненту, который находится в пропсе component
  // Если он равен false, то редиректим пользователя на страницу логина
  return (
    <Route>
      {
        () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="./login" />
      }
    </Route>
  )
}

export default ProtectedRoute;