import UserName from './components/userName/userName'
import UserNameSearch from './components/userNameSearch/userNameSearch'
import CompanyPage from './components/companyPage/companyPage'
import VacancyPage from './components/vacanciesPage/vacancyPage'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App'

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/username" element={<UserName />} />
      <Route path="/username/search" element={<UserNameSearch />} />
    <Route path="/company" element={<CompanyPage />} />  
    <Route path="/vacancies/:id" element={<VacancyPage />} />
    <Route path="/" element={<App />} />
  
    
  </Route>
)

export const router = createBrowserRouter(routes)