// 👉 Facebook Response Interface
export interface FbResponse {
  authInfo: {
    email: string
    first_name: string
    last_name: string
  }
  authResponse: {
    accessToken: string
    expiresIn: number
    signedRequest: string
    userID: string
  }
  status: string
}

// 👉 Retrieve Facebook Init
export const initializeFacebookSdk = (): Promise<void> => {
  return new Promise<void>((resolve) => {
    // Initialize fbAsyncInit
    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_ID,
        cookie: true,
        xfbml: true,
        version: 'v21.0',
      })
      FB.AppEvents.logPageView()
      resolve()
    }

    // Load the Facebook SDK script
    ;(function (d, s, id) {
      const js = d.createElement(s) as HTMLScriptElement
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode?.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  })
}

// 👉 Retrieve Facebook ID
export const facebookID = import.meta.env.VITE_FACEBOOK_ID

// 👉 Retrieve Facebook Permissions
export const permissions = 'email,public_profile'

// 👉 Retrieve Facebook Fields
export const fields = 'id,name,email,first_name,last_name'
