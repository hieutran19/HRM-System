import { Route, Routes } from 'react-router-dom';
import Layouts from '../components/Layouts/Layouts';
import Home from '../pages/Home/Home';
import Employee from '../pages/Employee/Employee';
import AddEmployee from '../pages/Employee/events/AddEmployee';
import DetailEmployee from '../pages/Employee/detail/DetailEmployee';
import EditEmployee from '../pages/Employee/events/EditEmployee';
import Contracts from '../pages/Contract/Contracts';
import { ContractDetail } from '../pages/Contract/detail/ContractDetail';
import Login from '../pages/Login/Login';
import RequireAuth from './RequiredAuth';
import University from '../pages/University/University';
import { UniversityDetail } from '../pages/University/detail/UniversityDetail';
import AuthCallback from '../pages/Oauth/AuthCallback';
import Events from '../pages/Events/Events';
import Authorize from '../components/authorize/Authorize';
import Unauthorized from '../pages/Unknown/Unauthorized';
import NotFound from '../pages/Unknown/NotFound';
import GoogleCallback from '../pages/Oauth/GoogleCallback';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<AuthCallback />} />
      <Route path="/google/callback" element={<GoogleCallback />} />
      <Route path="/" element={<Layouts />}>
        {/* ----------------Unknown------------ */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* ----------------home------------ */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          {/* ------------- employee------------- */}
          <Route
            path="/employee"
            element={
              <Authorize allowedPermission="read_employee" isRouter>
                <Employee />
              </Authorize>
            }
          />
          <Route
            path="/employee/create"
            element={
              <Authorize allowedPermission="create_employee" isRouter>
                <AddEmployee />
              </Authorize>
            }
          />
          <Route
            path="/employee/update/:id"
            element={
              <Authorize allowedPermission="update_employee" isRouter>
                <EditEmployee />
              </Authorize>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <Authorize allowedPermission="read_employee" isRouter>
                <DetailEmployee />
              </Authorize>
            }
          />
          {/* ------------- contract------------- */}
          <Route
            path="/contract"
            element={
              <Authorize allowedPermission="read_contract" isRouter>
                <Contracts />
              </Authorize>
            }
          />
          <Route
            path="/contract/:id"
            element={
              <Authorize allowedPermission="read_contract" isRouter>
                <ContractDetail />
              </Authorize>
            }
          />
          {/* ------------- university------------- */}
          <Route
            path="/university"
            element={
              <Authorize allowedPermission="read_university" isRouter>
                <University />
              </Authorize>
            }
          />
          <Route
            path="/university/:id"
            element={
              <Authorize allowedPermission="read_university" isRouter>
                <UniversityDetail />
              </Authorize>
            }
          />

          {/* ------------- event------------- */}
          <Route
            path="event"
            element={
              <Authorize allowedPermission="read_events" isRouter>
                <Events />
              </Authorize>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
