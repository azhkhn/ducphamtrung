<style lang="scss">
@import url('./Test2.scss');
</style>
<script src="./Test2.js"></script>

<template>
	<div>
	<div>
  <div class="form-group" v-bind:class="{ 'form-group--error': $v.password.$error }">
    <label class="form__label">Password</label>
    <input class="form__input" v-model.trim="password" @input="$v.password.$touch()">
  </div><span class="form-group__message" v-if="!$v.password.required">Password is required.</span><span class="form-group__message" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
  <div class="form-group" v-bind:class="{ 'form-group--error': $v.confirmpassword.$error }">
    <label class="form__label">Repeat password</label>
    <input class="form__input" v-model.trim="confirmpassword" @input="$v.confirmpassword.$touch()">
  </div><span class="form-group__message" v-if="!$v.confirmpassword.sameAsPassword">Passwords must be identical.</span>
  <pre>password: {{ $v.password }}
repeatPassword: {{ $v.confirmpassword }}</pre>
</div>
<br>


  <div role="group">
    <label for="inputLive">Name:</label>
    <b-form-input id="inputLive"
                  v-model.trim="name"
                  type="text"
                  :state="nameState"
                  aria-describedby="inputLiveHelp inputLiveFeedback"
                  placeholder="Enter your name"></b-form-input>
    <b-form-invalid-feedback id="inputLiveFeedback">
      <!-- This will only be shown if the preceeding input has an invalid state -->
      Enter at least 3 letters
    </b-form-invalid-feedback>
    <b-form-text id="inputLiveHelp">
      <!-- this is a form text block (formerly known as help block) -->
      Your full name.
    </b-form-text>
  </div>
	</div>
</template>

