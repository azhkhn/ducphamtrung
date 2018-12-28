<style lang="scss">
@import './LeftNavBar.scss';</style>
<script src="./LeftNavBar.js"></script>

<template>
	<div class="navbar-left">
		<ul >
		<li><b-button variant="link" @click="change('TermOfServices')" class="navbar-left-item">Term of Services</b-button></li>
		<br>
		<li><b-button variant="link" @click="change('PrivacyPolicy')" class="navbar-left-item" >Privacy Policy</b-button></li>
		<br>
		<li><b-button variant="link" @click="change('CopyrightPolicy')" class="navbar-left-item">Copyright Policy</b-button></li>
		<br>
		<li><b-button variant="link" @click="change('PaymentOption')" class="navbar-left-item">Payment Options</b-button></li>
		</ul>
	</div>
</template>

