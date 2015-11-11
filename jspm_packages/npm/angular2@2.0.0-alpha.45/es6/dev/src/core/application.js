/* */ 
"format cjs";
import { isPresent } from 'angular2/src/core/facade/lang';
import { compilerProviders } from 'angular2/src/core/compiler/compiler';
import { commonBootstrap } from './application_common';
export { APP_COMPONENT, APP_ID } from './application_tokens';
export { platform } from './application_common';
export { PlatformRef, ApplicationRef, applicationCommonProviders, createNgZone, platformCommon, platformProviders } from './application_ref';
/// See [commonBootstrap] for detailed documentation.
export function bootstrap(appComponentType, appProviders = null) {
    var providers = [compilerProviders()];
    if (isPresent(appProviders)) {
        providers.push(appProviders);
    }
    return commonBootstrap(appComponentType, providers);
}
//# sourceMappingURL=application.js.map