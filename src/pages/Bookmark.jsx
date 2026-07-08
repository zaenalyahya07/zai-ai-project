import { useContext } from "react"
import ReactMarkdown from "react-markdown"
import { Star } from "lucide-react"
import Card from "../components/Card"
import { BookmarkContext } from "../context/BookmarkContext"

function Bookmark() {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext)

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">
        Bookmark
      </h1>
      <p className="text-gray-400 mt-2">
        Pesan AI yang sudah kamu tandai untuk dilihat lagi nanti.
      </p>

      <div className="flex flex-col gap-3 mt-6">
        {bookmarks.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada pesan yang di-bookmark.</p>
        ) : (
          bookmarks.map((msg) => (
            <Card key={msg.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="prose prose-invert prose-sm max-w-none min-w-0">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                <button
                  onClick={() => removeBookmark(msg.id)}
                  className="text-yellow-400 hover:text-gray-500 shrink-0"
                >
                  <Star size={18} fill="currentColor" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Bookmark