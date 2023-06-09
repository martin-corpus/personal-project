import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import HiUserName from '../../components/hiUserName'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { getApplicationsByEmail } from '../../apiClient'

export default function UserNameBody() {
  const { user } = useAuth0()

  const [currentIndex, setCurrentIndex] = useState(0)
  const email = user?.email || ''

  const applicationsQuery = useQuery(['applications', email], () =>
    getApplicationsByEmail(email)
  )

  const applications = useMemo(
    () => applicationsQuery.data || [],
    [applicationsQuery.data]
  )
  const showArrows =
    applicationsQuery.data && Array.isArray(applicationsQuery.data)
      ? applications.length > 3
      : false

  useEffect(() => {
    const applicationboxes = document.querySelectorAll('.applicationbox')
    const boxesArray = Array.from(applicationboxes) as HTMLElement[]

    const showCurrentBoxes = () => {
      const startIndex = currentIndex * 3
      const endIndex = startIndex + 3

      boxesArray.forEach((box: HTMLElement, index: number) => {
        if (index >= startIndex && index < endIndex) {
          const applicationIndex = index - startIndex
          box.style.display = 'block'

          const imgElement = document.createElement('img')
          imgElement.src =
            applications[applicationIndex + startIndex]?.companyImage || ''
          imgElement.alt = 'Company Logo'
          imgElement.classList.add('applicationImage')

          box.innerHTML = ''
          box.appendChild(imgElement)
        } else {
          box.style.display = 'none'
        }
      })
    }

    const showNextBox = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex < Math.floor((boxesArray.length - 1) / 3) ? prevIndex + 1 : 0
      )
    }

    const showPreviousBox = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : Math.floor((boxesArray.length - 1) / 3)
      )
    }

    const leftArrow = document.querySelector('.leftArrow')
    const rightArrow = document.querySelector('.rightArrow')

    if (leftArrow) {
      leftArrow.addEventListener('click', showPreviousBox)
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', showNextBox)
    }

    if (applications.length > 0) {
      showCurrentBoxes()
    }

    return () => {
      if (leftArrow) {
        leftArrow.removeEventListener('click', showPreviousBox)
      }

      if (rightArrow) {
        rightArrow.removeEventListener('click', showNextBox)
      }
    }
  }, [currentIndex, applications])

  const [location, setLocation] = useState('')
  const [field, setField] = useState('')

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Location:', location)
    console.log('Field:', field)
  }

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocation(event.target.value)
  }

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setField(event.target.value)
  }

  return (
    <>
      <HiUserName />

      <div className="userApplicationsContainer">
        <h1 id="applications">Applications</h1>
        <div className="userApplications">
          {showArrows && (
            <div className="leftArrow">
              <i className="fa-solid fa-chevron-left"></i>
            </div>
          )}

          {applications.length > 0 ? (
            applications.map((application, index) => {
              return (
                <Link
                  to={`/home/applications/${application.id}`}
                  key={application.id}
                >
                  <div className="applicationbox" key={index}></div>
                </Link>
              )
            })
          ) : (
            <div className="applicationWarning">
              No applications at the moment
            </div>
          )}

          {showArrows && (
            <div className="rightArrow">
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          )}
        </div>
      </div>

      <div className="userSearchContainer">
        <h2 id="search">Search For Companies:</h2>

        <form onSubmit={handleFormSubmit}>
          <div className="userSearchParameters">
            <div className="searchLocation">
              <div className="location">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  className="dropdown"
                  value={location}
                  onChange={handleLocationChange}
                  aria-label="Select Location"
                >
                  <option value="" disabled hidden>
                    -- Select Location --
                  </option>
                  <option value="North Island - North">
                    North Island - North
                  </option>
                  <option value="North Island - Central">
                    North Island - Central
                  </option>
                  <option value="North Island - South">
                    North Island - South
                  </option>
                  <option value="South Island - North">
                    South Island - North
                  </option>
                  <option value="South Island - Central">
                    South Island - Central
                  </option>
                  <option value="South Island - South">
                    South Island - South
                  </option>
                </select>
              </div>
            </div>

            <div className="searchField">
              <div className="field">
                <label htmlFor="field">Field</label>
                <select
                  id="field"
                  className="dropdown"
                  value={field}
                  onChange={handleFieldChange}
                  aria-label="Select Field"
                >
                  <option value="" disabled hidden>
                    -- Select Field --
                  </option>
                  <option value="Software Development and Engineering">
                    Software Development/Engineering
                  </option>
                  <option value="Data Science and Analytics">
                    Data Science/Analytics
                  </option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Network Engineering">
                    Network Engineering
                  </option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Artificial Intelligence (AI) and Machine Learning (ML)">
                    Artificial Intelligence (AI) and Machine Learning (ML)
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="submitContainer">
            <Link to={`/home/search?location=${location}&field=${field}`}>
              <button className="searchSubmit">Submit</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
