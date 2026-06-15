export function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const now = new Date()
  const diff = now - d
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} 天前`
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const FAVORITES_KEY = 'story_favorites'

function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('读取收藏失败', e)
    return []
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (e) {
    console.error('保存收藏失败', e)
  }
}

export function isFavorite(storyId) {
  const favorites = getFavorites()
  return favorites.some(f => f.id === storyId)
}

export function addFavorite(story) {
  const favorites = getFavorites()
  if (!favorites.some(f => f.id === story.id)) {
    favorites.unshift({
      id: story.id,
      title: story.title,
      updatedAt: story.updatedAt || Date.now(),
      addedAt: Date.now()
    })
    saveFavorites(favorites)
  }
}

export function removeFavorite(storyId) {
  const favorites = getFavorites()
  const filtered = favorites.filter(f => f.id !== storyId)
  saveFavorites(filtered)
}

export function toggleFavorite(story) {
  if (isFavorite(story.id)) {
    removeFavorite(story.id)
    return false
  } else {
    addFavorite(story)
    return true
  }
}

export function getFavoriteList() {
  return getFavorites()
}
