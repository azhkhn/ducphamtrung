<style module lang="scss">
	@import './PageActive.scss';
</style>
<script src="./PageActive.js"></script>

<template>
	<b-container class="mt-5">
		<b-row class="text-center">
			<b-col><h2 style="color: green">{{$t('Notification')}}</h2></b-col>
		</b-row>
		<b-row class="text-center mt-5">

			<!-- <b-col>
				<h4>Tài khoản của (Tên đại lý) đã được kích hoạt</h4>
			</b-col>
		</b-row>
		<b-row class="text-center mt-1"> -->
			<b-col>
				<h4>{{$t('AlertActive')}}</h4>
			</b-col>
		</b-row>
		<b-row class="text-center mt-3">
			<b-col><b-btn @click="btnConfirmActive" variant="primary">{{$t('Active_col_AffiliateNetwork')}}</b-btn></b-col>
		</b-row>
	</b-container>
</template>

