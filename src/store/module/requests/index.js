import mutations from '@/store/module/requests/mutations'
import actions from "@/store/module/requests/actions";
import getters from "@/store/module/requests/getters";

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations,
  actions,
  getters
}