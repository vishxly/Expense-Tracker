import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddExpense = (expense: any) => {
    // Implement logic to add expense
  };

  const expenses: never[] = []; // Replace this with actual expenses data

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <ProtectedRoute path="/expenses" expenses={expenses} onAddExpense={handleAddExpense} />
        </Switch>
      </div>
    </Router>
  );
};

const ProtectedRoute: React.FC<any> = ({ children, ...rest }) => {
  const isAuthenticated = false; // Implement logic to check authentication

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default App;
