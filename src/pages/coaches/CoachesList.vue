<template>
  <BaseDialog :show="!!error" @close="handleError">
    <p>{{ error }}</p>
  </BaseDialog>
  <section>
    <CoachFilter  @change-filter="setFilters"/>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton
          mode="outline"
          @click="loadCoaches"
        >Refresh</BaseButton>
        <BaseButton
          v-if="!isCoach && !isLoading"
          link
          to="/register"
        >Register as coach</BaseButton>
      </div>
      <div v-if="isLoading">Loading...</div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        />
      </ul>
      <h3 v-else>There are no coaches yet.</h3>
    </BaseCard>
  </section>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";

export default {
  name: "CoachesList",
  components: {BaseDialog, CoachFilter, BaseButton, CoachItem},
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }

        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }

        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true
        }

        return false
      })
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    }
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches() {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches')
      } catch (e) {
        this.error = e.message || 'Something went wrong!'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>