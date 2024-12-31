/**
 * @path src/lib/localStorage.ts
 */

const CONFIG_KEY = "appConfig"

// Helper to get the config object from localStorage
const getConfig = (): Record<string, any> => {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}")
  } catch {
    return {} // If there's an error return an empty object
  }
}

// Helper to update the config object in localStorage
const setConfig = (newConfig: Record<string, any>) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig))
}

// Get a specific key from the config
export const getFromConfig = (key: string) => {
  const config = getConfig()
  return config[key]
}

// Set a specific key in the config
export const setInConfig = (key: string, value: any) => {
  const config = getConfig()
  config[key] = value
  setConfig(config)
}

// Remove a specific key from the config
export const removeFromConfig = (key: string) => {
  const config = getConfig()
  delete config[key]
  setConfig(config)
}
