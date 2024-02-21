import React, { useRef } from 'react'

import Button from '../../components/Button/Button'

import './CreatePrescription.scss'

export default function CreatePrescription() {
  const getTodaysDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const nameRef = useRef(null)
  const addressRef = useRef(null)
  const cityRef = useRef(null)
  const phoneRef = useRef(null)

  const genderRef = useRef(null)
  const patientSNameRef = useRef(null)
  const patientFNameRef = useRef(null)
  const ageRef = useRef(null)
  const weightRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      docName: nameRef.current.value,
      docAddress: addressRef.current.value,
      docCityAndZipCode: cityRef.current.value,
      docPhone: phoneRef.current.value,
      patientGender: genderRef.current.value,
      patientSName: patientSNameRef.current.value,
      patientFName: patientSNameRef.current.value,
      patientAge: ageRef.current.value,
      patientWeight: weightRef.current.value,
      generationDate: getTodaysDate(new Date()),
    }

    console.log(formData)

    try {
      const response = await fetch('http://localhost:5050/new-prescription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      console.log('Form submitted successfully')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="prescription">
      <h1>Nouvelle ordonnance</h1>
      <form>
        <div className="prescription__doc">
          <h2>Vos informations</h2>
          <input
            type="text"
            placeholder="Votre nom"
            id="name"
            autoComplete="name"
            ref={nameRef}
          />
          <input
            type="text"
            placeholder="Votre adresse"
            id="address"
            autoComplete="address"
            ref={addressRef}
          />
          <input
            type="text"
            placeholder="Votre ville et code postal"
            id="city"
            ref={cityRef}
          />
          <input
            type="text"
            placeholder="Votre numéro de téléphone"
            id="phone"
            autoComplete="phone"
            ref={phoneRef}
          />
        </div>
        <div className="prescription__patient">
          <h2>Informations du patient</h2>
          <select name="gender" id="gender-select" ref={genderRef}>
            <option value="Madame">Madame</option>
            <option value="Monsieur">Monsieur</option>
          </select>
          <input
            type="text"
            placeholder="Nom du patient"
            id="patientName"
            ref={patientSNameRef}
          />
          <input
            type="text"
            placeholder="Prénom du patient"
            id="patientFName"
            ref={patientFNameRef}
          />
          <input
            type="number"
            placeholder="Âge du patient"
            id="patientAge"
            ref={ageRef}
          />
          <input
            type="number"
            placeholder="Poids du patient (en kg)"
            id="patientWeight"
            ref={weightRef}
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="primary"
          label="Générer"
        />
      </form>
    </div>
  )
}
