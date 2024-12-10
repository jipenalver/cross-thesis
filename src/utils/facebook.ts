// 👉 Retrieve Facebook ID
export const facebookID = import.meta.env.VITE_FACEBOOK_ID

// 👉 Retrieve Facebook Init
export const initializeFacebookSdk = () => {
  return new Promise<void>((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_ID,
        xfbml: true,
        version: 'v21.0',
      })
      FB.AppEvents.logPageView()
      resolve()
    }

    // Load the Facebook SDK script
    ;(function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  })
}
