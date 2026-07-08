import { createContext, useState } from "react"

export const BookmarkContext = createContext()

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])

  const addBookmark = (message) => {
    setBookmarks((prev) => {
      const alreadyExists = prev.some((b) => b.id === message.id)
      if (alreadyExists) return prev
      return [...prev, message]
    })
  }

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  const isBookmarked = (id) => {
    return bookmarks.some((b) => b.id === id)
  }

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}