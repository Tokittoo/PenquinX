import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: null | {
    id: string
    username: string
    name: string
  }
  checkAuth: () => void
  login: (username: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((setState) => ({
  isAuthenticated: false,
  user: null,
  
  checkAuth: () => {
    // Here you would typically check for a stored token or session
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token and set auth state
      setState({ isAuthenticated: true })
    } else {
      setState({ isAuthenticated: false })
    }
  },

  login: async (username: string) => {
    try {
      // Here you would make an API call to authenticate
      // For now, just simulating a successful login
      localStorage.setItem('token', 'dummy-token')
      setState({ 
        isAuthenticated: true,
        user: {
          id: '1',
          username: username,
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
    setState({ 
      isAuthenticated: false,
      user: null
    })
  },
  }
))