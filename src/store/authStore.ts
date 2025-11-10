import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: null | {
    id: string
    email: string
    name: string
  }
  checkAuth: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set: any) => ({
  isAuthenticated: false,
  user: null,
  
  checkAuth: () => {
    // Here you would typically check for a stored token or session
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token and set auth state
      set({ isAuthenticated: true })
    } else {
      set({ isAuthenticated: false })
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Here you would make an API call to authenticate
      // For now, just simulating a successful login
      localStorage.setItem('token', 'dummy-token')
      set({ 
        isAuthenticated: true,
        user: {
          id: '1',
          email: email,
          name: 'User'
        }
      })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ 
      isAuthenticated: false,
      user: null
    })
  }
}))