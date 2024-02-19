'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' : 'data-bs-target="#xs-controllers-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' :
                                            'id="xs-controllers-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' : 'data-bs-target="#xs-injectables-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' :
                                        'id="xs-injectables-links-module-AppModule-6ed0f81730ca31da204bbf6a33be54e98d35f5c04a3f5a63e7dc6375719f146aa2919a77c2b6d6e6a3e619e756b8f0f06776db100810e73e3f1c09395c8c362e"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' :
                                            'id="xs-controllers-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' :
                                        'id="xs-injectables-links-module-AuthModule-e04c2737b8b2c6dbf961375636017e04f9c12db1bbcb3d6d11e8c65a9ff12e2d7f023abe061651886ef455a5589c6b9eee32b5d28d647f10ee7e75e25cebdfed"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' :
                                            'id="xs-controllers-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' :
                                        'id="xs-injectables-links-module-CompaniesModule-cf8bf782f980edaccb944a4aab3ba42d0f83cd699bba53b22b5d7236b9d94d577e80cc198027817f0dfb7e26edf0fc318191e5114f4c2909846ed8f8a07217e0"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' :
                                            'id="xs-controllers-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' :
                                        'id="xs-injectables-links-module-DatabasesModule-8800e0256d612453f411e1c5a74ef469558d5f56706d3377542c5e07c7a490e3a9f004836a07823e58d03255f792aa908a1665805cce5f530aefdf5d881b2f68"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' :
                                            'id="xs-controllers-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' :
                                        'id="xs-injectables-links-module-FilesModule-54597d2963114141ea785f6b0bcdbfcb94713c18a5893ce9a8c83079026b9818923c924e8937525ded3cd87ef4ebec29a075c65fc3a8ec071aef010c2d35bbf5"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-98a5ff31ec2580dc548358d35b9c01a709a476bd1345f31954cdc8e6caa812aea725cf93e2973fd4e63e0f77f68c83cd5ef04d04c2f764cd527e6c8b714a9658"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-98a5ff31ec2580dc548358d35b9c01a709a476bd1345f31954cdc8e6caa812aea725cf93e2973fd4e63e0f77f68c83cd5ef04d04c2f764cd527e6c8b714a9658"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-98a5ff31ec2580dc548358d35b9c01a709a476bd1345f31954cdc8e6caa812aea725cf93e2973fd4e63e0f77f68c83cd5ef04d04c2f764cd527e6c8b714a9658"' :
                                            'id="xs-controllers-links-module-HealthModule-98a5ff31ec2580dc548358d35b9c01a709a476bd1345f31954cdc8e6caa812aea725cf93e2973fd4e63e0f77f68c83cd5ef04d04c2f764cd527e6c8b714a9658"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' :
                                            'id="xs-controllers-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' :
                                        'id="xs-injectables-links-module-JobsModule-21d62698e40335236fb1072fd54e40f632827781a3919737d88689b50ba887b30a3615b08e23bfaab77ec1dd8cc6991515601e39dee241013ea1b5ae307ab03f"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' : 'data-bs-target="#xs-controllers-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' :
                                            'id="xs-controllers-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' : 'data-bs-target="#xs-injectables-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' :
                                        'id="xs-injectables-links-module-MailModule-8204c40ab117233a097468778a6d2cb0397a2de6706eae8c598c5e64515aef9652a66e3af4fd236fadf991b4024ec1735b867234334faf382907724564057c15"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' :
                                            'id="xs-controllers-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' :
                                        'id="xs-injectables-links-module-PermissionsModule-400fa91d6e3f132f2c404151cca11d498f002f83ff06341456d7d4f13f6bc921e2451e4d34e461ba56ffd80166c496d54e96906e908007a539a724bde16e02c5"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' :
                                            'id="xs-controllers-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' :
                                        'id="xs-injectables-links-module-ResumesModule-8194f68f30997c05994a71f5caa43fec42d19439772e717885f63f48bae16181109817613786607413a873763ede2d58edd24e9dd4fc5d50a1970833c8b1ca8a"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' :
                                            'id="xs-controllers-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' :
                                        'id="xs-injectables-links-module-RolesModule-0e9f22cd66a11df59831ee154bf902008225d8a1e432e99633c11204048b6ddd6ada2caeb7cb3a11ac51d19c66a78e6545546e522b85c63c672c25c040d14677"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' :
                                            'id="xs-controllers-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' :
                                        'id="xs-injectables-links-module-SubscribersModule-4fa503ac6b926ac06def88e07cb6c78acbd0309e9a89bcd9856ddc4c7f52179e5a72c04cfdd93198b21ac8ff3df5fabe3da17801ac7a6469b2f58ab5fc09b3bd"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' :
                                            'id="xs-controllers-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' :
                                        'id="xs-injectables-links-module-UsersModule-838985e2ac161cab3aa2d876a8a79447b2e35c0ec70772a40c216b35de951b03fd6ded3f929d9d202e9e4ccd4113c6edb6b7c1dfc7da2438d5b457c35f9b819b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});