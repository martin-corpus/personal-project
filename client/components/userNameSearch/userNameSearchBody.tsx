import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Companies } from '../../../models/companies'
import { getCompaniesByLocation, getCompaniesByField } from '../../apiClient'
import HiUserName from '../../components/hiUserName'

export default function UserNameSearchBody() {
  const [locationCompanies, setLocationCompanies] = useState([] as Companies[])
  const [fieldCompanies, setFieldCompanies] = useState([] as Companies[])
  const [searchParams] = useSearchParams()
  console.log(locationCompanies)
  useEffect(() => {
    async function fetchCompanies() {
      try {
        if (searchParams.get('location')) {
          const locationCompanies = await getCompaniesByLocation(
            searchParams.get('location') as string
          )
          console.log('Location Companies:', locationCompanies)
          setLocationCompanies(locationCompanies)
        }
        if (searchParams.get('field')) {
          const fieldCompanies = await getCompaniesByField(
            searchParams.get('field') as string
          )
          console.log('Field Companies:', fieldCompanies)
          setFieldCompanies(fieldCompanies)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanies()
  }, [searchParams])

  return (
    <>
      <HiUserName />

      <div className="searchResultsContainer">
        <div className="searchResultsSection">
          <h1 id="searchResultsTitle">By Location</h1>
          <div className="searchResultsRow">
            {locationCompanies.map(({ image, name, vacancies }, index) => (
              <div
                className={`companybox ${vacancies ? 'withVacancies' : ''}`}
                key={index}
              >
                <Link to={`/company?name=${name}`}>
                  <img src={image} alt={name} className="companyImage" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="searchResultsContainer">
        <div className="searchResultsSection">
          <h1 id="searchResultsTitle">By Field</h1>
          <div className="searchResultsRow">
            {fieldCompanies.map(({ image, name, vacancies }, index) => (
              <div
                className={`companybox ${vacancies ? 'withVacancies' : ''}`}
                key={index}
              >
                <Link to={`/company?name=${name}`}>
                  <img src={image} alt={name} className="companyImage" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
