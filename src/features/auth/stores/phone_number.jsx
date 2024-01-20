import { create } from "zustand"

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key) || 0)
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const usePhoneStore = create((set) => ({
    phoneNumber: getLocalStorage('phone_number'),
    setPhoneNumber: (phoneNumber) => set((state) => {
        setLocalStorage('phone_number', phoneNumber)
        return { phoneNumber}
    })
}))