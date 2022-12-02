import { useState } from "react"

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode)
  const toggleModal = () => setModalOpen(!modalOpen)
  return [modalOpen, setModalOpen, toggleModal]
}
