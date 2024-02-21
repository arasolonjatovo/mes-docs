import React, { useRef, useState } from 'react'

import { IoMdTrash } from 'react-icons/io'

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

  const dosageRef = useRef(null)
  const medicationRef = useRef(null)
  const instructionRef = useRef(null)

  const [medications, setMedications] = useState([])

  const handleDelete = (index) => {
    const updatedMedications = [...medications]
    updatedMedications.splice(index, 1)
    setMedications(updatedMedications)
  }

  const handleMedication = (event) => {
    event.preventDefault()
    const newMedication = {
      medication: medicationRef.current.value,
      dosage: dosageRef.current.value,
      instruction: instructionRef.current.value,
    }
    setMedications([...medications, newMedication])
    medicationRef.current.value = null
    dosageRef.current.value = null
    instructionRef.current.value = null
  }

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
      prescriptions: medications,
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
        <div className="prescription__leftPart">
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
              min={1}
            />
            <input
              type="number"
              placeholder="Poids du patient (en kg)"
              id="patientWeight"
              ref={weightRef}
              min={1}
            />
          </div>
        </div>
        <div className="prescription__rightPart">
          <div className="prescription__list">
            <div className="prescription__medicationsList">
              <h2>Votre prescription</h2>
              <input
                type="text"
                placeholder="Nom du médicament"
                id="medication-name"
                ref={medicationRef}
              />
              <input
                type="number"
                placeholder="Dosage (en mg)"
                min={1}
                id="medication-dosage"
                ref={dosageRef}
              />
              <input
                type="text"
                placeholder="Instructions"
                id="medication-instruction"
                ref={instructionRef}
              />
              <Button
                label="Ajouter un médicament"
                variant="secondary"
                onClick={handleMedication}
              />
            </div>
          </div>
          <div className="prescription__resume">
            <h2>Résumé</h2>
            <ul>
              {medications.map((medication, index) => (
                <li key={index}>
                  <p>
                    {medication.medication} • {medication.dosage}mg •{' '}
                    {medication.instruction}
                  </p>
                  <Button
                    label={<IoMdTrash />}
                    onClick={() => handleDelete(index)}
                    variant="svg"
                  />
                </li>
              ))}
            </ul>
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="primary"
            label="Générer"
          />
        </div>
      </form>
    </div>
  )
}
