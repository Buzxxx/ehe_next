// utils/toggleUtils.ts

export const handleToggle = (
  toggled: boolean,
  setToggled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setToggled(!toggled)
}

export const saveToggleState = (toggled: boolean) => {
  localStorage.setItem("toggled", JSON.stringify(toggled))
}

export const loadToggleState = (): boolean => {
  const storedToggled = localStorage.getItem("toggled")
  return storedToggled !== null ? JSON.parse(storedToggled) : false
}
