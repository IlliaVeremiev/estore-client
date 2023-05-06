<template>
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <template v-if="!createNewUser">
                        <h5 class="modal-title silent" id="loginModalLabel">{{ $t('modal.authentication.login.header') }}</h5>
                    </template>
                    <template v-else>
                        <h5 class="modal-title silent" id="loginModalLabel">{{ $t('modal.authentication.registration.header') }}</h5>
                    </template>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-7 border-right pe-4">
                            <template v-if="!createNewUser">
                                <div class="row">
                                    <div class="col-12 mt-3">
                                        <label for="loginCredentialInput" class="form-label silent">{{ $t('modal.authentication.login.username.label') }}</label>
                                        <input type="text" class="form-control" id="loginCredentialInput"
                                            v-model="loginCredentials" />
                                        <div class="invalid-feedback">{{ $t('modal.authentication.login.username.invalid') }}</div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <label for="passwordCredentialInput" class="form-label">{{ $t('modal.authentication.login.password.label') }}</label>
                                        <div class="d-flex">
                                            <input :type="showPassword ? 'text' : 'password'" class="form-control"
                                                id="passwordCredentialInput" v-model="passwordCredentials" />
                                            <button class="btn" type="button" @click="showPassword = !showPassword">
                                                <i v-if="!showPassword" class="bi bi-eye-slash"></i>
                                                <i v-if="showPassword" class="bi bi-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-1">
                                        <div class="d-flex justify-content-between">
                                            <div class="">
                                                <div class="form-check list-item">
                                                    <input type="checkbox" class="form-check-input" v-model="rememberMe"
                                                        id="rememberMeInput">
                                                    <label class="form-check-label " for="rememberMeInput">
                                                        {{ $t('modal.authentication.login.rememberMe') }}
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="">
                                                <a href="#">{{ $t('modal.authentication.login.forgetPassword') }}</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 mt-1 p-3">
                                        <button type="button" class="btn btn-buy w-100" @click="signIn">{{ $t('modal.authentication.login.signIn') }}</button>
                                    </div>

                                    <div class="col-12 mt-1 d-flex justify-content-center">
                                        <a href="#" @click.prevent="createNewUser = true">{{ $t('modal.authentication.login.signUp') }}</a>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="row">
                                    <div class="col-12 mt-3">
                                        <label for="firstNameInput" class="form-label silent">{{ $t('modal.authentication.registration.firstName.label') }}</label>
                                        <input type="text" class="form-control" id="firstNameInput" v-model="firstName" />
                                        <div class="invalid-feedback">{{ $t('modal.authentication.registration.firstName.invalid') }}</div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <label for="lastNameInput" class="form-label silent">{{ $t('modal.authentication.registration.lastName.label') }}</label>
                                        <input type="text" class="form-control" id="lastNameInput" v-model="lastName" />
                                        <div class="invalid-feedback">{{ $t('modal.authentication.registration.firstName.invalid') }}</div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <label for="phoneInput" class="form-label silent">{{ $t('modal.authentication.registration.phoneNumber.label') }}</label>
                                        <input type="text" class="form-control" id="phoneInput" v-model="phone" />
                                        <div class="invalid-feedback">{{ $t('modal.authentication.registration.phoneNumber.invalid') }}</div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <label for="emaillInput" class="form-label silent">{{ $t('modal.authentication.registration.email.label') }}</label>
                                        <input type="text" class="form-control" id="emaillInput" v-model="email" />
                                        <div class="invalid-feedback">{{ $t('modal.authentication.registration.email.invalid') }}</div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <label for="passwordCredentialInput" class="form-label">{{ $t('modal.authentication.registration.password.label') }}</label>
                                        <div class="d-flex">
                                            <input :type="showPassword ? 'text' : 'password'" class="form-control"
                                                id="passwordCredentialInput" v-model="passwordCredentials" />
                                            <button class="btn" type="button" @click="showPassword = !showPassword">
                                                <i v-if="!showPassword" class="bi bi-eye-slash"></i>
                                                <i v-if="showPassword" class="bi bi-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-1">
                                        <div class="form-label silent">
                                            {{ $t('modal.authentication.registration.termsAgreement.label') }}
                                        </div>
                                    </div>

                                    <div class="col-12 mt-1 p-3">
                                        <button type="button" class="btn btn-buy w-100"
                                            @click="signUp">{{ $t('modal.authentication.registration.signUp') }}</button>
                                    </div>

                                    <div class="col-12 mt-1 d-flex justify-content-center">
                                        <a href="# " @click.prevent="createNewUser = false">{{ $t('modal.authentication.registration.signIn') }}</a>
                                    </div>
                                </div>
                            </template>
                            <span class="divider">{{ $t('modal.authentication.dividerLabel') }}</span>
                        </div>
                        <div class="col-5 ps-4">
                            <div class="d-flex flex-column align-items-center">
                                <div>{{ $t('modal.authentication.oauth.header') }}</div>
                                <div class="mt-3">
                                    <a class="btn btn-outline-secondary btn-oauth-login" href="#"
                                        @click.prevent="oauth2Logig('google')">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="1.5rem"
                                            viewBox="0 0 48 48" class="abcRioButtonSvg">
                                            <g>
                                                <path fill="#EA4335"
                                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                                                </path>
                                                <path fill="#4285F4"
                                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                                                </path>
                                                <path fill="#FBBC05"
                                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                                                </path>
                                                <path fill="#34A853"
                                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                                                </path>
                                                <path fill="none" d="M0 0h48v48H0z"></path>
                                            </g>
                                        </svg>
                                        <span>Google</span>
                                    </a>
                                </div>
                                <div class="mt-3">
                                    <a class="btn btn-outline-secondary btn-oauth-login" href="#"
                                        @click.prevent="oauth2Logig('facebook')">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" height="1.5rem"
                                            shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                                            image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
                                            <path
                                                d="M197917 62502h52080V0h-52080c-40201 0-72909 32709-72909 72909v31250H83337v62507h41659v166667h62506V166666h52080l10415-62506h-62496V72910c0-5648 4768-10415 10415-10415v6z"
                                                fill="#3b5998" />
                                        </svg>
                                        <span>Facebook</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FilterCheckboxGroup from '@/components/products/FilterCheckboxGroup.vue';
import Api from '../../api/api';

export default {
    components: {
        FilterCheckboxGroup
    },
    data() {
        return {
            createNewUser: false,
            loginCredentials: null,
            passwordCredentials: null,
            showPassword: false,
            rememberMe: true,
            firstName: null,
            lastName: null,
            phone: null,
            email: null
        }
    },
    methods: {
        async signIn() {
            try {
                await Api.authenticate({
                    username: this.loginCredentials,
                    password: this.passwordCredentials,
                    rememberMe: this.rememberMe
                });
                window.location = window.location;
            } catch (e) {
                console.log(e);
            }
        },
        async signUp() {
            try {
                const response = await Api.createUser({
                    email: this.email,
                    password: this.passwordCredentials,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phone
                });
                this.signIn();
            } catch (e) {
                console.log(e);
            }
        },
        async oauth2Logig(client) {
            const response = await Api.oauthLogin(client)
            window.location = response.data.redirectUrl;
        }
    },
    computed: {
        apiUrl() {
            return import.meta.env.VITE_API_LOCATION;
        }
    }
}
</script>

<style>
.btn-buy {
    background-color: #00a046;
    color: #fff;
    font-size: 18px;
    line-height: 48px;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    font-family: BlinkMacSystemFont, -apple-system, Arial, Segoe UI, Roboto, Helvetica, sans-serif;
    margin: 0;
    outline: none;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: center;
    transition-duration: .2s;
    transition-property: color, background-color, border-color;
    transition-timing-function: ease-in-out;
}

.create-order-button-area {
    padding: 16px;
    background-color: #00a0461a;
    border: 1px solid #00a046;
    border-radius: 4px;
    font-size: 24px;
}

.divider {
    position: absolute;
    left: 100%;
    top: 50%;
    position: absolute;
    font-size: 14px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    color: #a6a5a5;
}

.border-right {
    border-right: 1px solid #e9e9e9;
}

.btn-oauth-login {}
</style>