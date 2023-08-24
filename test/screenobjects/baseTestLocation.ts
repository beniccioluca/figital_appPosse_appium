export default interface BaseTestLocation {
    name (optionalName: string) : string
    checkLoaded (element? : Promise<WebdriverIO.Element>) : Promise<void>
    switchContext (contextType : string) : void
    buildContextSelector (rawSelector : string) : string
    snapShot (locationName : string) : Promise<void>
}