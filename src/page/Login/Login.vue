<style lang="scss" scope>
	@import './Login.scss';
</style>

<script src="./Login.js">

</script>

<template>
	<div class="loginbody"  v-bind:style="{'max-height': heightWindow}">
		<div class="positive">
			<!-- <HeaderLogin class="headerlogin" /> -->
			<b-img class="imgbackground" src="../static/file/bg-01.jpg" />
			<back-to-top visibleoffset="200">
				<icon class="ml-2 pt-1" name="arrow-alt-circle-up" scale="2" style="color:rgb(111, 126, 150)"></icon>
			</back-to-top>
			<div class="cardlogin">
				<md-card class="wrap-login100">
					<span class="login100-form-title">
						Login
					</span>
					<form novalidate class="md-layout" @submit.prevent="validateUser">
						 <md-field :class="getValidationClass('email')">
							<label for="email">E-mail</label>
							<md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"  />
							<span class="md-error" v-if="!$v.form.email.required">Email là bắt buộc</span>
							<span class="md-error" v-else-if="!$v.form.email.email">Email không hợp lệ</span>
						</md-field>
						<md-field>
							<label>{{$t('PASSWORD_LBL_LOGIN')}} </label>
							<md-input name= "password" v-model="form.password" v-validate="'required'" type="password" required></md-input>
							<span class="text-danger errorpass" v-if="errors.has('password')">{{ $t('LOGIN_ERROR_REQUIRED') }}</span>
						</md-field>
						<div style="width:100%">
							<b-row>
								<b-col class=" white-link text-right ">
									<b-button class="text-dark" variant="link" @click="forgotpass">{{$t('FORGOT_Link_LOGIN')}} ?</b-button>
								</b-col>
							</b-row>
						</div>
						<br>
						<div style="width:100%">
							<div class="wrap-login100-form-btn">
								<div class="login100-form-bgbtn"></div>
								<md-button type="submit" class="md-raised md-primary" v-on:click="Login()" style="width:100%;margin: auto;outline: none !important; border: none;background: transparent;">
									{{$t('LOGIN_BTN_LOGIN')}}
								</md-button>
							</div>
						</div>
						<!-- <br>
						<div style="width:100%">
							<b-row>
								<b-col class="white-link text-center" >
									<b-button variant="link" class="text-dark" @click="register">{{$t('Register_Link_LOGIN')}}</b-button>
								</b-col>
							</b-row>
						</div> -->
					</form>

				</md-card>
				<b-row style="margin:0">
					<b-col class="text-dark py-5" style="padding:0">
						<FooterAll class="footerAll" style="color:#fff" />
					</b-col>
				</b-row>
			</div>



		</div>

		<b-modal id="forgotpass" centered hide-header hide-footer>
			<b-row>
				<b-col class="text-dark text-center"><b>{{$t('FORGOT_PASSWORD')}}</b></b-col>
			</b-row>
			<br>
			<b-row>
				<b-col class="text-dark">{{$t('ENTER_YOUR_EMAIL')}}</b-col>
			</b-row>
			<br>
			<form v-on:submit.prevent="checkIfRecaptchaVerified">
				<b-row>
					<b-col>E-mail: </b-col>
				</b-row>
				<b-row>
					<b-col>
						<input type="email" name="emailaddress" v-model="emailforgot" class="emailinput">
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<vue-recaptcha @verify="markRecaptchaAsVerified" sitekey="6LfBzHEUAAAAAETurEi2S_JRuOTc1JoL9dkIGzF0"></vue-recaptcha>
					</b-col>
				</b-row>
				<b-row>
					<b-col class="text-danger"><strong>{{ loginForm.pleaseTickRecaptchaMessage }}</strong></b-col>
				</b-row>
				<br>
				<b-row>
					<b-col md="4">
						<b-button variant="outline-primary" class="btn btn-outline-primary btn-md" @click="cancel()" style="border-radius:4px;width:100%;height:35px"><b>{{$t('Cancel')}}</b></b-button>
					</b-col>
					<b-col style="padding-left:0">
						<b-button variant="primary" @click="checkIfRecaptchaVerified" id="sendemail" class="text-white" :disabled="emailforgot==''" style="border-radius:4px;width:100%;height:35px">
							<b-row>
								<b-col md="3">
									<icon name="envelope" scale="1" style="color:#fff"></icon>
								</b-col>
								<b-col class="text-left">
									{{$t('SEND')}}
								</b-col>
							</b-row>
						</b-button>
					</b-col>
				</b-row>
			</form>
		</b-modal>
		<md-dialog-confirm :md-active.sync="active" :md-content="$t('FORGOT_PASS')" @md-confirm="onConfirm" />
		<md-dialog-confirm :md-active.sync="emailnotfount" :md-content="$t('ERROR_FORGOT_PASS')" @md-confirm="onConfirm" />
	</div>
</template>

