import { useState } from "react"

export const useToggle = (initialMode = false) => {
  const [toggleOpen, setToggleOpen] = useState(initialMode)
  const toggleIt = () => setToggleOpen(!toggleOpen)
  return { toggleOpen, setToggleOpen, toggleIt }
}
