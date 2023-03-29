import mutations from '@/store/module/coaches/mutations'
import actions from "@/store/module/coaches/actions";
import getters from "@/store/module/coaches/getters";

export default {
  namespaced: true,
  state() {
    return {
      coaches: []
    }
  },
  mutations,
  actions,
  getters
}