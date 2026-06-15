<template>
  <div class="my-favorites">
    <div class="container">
      <section class="page-header card">
        <div class="header-content">
          <div>
            <h1>❤️ 我的收藏</h1>
            <p class="header-desc">共收藏了 {{ favorites.length }} 个故事</p>
          </div>
          <router-link to="/" class="btn-secondary">
            ← 返回广场
          </router-link>
        </div>
      </section>

      <section class="list-section">
        <div v-if="favorites.length === 0" class="empty card">
          <div class="empty-icon">📚</div>
          <p>还没有收藏任何故事</p>
          <router-link to="/" class="btn-primary" style="margin-top: 16px; display: inline-block;">
            去发现故事
          </router-link>
        </div>

        <div v-else class="favorites-list">
          <div
            v-for="fav in favorites"
            :key="fav.id"
            class="favorite-item card"
          >
            <div class="favorite-content">
              <router-link :to="`/story/${fav.id}`" class="favorite-link">
                <h3 class="favorite-title">{{ fav.title }}</h3>
              </router-link>
              <div class="favorite-meta">
                <span class="meta-item">
                  <span class="meta-icon">⏰</span>
                  <span>收藏于 {{ formatTime(fav.addedAt) }}</span>
                </span>
              </div>
            </div>
            <div class="favorite-actions">
              <router-link :to="`/story/${fav.id}`" class="btn-primary btn-sm">
                阅读
              </router-link>
              <button
                class="btn-secondary btn-sm remove-btn"
                @click="handleRemove(fav.id)"
                title="取消收藏"
              >
                🗑️ 移除
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFavoriteList, removeFavorite } from '../utils.js'
import { formatTime } from '../utils.js'

const favorites = ref([])

function loadFavorites() {
  favorites.value = getFavoriteList()
}

function handleRemove(storyId) {
  removeFavorite(storyId)
  loadFavorites()
}

onMounted(loadFavorites)
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, #fdf2f8 0%, #eef2ff 100%);
  border-color: #fce7f3;
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.header-content h1 {
  font-size: 24px;
  margin-bottom: 4px;
  color: var(--text);
}

.header-desc {
  color: var(--text-muted);
  font-size: 14px;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  transition: all 0.2s;
}

.favorite-item:hover {
  box-shadow: var(--shadow);
  transform: translateX(4px);
}

.favorite-content {
  flex: 1;
  min-width: 0;
}

.favorite-link {
  display: block;
  margin-bottom: 6px;
}

.favorite-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  transition: color 0.2s;
}

.favorite-link:hover .favorite-title {
  color: var(--primary);
}

.favorite-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.favorite-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.remove-btn {
  color: var(--error);
  border-color: rgba(239, 68, 68, 0.3);
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--error);
  color: var(--error);
}

@media (max-width: 640px) {
  .favorite-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .favorite-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
