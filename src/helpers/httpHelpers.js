import cnfg from "./config"

export const client = (endpoint, { body, ...customConfig } = {}) => {
    const access_token  = localStorage.getItem("access_token")
    const headers       = { "Content-Type": "application/json" }

    if (access_token) {
        headers.Authorization = `Bearer: ${access_token}`
    }

    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    return fetch(`${cnfg.apiUrl}/${endpoint}`, config).then(
        async (res) => {
            const data = await res.json()

            if (res.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        }
    )
}

export const uploadImage = (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", `${cnfg.cloudinaryPreset}`)

    return fetch(`${cnfg.cloudinaryUploadURL}`, {
        method: "POST",
        body: data,
    })
    .then((res) => res.json())
    .catch(err=>console.log(err) )
}