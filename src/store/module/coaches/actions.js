export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.rate,
      areas: data.areas
    }

    const response = await fetch(`https://vue-http-demo-acd45-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    // const responseData = await response.json()

    if (!response.ok) {
      //   error
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    })
  },
  async loadCoaches(context) {
    const response = await fetch(`https://vue-http-demo-acd45-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`)

    const responseData = await response.json()

    const coaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].rate,
        areas: responseData[key].areas
      }
      coaches.push(coach)
    }

    if (!response.ok) {
      throw new Error(response.statusMessage || 'Error')
    }

    context.commit('setCoaches', coaches)
  }
}