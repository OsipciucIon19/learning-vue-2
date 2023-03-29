export default {
  async contactCoach(context, data) {
    const newRequest = {
      userEmail: data.email,
      message: data.message
    }

    const response = await fetch(`https://vue-http-demo-acd45-default-rtdb.europe-west1.firebasedatabase.app/requests/${data.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const responseData = response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send request')
    }
    newRequest.id = responseData.name
    newRequest.coachId = data.coachId

    context.commit('addRequest', newRequest)
  },
  async getRequests(context) {
    const coachId = context.rootGetters.userId
    const response = await fetch(`https://vue-http-demo-acd45-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`)

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch data.')
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    context.commit('getRequests', requests)
  }
}