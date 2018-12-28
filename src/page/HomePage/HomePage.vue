<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
	<div>
		
		{{firstName}}
		<h2>{{$t('message')}}</h2>
		<textarea v-model="message"></textarea>
		<div v-show="message">{{message}}</div>
		<button v-on:click="ChangeLanguage()">Test</button>
	</div>
</template>
