declare global {
  interface Window {
    fbAsyncInit: () => void
  }

  const FB: {
    init: (options: { appId: string; xfbml: boolean; version: string }) => void
    AppEvents: {
      logPageView: () => void
    }
  }
}

export {}
