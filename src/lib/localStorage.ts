/**
 * @path src/lib/localStorage.ts
 */

// Utility function for generic storage handling
const getStorageItem = (key: string): Record<string, any> => {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}")
  } catch {
    return {} // If parsing fails, return an empty object
  }
}

const setStorageItem = (key: string, value: Record<string, any>) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// Functions for appConfig (e.g., theme, preferences)
const APP_CONFIG_KEY = "appConfig"

export const getAppConfig = () => getStorageItem(APP_CONFIG_KEY)
export const setAppConfig = (newConfig: Record<string, any>) =>
  setStorageItem(APP_CONFIG_KEY, newConfig)
export const getFromAppConfig = (key: string) => getAppConfig()[key]
export const setInAppConfig = (key: string, value: any) => {
  const config = getAppConfig()
  config[key] = value
  setAppConfig(config)
}

// Functions for leadPayload (e.g., saved leads)
const LEAD_PAYLOAD_KEY = "leadPayload"

export const getLeadPayload = () => getStorageItem(LEAD_PAYLOAD_KEY)
export const setLeadPayload = (newPayload: Record<string, any>) =>
  setStorageItem(LEAD_PAYLOAD_KEY, newPayload)
export const getFromLeadPayload = (key: string) => getLeadPayload()[key]
export const setInLeadPayload = (key: string, value: any) => {
  const payload = getLeadPayload()
  payload[key] = value
  setLeadPayload(payload)
}
